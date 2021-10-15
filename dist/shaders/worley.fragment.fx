precision highp float;

#define NUM_CELLS = 10.0

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




// Arbitrary random, can be replaced with a function of your choice
float randWorley(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

// Returns the point in a given cell
vec2 get_cell_point(vec2 cell) {
	vec2 cell_base = cell / NUM_CELLS;
	float noise_x = randWorley(cell);
    float noise_y = randWorley(cell.yx);
    return cell_base + (0.5 + 1.5 * vec2(noise_x, noise_y)) / NUM_CELLS;
}

// Performs worley noise by checking all adjacent cells
// and comparing the distance to their points
float worley2(vec2 coord) {
    ivec2 cell = ivec2(coord * NUM_CELLS);
    float dist = 1.0;
    
    // Search in the surrounding 5x5 cell block
    for (int x = 0; x < 5; x++) { 
        for (int y = 0; y < 5; y++) {
        	vec2 cell_point = get_cell_point(cell + ivec2(x-2, y-2));
            dist = min(dist, distance(cell_point, coord));
        }
    }
    
    dist /= length(vec2(1.0 / NUM_CELLS));
    dist = 1.0 - dist;
    return dist;
}

#define LCG(k) k = (65 * k) % 1021
#define lr(k) float(k)/1021.

// permutation polynomial

int permp (int i1, int i2){
      int t = (i1 + i2) & 255;
        
      return ((112 * t + 153) * t + 151) & 255;
}

// return the two closest distances for 3D Worley noise

vec2 worley3(vec3 p) {
    vec2 dl = vec2(20.0);
    
    float value = 20.0;
    
    ivec3 iv = ivec3(floor(p));
    vec3 fv = fract(p);
    
    int j = 0; // initialization for Knuth's "algorithm L"
    ivec3 di = ivec3(1), ki = -di;
    ivec4 fi = ivec4(0, 1, 2, 3);
    
    // instead of writing a triply nested loop (!!)
    // generate the indices for the neighbors in Gray order (Knuth's "algorithm L")
    // see section 7.2.1.1 of TAOCP, Volume 4A or https://doi.org/10.1145/360336.360343
    
	for (int k = 0; k < 27; k++) // loop through all neighbors
    { 
		 // seeding
        int s = permp(permp(permp(0, iv.z + ki.z), iv.y + ki.y), iv.x + ki.x); LCG(s);
            
		 for (int m = 0; m < 2; m++) // two points per cell
             {
                // generate feature points within the cell
                LCG(s); float sz = lr(s);
                LCG(s); float sy = lr(s);
                LCG(s); float sx = lr(s);
                
                vec3 tp = vec3(ki) + vec3(sx, sy, sz) - fv;
                float c = dot(tp, tp); // Euclidean metric
                
                float m1 = min(c, dl.x); // ranked distances
                dl = vec2(min(m1, dl.y), max(m1, min(max(c, dl.x), dl.y)));
             }
        
        // updating steps for Knuth's "algorithm L"
        j = fi[0]; fi[0] = 0; ki[2 - j] += di[j];
        if ((ki[2 - j] & 1) == 1) {
            di[j] = -di[j];
            fi[j] = fi[j + 1]; fi[j + 1] = j + 1;
        }
	}
    
    dl = sqrt(dl); // don't forget to root at the end for Euclidean distance
        
    return dl;
}

float normalNoise(vec3 coords) {
    return 0.5 * (1.0 + worley2(coords.xy));
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
	}
	//finalColor *= vec3(1.0, 0.5, 0.0);

    gl_FragColor = vec4(finalColor, 1.0); // displaying the final color
}