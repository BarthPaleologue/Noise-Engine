import { Camera, Effect, PostProcess } from "@babylonjs/core";
import { NoiseSettings } from "./interfaces";

export abstract class NoisePostProcess extends PostProcess {
    settings: NoiseSettings;

    protected constructor(name: string, path: string, camera: Camera) {
        super(name, path, [
            "time",
            "nbOctaves",
            "decay",
            "lacunarity",
            "power",
            "nbDomainWarping",
            "domainWarpingStrength",
            "frequency",
            "showLevelLines",
            "nbLines",
            "minValue",
            "absolute",
            "inverted",
            "fractalMultiplication"
        ], [], 1, camera);

        this.settings = {
            nbOctaves: 5,
            decay: 2.0,
            lacunarity: 2.0,
            power: 1.0,
            minValue: 0.0,
            nbDomainWarping: 0,
            domainWarpingStrength: 5.0,
            frequency: 10,
            showLevelLines: false,
            nbLines: 5,
            absolute: false,
            inverted: false,
            fractalMultiplication: false
        };

        let time = 0.0;

        this.onBeforeRender = (effect: Effect) => {
            time += 0.005;
            effect.setFloat("time", time);
            effect.setInt("nbOctaves", this.settings.nbOctaves);
            effect.setFloat("decay", this.settings.decay);
            effect.setFloat("lacunarity", this.settings.lacunarity);
            effect.setFloat("power", this.settings.power);
            effect.setFloat("minValue", this.settings.minValue);
            effect.setInt("nbDomainWarping", this.settings.nbDomainWarping);
            effect.setFloat("domainWarpingStrength", this.settings.domainWarpingStrength);
            effect.setFloat("frequency", this.settings.frequency);
            effect.setBool("showLevelLines", this.settings.showLevelLines);
            effect.setInt("nbLines", this.settings.nbLines);
            effect.setBool("absolute", this.settings.absolute);
            effect.setBool("inverted", this.settings.inverted);
            effect.setBool("fractalMultiplication", this.settings.fractalMultiplication);
        };
    }
}