import { Camera } from "@babylonjs/core";
import { NoisePostProcess } from "./noisePostProcess";

export class Value extends NoisePostProcess {
    constructor(name: string, camera: Camera) {
        super(name, "./shaders/value", camera);
    }
}