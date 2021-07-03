export class Simplex extends BABYLON.PostProcess {
    constructor(name, camera, scene) {
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
            "nbLines"
        ], [], 1, camera, BABYLON.Texture.BILINEAR_SAMPLINGMODE, scene.getEngine());
        this.settings = {
            nbOctaves: 5,
            decay: 2.0,
            lacunarity: 2.0,
            power: 1.0,
            nbDomainWarping: 0,
            domainWarpingStrength: 5.0,
            frequency: 10,
            showLevelLines: false,
            nbLines: 5,
        };
        let time = 0.0;
        this.onBeforeRender = (effect) => {
            time += 0.005;
            effect.setFloat("time", time);
            effect.setInt("nbOctaves", this.settings.nbOctaves);
            effect.setFloat("decay", this.settings.decay);
            effect.setFloat("lacunarity", this.settings.lacunarity);
            effect.setFloat("power", this.settings.power);
            effect.setInt("nbDomainWarping", this.settings.nbDomainWarping);
            effect.setFloat("domainWarpingStrength", this.settings.domainWarpingStrength);
            effect.setFloat("frequency", this.settings.frequency);
            effect.setBool("showLevelLines", this.settings.showLevelLines);
            effect.setInt("nbLines", this.settings.nbLines);
        };
    }
}
