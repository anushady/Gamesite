// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// GLTF Loader

var loader = new THREE.GLTFLoader();
var obj;
loader.load(
  // resource URL
  "animation.glb",
  // called when the resource is loaded
  function (gltf) {
    obj = gltf.scene;
    scene.add(obj);
    obj.scale.set(0.1, 0.1, 0.1);
  }
);

// Lights
const light = new THREE.AmbientLight(0xffffff, 0.2); // soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
scene.add(directionalLight);
directionalLight.position.set(1, 1, 1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.15);
scene.add(directionalLight2);
directionalLight2.position.set(1, -1, 1);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.15);
scene.add(directionalLight3);
directionalLight3.position.set(-1, -1, -1);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.15);
scene.add(directionalLight4);
directionalLight4.position.set(-1, 1, -1);

const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.15);
scene.add(directionalLight5);
directionalLight5.position.set(-1, -1, 1);

const directionalLight6 = new THREE.DirectionalLight(0xffffff, 0.15);
scene.add(directionalLight6);
directionalLight6.position.set(1, -1, -1);

const directionalLight7 = new THREE.DirectionalLight(0xffffff, 0.15);
scene.add(directionalLight7);
directionalLight7.position.set(1, 1, -1);

const directionalLight8 = new THREE.DirectionalLight(0xffffff, 0.15);
scene.add(directionalLight8);
directionalLight8.position.set(-1, 1, 1);

const directionalLight9 = new THREE.DirectionalLight(0xffffff, 0.2);
scene.add(directionalLight9);
directionalLight9.position.set(0, 0, 1);
/**
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  55,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 4.3;
scene.add(camera);

//Controls
const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.keys = {
  LEFT: "ArrowLeft", //left arrow
  UP: "ArrowUp", // up arrow
  RIGHT: "ArrowRight", // right arrow
  BOTTOM: "ArrowDown", // down arrow
};

const rtParameters = {
  stencilBuffer: true,
};

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});
renderer.autoClear = false;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
/// Shader //
/// Shader //
/// Shader //
let composer = new THREE.EffectComposer(
  renderer,
  new THREE.WebGLRenderTarget(sizes.width, sizes.height, rtParameters)
);

const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);
renderPass.renderToScreen = true;

// const effect1 = new THREE.ShaderPass(THREE.DotScreenShader);

// composer.addPass(effect1);
// effect1.renderToScreen = true;

// const effectVignette = new THREE.ShaderPass(THREE.VignetteShader);

// effectVignette.uniforms["offset"].value = 0.95;
// effectVignette.uniforms["darkness"].value = 4;

// composer.addPass(effectVignette);
// effectVignette.renderToScreen = true;

const glitchPass = new THREE.GlitchPass(0);
composer.addPass(glitchPass);
glitchPass.renderToScreen = true;

const params = {
  exposure: 0.4,
  bloomStrength: 1.5,
  bloomThreshold: 0,
  bloomRadius: 2,
};
const bloomPass = new THREE.UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;
composer.addPass(bloomPass);
composer.renderToScreen = true;

// const effectDotScree = new THREE.DotScreenPass(
//   new THREE.Vector2(0, 0),
//   0.5,
//   0.8
// );
// effectDotScree.uniforms["tSize"].value = 0.95;
// composer.addPass(effectDotScree);
// effectDotScree.renderToScreen = true;
// const effectHBlur = new THREE.ShaderPass(THREE.HorizontalBlurShader);
// effectHBlur.uniforms["h"].value = 6 / sizes.width;
// composer.addPass(effectHBlur);

renderer.toneMappingExposure = Math.pow(0.9, 4.0);

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowX;
  mouseY = event.clientY - windowY;
}

//  const updateOnScroll = (event) => {
//      obj.position.z = window.scrollY *.002
//  }

//  window.addEventListener('scroll', updateOnScroll)

const clock = new THREE.Clock();

const tick = () => {
  window.requestAnimationFrame(tick);
  const deltaTime = clock.getDelta();

  //if ( mixer1 ) mixer1.update( deltaTime);

  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  //Update objects
  if (obj) obj.rotation.y += 0.005 * (targetX - obj.rotation.y);
  if (obj) obj.rotation.x += 0.005 * (targetY - obj.rotation.x);
  //if (obj) obj.rotation.z += -0.05 * (targetY - obj.rotation.x);

  //renderer.clear();

  // Update Orbital Controls

  composer.render();
  // Update Orbital Controls
  controls.update();
  // renderer.render(scene, camera);

  // Call tick again on the next frame
};

tick();
