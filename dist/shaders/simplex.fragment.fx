precision highp float;

// varying
varying vec2 vUV; // screen coordinates

// uniforms
uniform float time;
uniform int nbOctaves;
uniform float decay;
uniform float lacunarity;
uniform float power;
uniform int nbDomainWarping;
uniform float domainWarpingStrength;
uniform float frequency;
uniform bool showLevelLines;
uniform int nbLines;
uniform float minValue;
uniform bool absolute;
uniform bool inverted;
uniform bool fractalMultiplication;

/* https://www.shadertoy.com/view/XsX3zB
 *
 * The MIT License
 * Copyright © 2013 Nikita Miropolskiy
 * 
 * ( license has been changed from CCA-NC-SA 3.0 to MIT
 *
 *   but thanks for attributing your source code when deriving from this sample 
 *   with a following link: https://www.shadertoy.com/view/XsX3zB )
 *
 * ~
 * ~ if you're looking for procedural noise implementation examples you might 
 * ~ also want to look at the following shaders:
 * ~ 
 * ~ Noise Lab shader by candycat: https://www.shadertoy.com/view/4sc3z2
 * ~
 * ~ Noise shaders by iq:
 * ~     Value    Noise 2D, Derivatives: https://www.shadertoy.com/view/4dXBRH
 * ~     Gradient Noise 2D, Derivatives: https://www.shadertoy.com/view/XdXBRH
 * ~     Value    Noise 3D, Derivatives: https://www.shadertoy.com/view/XsXfRH
 * ~     Gradient Noise 3D, Derivatives: https://www.shadertoy.com/view/4dffRH
 * ~     Value    Noise 2D             : https://www.shadertoy.com/view/lsf3WH
 * ~     Value    Noise 3D             : https://www.shadertoy.com/view/4sfGzS
 * ~     Gradient Noise 2D             : https://www.shadertoy.com/view/XdXGW8
 * ~     Gradient Noise 3D             : https://www.shadertoy.com/view/Xsl3Dl
 * ~     Simplex  Noise 2D             : https://www.shadertoy.com/view/Msf3WH
 * ~     Voronoise: https://www.shadertoy.com/view/Xd23Dh
 * ~ 
 *
 */

/* discontinuous pseudorandom uniformly distributed in [-0.5, +0.5]^3 */
vec3 random3(vec3 c) {
	float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
	vec3 r;
	r.z = fract(512.0*j);
	j *= .125;
	r.x = fract(512.0*j);
	j *= .125;
	r.y = fract(512.0*j);
	return r-0.5;
}

/* skew constants for 3d simplex functions */
const float F3 =  0.3333333;
const float G3 =  0.1666667;

/* 3d simplex noise */
float simplex3d(vec3 p) {
	 /* 1. find current tetrahedron T and it's four vertices */
	 /* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */
	 /* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/
	 
	 /* calculate s and x */
	 vec3 s = floor(p + dot(p, vec3(F3)));
	 vec3 x = p - s + dot(s, vec3(G3));
	 
	 /* calculate i1 and i2 */
	 vec3 e = step(vec3(0.0), x - x.yzx);
	 vec3 i1 = e*(1.0 - e.zxy);
	 vec3 i2 = 1.0 - e.zxy*(1.0 - e);
	 	
	 /* x1, x2, x3 */
	 vec3 x1 = x - i1 + G3;
	 vec3 x2 = x - i2 + 2.0*G3;
	 vec3 x3 = x - 1.0 + 3.0*G3;
	 
	 /* 2. find four surflets and store them in d */
	 vec4 w, d;
	 
	 /* calculate surflet weights */
	 w.x = dot(x, x);
	 w.y = dot(x1, x1);
	 w.z = dot(x2, x2);
	 w.w = dot(x3, x3);
	 
	 /* w fades from 0.6 at the center of the surflet to 0.0 at the margin */
	 w = max(0.6 - w, 0.0);
	 
	 /* calculate surflet components */
	 d.x = dot(random3(s), x);
	 d.y = dot(random3(s + i1), x1);
	 d.z = dot(random3(s + i2), x2);
	 d.w = dot(random3(s + 1.0), x3);
	 
	 /* multiply d by w^4 */
	 w *= w;
	 w *= w;
	 d *= w;
	 
	 /* 3. return the sum of the four surflets */
	 return dot(d, vec4(52.0));
}

float normalNoise(vec3 coords) {
	if(!absolute) {
    	return 0.5 * (1.0 + simplex3d(coords));
	} else {
		return abs(simplex3d(coords));
	}
}

float completeNoise(vec3 coords, int octaves, float decay, float lacunarity, float minValue) {
	float noiseValue = 0.0;
	if(fractalMultiplication) noiseValue = 1.0;

	float totalAmplitude = 0.0;
	for(int i = 0; i < octaves; i++) {
		if(!fractalMultiplication) noiseValue += normalNoise(vec3(vec2(coords.x, coords.y) * pow(lacunarity, float(i)), coords.z)) / pow(decay, float(i));
		else noiseValue *= normalNoise(vec3(vec2(coords.x, coords.y) * pow(lacunarity, float(i)), coords.z)) / pow(decay, float(i));
		
		totalAmplitude += 1.0 / pow(decay, float(i));
	}
	
	if(!fractalMultiplication) noiseValue /= totalAmplitude;
	else noiseValue = pow(noiseValue, 1.0 / totalAmplitude);

	if(inverted) noiseValue = 1.0 - noiseValue;
	
	noiseValue = max(minValue, noiseValue) - minValue;
	noiseValue /= 1.0 - minValue;
	
	return noiseValue;
}

bool near(float value, float target, float tolerance) {
    return abs(value - target) < tolerance;
}

void main() {

    vec3 samplePoint = vec3(vUV*frequency, time);

	for(int i = 0; i < nbDomainWarping; i++) {
		samplePoint += domainWarpingStrength * vec3(
			completeNoise(samplePoint, nbOctaves, decay, lacunarity, 0.0), 
			completeNoise(vec3(samplePoint.x + 13.0, samplePoint.y + 37.0, samplePoint.z - 73.0), nbOctaves, decay, lacunarity, 0.0), 
			0.0
		) / float(nbDomainWarping);
	}

    float noiseValue = completeNoise(samplePoint, nbOctaves, decay, lacunarity, minValue);

    noiseValue = pow(noiseValue, power);

	vec3 finalColor = vec3(1.0, 0.0, 0.0);
	if(showLevelLines) {

		float lineStep = 1.0 / float(nbLines);
		//finalColor = vec3(19.0, 27.0, 36.0) / 255.0;
		finalColor = vec3(0.0);
		for(int i = 0; i < nbLines; i++) {
			if(near(noiseValue, float(i) * lineStep, 0.01)) finalColor = vec3(1.0);
		}
	} else {
		finalColor = vec3(noiseValue);
	}

    gl_FragColor = vec4(finalColor, 1.0); // displaying the final color
}