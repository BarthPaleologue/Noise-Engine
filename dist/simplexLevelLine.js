export class SimplexLevelLinePostProcess extends BABYLON.PostProcess {
    constructor(name, camera, scene) {
        super(name, "./simplexLevelLine", [
            "time"
        ], [], 1, camera, BABYLON.Texture.BILINEAR_SAMPLINGMODE, scene.getEngine());
        let time = 0.0;
        this.onBeforeRender = (effect) => {
            time += 0.005;
            effect.setFloat("time", time);
        };
    }
}
