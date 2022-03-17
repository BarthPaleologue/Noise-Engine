import { Simplex } from "./postProcesses/simplex";

import * as style from "../styles/style.scss";
import * as sliderStyle from "../sliderjs/style2.min.css";
import { Worley } from "./postProcesses/worley";
import { Value } from "./postProcesses/value";

import "../html/slider.min.js";

style.default;
sliderStyle.default;

let canvas = document.getElementById("renderer") as HTMLCanvasElement;
canvas.width = Math.min(window.innerHeight, window.innerWidth);
canvas.height = canvas.width;

let engine = new BABYLON.Engine(canvas);
engine.loadingScreen.displayLoadingUI();

let scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

let freeCamera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0, 0, -200), scene);
scene.activeCamera = freeCamera;

type noisePostProcess = Simplex | Worley | Value;

let ppDic: { [key: string]: noisePostProcess; } = {};

let simplexPostProcess = new Simplex("simplex", freeCamera, scene);
ppDic["simplex"] = simplexPostProcess;
let worleyPostProcess = new Worley("worley", freeCamera, scene);
ppDic["worley"] = worleyPostProcess;
let valuePostProcess = new Value("value", freeCamera, scene);
ppDic["value"] = valuePostProcess;

freeCamera.detachPostProcess(worleyPostProcess);
freeCamera.detachPostProcess(valuePostProcess);

let pp: noisePostProcess = simplexPostProcess;

let sliders: Slider[] = [];

function switchPP(newPP: noisePostProcess): void {
    freeCamera.detachPostProcess(pp);
    freeCamera.attachPostProcess(newPP);

    pp = newPP;

    pp.settings.showLevelLines = (<HTMLInputElement>document.querySelectorAll("input[type='checkbox']")[0]).checked;
    pp.settings.absolute = (<HTMLInputElement>document.querySelectorAll("input[type='checkbox']")[1]).checked;
    pp.settings.inverted = (<HTMLInputElement>document.querySelectorAll("input[type='checkbox']")[2]).checked;

    for (let slider of sliders) {
        slider.update();
    }
}

//#endregion

let interval: NodeJS.Timer;
let pause = false;

document.addEventListener("keydown", e => {
    if (e.key == "p") { // take screenshots
        BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, scene.activeCamera!, { precision: 1 });
    } else if (e.key == "f") {
        console.log(Math.round(engine.getFps()));
    } else if (e.key == " ") {
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

scene.executeWhenReady(() => {
    engine.loadingScreen.hideLoadingUI();

    interval = setInterval(() => {
        scene.render();
    }, 1000 / 60);
});


sliders.push(new Slider("frequencySlider", document.getElementById("frequencySliderContainer")!, 1, 50, pp.settings.frequency, (val: number) => {
    pp.settings.frequency = val;
}));

sliders.push(new Slider("octaveSlider", document.getElementById("octaveSliderContainer")!, 1, 20, pp.settings.nbOctaves, (val: number) => {
    pp.settings.nbOctaves = val;
}));

let decaySlider = new Slider("decaySlider", document.getElementById("decaySliderContainer")!, 1, 100, pp.settings.decay * 10, (val: number) => {
    pp.settings.decay = val / 10;
    decaySlider.handle.innerHTML = String(val / 10);
});
decaySlider.update();
sliders.push(decaySlider);

let lacunaritySlider = new Slider("lacunaritySlider", document.getElementById("lacunaritySliderContainer")!, 1, 100, pp.settings.lacunarity * 10, (val: number) => {
    pp.settings.lacunarity = val / 10;
    lacunaritySlider.handle.innerHTML = String(val / 10);
});
lacunaritySlider.update();
sliders.push(lacunaritySlider);

let powerSlider = new Slider("powerSlider", document.getElementById("powerSliderContainer")!, 1, 100, pp.settings.power * 10, (val: number) => {
    pp.settings.power = val / 10;
    powerSlider.handle.innerHTML = String(val / 10);
});
powerSlider.update();
sliders.push(powerSlider);

let minValueSlider = new Slider("minValueSlider", document.getElementById("minValueSliderContainer")!, 0, 10, pp.settings.minValue * 10, (val: number) => {
    pp.settings.minValue = val / 10;
    minValueSlider.handle.innerHTML = String(val / 10);
});
minValueSlider.update();
sliders.push(minValueSlider);

sliders.push(new Slider("domainWarpingSlider", document.getElementById("domainWarpingSliderContainer")!, 0, 10, pp.settings.nbDomainWarping, (val: number) => {
    pp.settings.nbDomainWarping = val;
}));

sliders.push(new Slider("domainWarpingStrengthSlider", document.getElementById("domainWarpingStrengthSliderContainer")!, 1, 10, pp.settings.domainWarpingStrength, (val: number) => {
    pp.settings.domainWarpingStrength = val;
}));

sliders.push(new Slider("levelLinesSlider", document.getElementById("levelLinesSliderContainer")!, 2, 20, pp.settings.nbLines, (val: number) => {
    pp.settings.nbLines = val;
}));

document.getElementById("levelLineToggler")?.addEventListener("click", () => {
    let checkbox = document.querySelectorAll("input[type='checkbox']")[0] as HTMLInputElement;
    checkbox.checked = !checkbox.checked;
    pp.settings.showLevelLines = checkbox.checked;
});

document.getElementById("AbsoluteToggler")?.addEventListener("click", () => {
    let checkbox = document.querySelectorAll("input[type='checkbox']")[1] as HTMLInputElement;
    checkbox.checked = !checkbox.checked;
    pp.settings.absolute = checkbox.checked;
});

document.getElementById("InvertedToggler")?.addEventListener("click", () => {
    let checkbox = document.querySelectorAll("input[type='checkbox']")[2] as HTMLInputElement;
    checkbox.checked = !checkbox.checked;
    pp.settings.inverted = checkbox.checked;
});

document.getElementById("selector")?.addEventListener("change", function () {
    let newValue = (<HTMLSelectElement>this).value;
    switchPP(ppDic[newValue]);
});