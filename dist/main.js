var _a;
import { Simplex } from "./simplex.js";
let canvas = document.getElementById("renderer");
canvas.width = Math.min(window.innerHeight, window.innerWidth);
canvas.height = canvas.width;
let engine = new BABYLON.Engine(canvas);
engine.loadingScreen.displayLoadingUI();
let scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);
let freeCamera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0, 0, -200), scene);
scene.activeCamera = freeCamera;
// The important line
let pp = new Simplex("levelLine", freeCamera, scene);
//#endregion
let interval = 0;
let pause = false;
document.addEventListener("keydown", e => {
    if (e.key == "p") { // take screenshots
        BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, scene.activeCamera, { precision: 1 });
    }
    else if (e.key == "f") {
        console.log(Math.round(engine.getFps()));
    }
    else if (e.key == " ") {
        if (!pause) {
            clearInterval(interval);
            pause = true;
        }
        else {
            interval = setInterval(() => {
                scene.render();
            }, 1000 / 60);
            pause = false;
        }
    }
});
/*window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    engine.resize();
});*/
scene.executeWhenReady(() => {
    engine.loadingScreen.hideLoadingUI();
    interval = setInterval(() => {
        scene.render();
    }, 1000 / 60);
});
new Slider("octaveSlider", document.getElementById("octaveSliderContainer"), 1, 20, pp.settings.nbOctaves, (val) => {
    pp.settings.nbOctaves = val;
});
let decaySlider = new Slider("decaySlider", document.getElementById("decaySliderContainer"), 1, 100, pp.settings.decay * 10, (val) => {
    pp.settings.decay = val / 10;
    decaySlider.handle.innerHTML = String(val / 10);
});
decaySlider.update();
let lacunaritySlider = new Slider("lacunaritySlider", document.getElementById("lacunaritySliderContainer"), 1, 100, pp.settings.lacunarity * 10, (val) => {
    pp.settings.lacunarity = val / 10;
    lacunaritySlider.handle.innerHTML = String(val / 10);
});
lacunaritySlider.update();
let powerSlider = new Slider("powerSlider", document.getElementById("powerSliderContainer"), 1, 100, pp.settings.power * 10, (val) => {
    pp.settings.power = val / 10;
    powerSlider.handle.innerHTML = String(val / 10);
});
powerSlider.update();
let minValueSlider = new Slider("minValueSlider", document.getElementById("minValueSliderContainer"), 0, 10, pp.settings.minValue * 10, (val) => {
    pp.settings.minValue = val / 10;
    minValueSlider.handle.innerHTML = String(val / 10);
});
minValueSlider.update();
new Slider("domainWarpingSlider", document.getElementById("domainWarpingSliderContainer"), 0, 10, pp.settings.nbDomainWarping, (val) => {
    pp.settings.nbDomainWarping = val;
});
new Slider("domainWarpingStrengthSlider", document.getElementById("domainWarpingStrengthSliderContainer"), 1, 10, pp.settings.domainWarpingStrength, (val) => {
    pp.settings.domainWarpingStrength = val;
});
new Slider("frequencySlider", document.getElementById("frequencySliderContainer"), 1, 20, pp.settings.frequency, (val) => {
    pp.settings.frequency = val;
});
new Slider("levelLinesSlider", document.getElementById("levelLinesSliderContainer"), 2, 20, pp.settings.nbLines, (val) => {
    pp.settings.nbLines = val;
});
(_a = document.getElementById("levelLineToggler")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    let checkbox = document.querySelector("input[type='checkbox']");
    checkbox.checked = !checkbox.checked;
    pp.settings.showLevelLines = checkbox.checked;
});
