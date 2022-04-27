import { Camera, Scene } from "@babylonjs/core";
import { NoisePostProcess } from "./noisePostProcess";
export class Simplex extends NoisePostProcess {
    constructor(name: string, camera: Camera) {
        super(name, "./shaders/simplex", camera);
    }
}