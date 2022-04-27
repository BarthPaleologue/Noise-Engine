import { Camera } from "@babylonjs/core";
import { NoisePostProcess } from "./noisePostProcess";
export class Worley extends NoisePostProcess {
    constructor(name: string, camera: Camera) {
        super(name, "./shaders/worley", camera);
    }
}