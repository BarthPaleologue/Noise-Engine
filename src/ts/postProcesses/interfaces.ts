export interface NoiseSettings {
    nbOctaves: number;
    decay: number;
    lacunarity: number;
    power: number;
    minValue: number;
    nbDomainWarping: number;
    domainWarpingStrength: number;
    frequency: number;
    showLevelLines: boolean;
    nbLines: number;
    absolute: boolean;
    inverted: boolean;
    fractalMultiplication: boolean;
}