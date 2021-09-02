
interface simplexSettings {
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
}

export class Simplex extends BABYLON.PostProcess {
    settings: simplexSettings;
    constructor(name: string, camera: BABYLON.Camera, scene: BABYLON.Scene) {
        super(name, "./simplex", [
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
            "minValue"
        ], [], 1, camera, BABYLON.Texture.BILINEAR_SAMPLINGMODE, scene.getEngine());

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
        };

        let time = 0.0;

        this.onBeforeRender = (effect: BABYLON.Effect) => {
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
        };
    }
}