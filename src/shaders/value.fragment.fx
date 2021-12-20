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


float hash(float p) { p = fract(p * 0.011); p *= p + 7.5; p *= p + p; return fract(p); }
float hash(vec2 p) {vec3 p3 = fract(vec3(p.xyx) * 0.13); p3 += dot(p3, p3.yzx + 3.333); return fract((p3.x + p3.y) * p3.z); }



float noise(vec3 x) {
    const vec3 step = vec3(110, 241, 171);

    vec3 i = floor(x);
    vec3 f = fract(x);
 
    // For performance, compute the base input to a 1D hash from the integer part of the argument and the 
    // incremental change to the 1D based on the 3D -> 1D wrapping
    float n = dot(i, step);

    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
                   mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
               mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
                   mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}


float normalNoise(vec3 coords) {
    if(!absolute) {
        return noise(coords);
    } else {
        return abs(noise(coords) - 0.5)*2.0;
    }
}

float completeNoise(vec3 coords, int octaves, float decay, float lacunarity, float minValue) {
	float noiseValue = 0.0;
	float totalAmplitude = 0.0;
	for(int i = 0; i < octaves; i++) {
		noiseValue += normalNoise(vec3(vec2(coords.x, coords.y) * pow(lacunarity, float(i)), coords.z)) / pow(decay, float(i));
		totalAmplitude += 1.0 / pow(decay, float(i));
	}
	noiseValue /= totalAmplitude;
	
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
			if(near(noiseValue, float(i) * lineStep, 0.005)) finalColor = vec3(1.0);
		}
	} else {
		finalColor = vec3(noiseValue);
		if(inverted) finalColor = vec3(1.0) - finalColor;
	}
	//finalColor *= vec3(1.0, 0.5, 0.0);

    gl_FragColor = vec4(finalColor, 1.0); // displaying the final color
}