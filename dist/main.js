(()=>{"use strict";var e={315:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(81),i=n.n(r),o=n(645),a=n.n(o)()(i());a.push([e.id,'html,body{margin:0;overflow:hidden}#ui{font-family:sans-serif;position:absolute;top:0;right:0;height:100vh;width:300px;overflow:auto}#ui h2{margin-block-end:0}.container{display:block;position:relative;padding-left:35px;margin-bottom:12px;cursor:pointer;font-size:22px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.container input{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.checkmark{position:absolute;top:0;left:0;height:25px;width:25px;background-color:#eee}.container:hover input~.checkmark{background-color:#ccc}.container input:checked~.checkmark{background-color:#2196f3}.checkmark:after{content:"";position:absolute;display:none}.container input:checked~.checkmark:after{display:block}.container .checkmark:after{left:9px;top:5px;width:5px;height:10px;border:solid #fff;border-width:0 3px 3px 0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}',""]);const s=a},190:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(81),i=n.n(r),o=n(645),a=n.n(o)()(i());a.push([e.id,".sliderContainer{width:calc(100% - 10px);margin:0 5px;transform:rotate(0deg)}.sliderContainer .sliderHandle{position:relative;display:block;width:40px;text-align:center;top:22px;pointer-events:none;font-family:sans-serif;line-height:25px;color:#fff;font-size:100%;transform:rotate(0deg);padding-left:2px}.sliderContainer .sliderElement{width:100%;-webkit-appearance:none;background:inherit}.sliderContainer .sliderElement:focus{outline:none}.sliderContainer .sliderElement::-webkit-slider-runnable-track{width:100%;height:15px;cursor:pointer;box-shadow:none;background:#963232;border-radius:5px;border:0px solid #010101}.sliderContainer .sliderElement::-moz-range-track{width:100%;height:15px;cursor:pointer;box-shadow:none;background:#963232;border-radius:5px;border:0px solid #010101}.sliderContainer .sliderElement::-webkit-slider-thumb{-webkit-appearance:none;background:#fa3232;border:1px solid #963232 !important;border-radius:5px;height:25px;width:40px;cursor:pointer;margin-top:-5px;transition:.5s}.sliderContainer .sliderElement::-moz-range-thumb{-webkit-appearance:none;background:#fa3232;border:1px solid #963232 !important;border-radius:5px;height:25px;width:40px;cursor:pointer;margin-top:-5px;transition:.5s}.sliderContainer .sliderElement::-moz-focus-outer{border:0}",""]);const s=a},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,i,o){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(r)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(a[l]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);r&&a[d[0]]||(void 0!==o&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=o),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),i&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=i):d[4]="".concat(i)),t.push(d))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var o={},a=[],s=0;s<e.length;s++){var l=e[s],c=r.base?l[0]+r.base:l[0],d=o[c]||0,p="".concat(c," ").concat(d);o[c]=d+1;var u=n(p),g={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)t[u].references++,t[u].updater(g);else{var h=i(g,r);r.byIndex=s,t.splice(s,0,{identifier:p,updater:h,references:1})}a.push(p)}return a}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var o=r(e=e||[],i=i||{});return function(e){e=e||[];for(var a=0;a<o.length;a++){var s=n(o[a]);t[s].references--}for(var l=r(e,i),c=0;c<o.length;c++){var d=n(o[c]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}o=l}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,i&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var o=n.sourceMap;o&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={id:r,exports:{}};return e[r](o,o.exports,n),o.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{class e extends BABYLON.PostProcess{constructor(e,t,n){super(e,"../shaders/simplex",["time","nbOctaves","decay","lacunarity","power","nbDomainWarping","domainWarpingStrength","frequency","showLevelLines","nbLines","minValue"],[],1,t,BABYLON.Texture.BILINEAR_SAMPLINGMODE,n.getEngine()),this.settings={nbOctaves:5,decay:2,lacunarity:2,power:1,minValue:0,nbDomainWarping:0,domainWarpingStrength:5,frequency:10,showLevelLines:!1,nbLines:5};let r=0;this.onBeforeRender=e=>{r+=.005,e.setFloat("time",r),e.setInt("nbOctaves",this.settings.nbOctaves),e.setFloat("decay",this.settings.decay),e.setFloat("lacunarity",this.settings.lacunarity),e.setFloat("power",this.settings.power),e.setFloat("minValue",this.settings.minValue),e.setInt("nbDomainWarping",this.settings.nbDomainWarping),e.setFloat("domainWarpingStrength",this.settings.domainWarpingStrength),e.setFloat("frequency",this.settings.frequency),e.setBool("showLevelLines",this.settings.showLevelLines),e.setInt("nbLines",this.settings.nbLines)}}}var t=n(379),r=n.n(t),i=n(795),o=n.n(i),a=n(569),s=n.n(a),l=n(565),c=n.n(l),d=n(216),p=n.n(d),u=n(589),g=n.n(u),h=n(315),m={};m.styleTagTransform=g(),m.setAttributes=c(),m.insert=s().bind(null,"head"),m.domAPI=o(),m.insertStyleElement=p(),r()(h.Z,m),h.Z&&h.Z.locals&&h.Z.locals;var f=n(190),y={};y.styleTagTransform=g(),y.setAttributes=c(),y.insert=s().bind(null,"head"),y.domAPI=o(),y.insertStyleElement=p(),r()(f.Z,y),f.Z&&f.Z.locals&&f.Z.locals;class b extends BABYLON.PostProcess{constructor(e,t,n){super(e,"../shaders/worley",["time","nbOctaves","decay","lacunarity","power","nbDomainWarping","domainWarpingStrength","frequency","showLevelLines","nbLines","minValue"],[],1,t,BABYLON.Texture.BILINEAR_SAMPLINGMODE,n.getEngine()),this.settings={nbOctaves:5,decay:2,lacunarity:2,power:1,minValue:0,nbDomainWarping:0,domainWarpingStrength:5,frequency:10,showLevelLines:!1,nbLines:5};let r=0;this.onBeforeRender=e=>{r+=.005,e.setFloat("time",r),e.setInt("nbOctaves",this.settings.nbOctaves),e.setFloat("decay",this.settings.decay),e.setFloat("lacunarity",this.settings.lacunarity),e.setFloat("power",this.settings.power),e.setFloat("minValue",this.settings.minValue),e.setInt("nbDomainWarping",this.settings.nbDomainWarping),e.setFloat("domainWarpingStrength",this.settings.domainWarpingStrength),e.setFloat("frequency",this.settings.frequency),e.setBool("showLevelLines",this.settings.showLevelLines),e.setInt("nbLines",this.settings.nbLines)}}}let v=document.getElementById("renderer");v.width=Math.min(window.innerHeight,window.innerWidth),v.height=v.width;let w=new BABYLON.Engine(v);w.loadingScreen.displayLoadingUI();let x=new BABYLON.Scene(w);x.clearColor=new BABYLON.Color4(0,0,0,1);let S=new BABYLON.FreeCamera("freeCamera",new BABYLON.Vector3(0,0,-200),x);x.activeCamera=S;let L=new e("simplex",S,x),k=new b("worley",S,x);S.detachPostProcess(k);let B=L;var I;let E;I=k,S.detachPostProcess(B),S.attachPostProcess(I);let C=!1;document.addEventListener("keydown",(e=>{"p"==e.key?BABYLON.Tools.CreateScreenshotUsingRenderTarget(w,x.activeCamera,{precision:1}):"f"==e.key?console.log(Math.round(w.getFps())):" "==e.key&&(C?(E=setInterval((()=>{x.render()}),1e3/60),C=!1):(clearInterval(E),C=!0))})),x.executeWhenReady((()=>{w.loadingScreen.hideLoadingUI(),E=setInterval((()=>{x.render()}),1e3/60)})),new Slider("octaveSlider",document.getElementById("octaveSliderContainer"),1,20,B.settings.nbOctaves,(e=>{B.settings.nbOctaves=e}));let O=new Slider("decaySlider",document.getElementById("decaySliderContainer"),1,100,10*B.settings.decay,(e=>{B.settings.decay=e/10,O.handle.innerHTML=String(e/10)}));O.update();let W=new Slider("lacunaritySlider",document.getElementById("lacunaritySliderContainer"),1,100,10*B.settings.lacunarity,(e=>{B.settings.lacunarity=e/10,W.handle.innerHTML=String(e/10)}));W.update();let A=new Slider("powerSlider",document.getElementById("powerSliderContainer"),1,100,10*B.settings.power,(e=>{B.settings.power=e/10,A.handle.innerHTML=String(e/10)}));A.update();let T=new Slider("minValueSlider",document.getElementById("minValueSliderContainer"),0,10,10*B.settings.minValue,(e=>{B.settings.minValue=e/10,T.handle.innerHTML=String(e/10)}));T.update(),new Slider("domainWarpingSlider",document.getElementById("domainWarpingSliderContainer"),0,10,B.settings.nbDomainWarping,(e=>{B.settings.nbDomainWarping=e})),new Slider("domainWarpingStrengthSlider",document.getElementById("domainWarpingStrengthSliderContainer"),1,10,B.settings.domainWarpingStrength,(e=>{B.settings.domainWarpingStrength=e})),new Slider("frequencySlider",document.getElementById("frequencySliderContainer"),1,20,B.settings.frequency,(e=>{B.settings.frequency=e})),new Slider("levelLinesSlider",document.getElementById("levelLinesSliderContainer"),2,20,B.settings.nbLines,(e=>{B.settings.nbLines=e})),document.getElementById("levelLineToggler")?.addEventListener("click",(()=>{let e=document.querySelector("input[type='checkbox']");e.checked=!e.checked,B.settings.showLevelLines=e.checked}))})()})();