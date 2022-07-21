// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// GLTF Loader

var loader = new THREE.GLTFLoader();
var obj;
var obj2;
loader.load(
  // resource URL
  "grid 2.glb",
  // called when the resource is loaded
  function (gltf) {
    obj = gltf.scene;
    //const obj2 = gltf.scene.clone();
    //scene.add(obj);
    obj.scale.set(3, 3, 3);
    // obj2.scale.set(3, 3, 3);
    obj.position.set(0.2, 0.2, 0.3);
    //scene.add(obj2);
  }
);
// loader.load(
//   // resource URL
//   "grid 1.glb",
//   // called when the resource is loaded
//   function (gltf) {
//     obj2 = gltf.scene;
//     //const obj2 = gltf.scene.clone();
//     scene.add(obj2);
//     obj2.scale.set(3, 3, 3);
//     // obj2.scale.set(3, 3, 3);
//     obj2.position.set(0, 0, -0.4);
//     //scene.add(obj2);
//   }
// );
var loaderimg = new THREE.TextureLoader();
var textureimg = loaderimg.load("person.png");

geometryimg = new THREE.PlaneBufferGeometry();
materialimg = new THREE.MeshBasicMaterial({
  map: textureimg,
  opacity: 0,
  transparent: true,
});
const img = new THREE.Mesh(geometryimg, materialimg);
scene.add(img);
img.scale.set(0.3, 0.5, 0.3);
img.position.set(0.32, 0, -15.5);

///////////////////////////
///////////////////////////
///////////////////////////

var loader2 = new THREE.TextureLoader();
var texture = loader2.load("Vigilancerlogo.png");

geometry = new THREE.PlaneBufferGeometry();
material = new THREE.MeshBasicMaterial({
  map: texture,
  opacity: 1,
  transparent: true,
});

var loader3 = new THREE.TextureLoader();
var texture2 = loader3.load("Vigilancerlogo.png");

geometry2 = new THREE.PlaneBufferGeometry();
material2 = new THREE.MeshBasicMaterial({
  map: texture2,
  opacity: 0.5,
  transparent: true,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
const mesh2 = new THREE.Mesh(geometry2, material2);
scene.add(mesh2);
const mesh3 = new THREE.Mesh(geometry2, material2);
scene.add(mesh3);
mesh.scale.set(0.65, 0.21, 0.1);
mesh.position.set(0, 0, -0.1);
mesh2.scale.set(0.65, 0.21, 0.1);
mesh2.position.set(0, 0, -0.11);
mesh3.scale.set(0.65, 0.21, 0.1);
mesh3.position.set(0, 0, -0.12);
// Lights
const light = new THREE.AmbientLight(0xffffff, 0.25); // soft white light
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

var division = 30;
var limit = 100;
var grid = new THREE.GridHelper(limit * 2, division, "#69CCDF", "#69CCDF");
var grid2 = new THREE.GridHelper(limit * 2, division, "#69CCDF", "#69CCDF");

var moveable = [];
for (let i = 0; i <= division; i++) {
  moveable.push(1, 1, 0, 0); // move horizontal lines only (1 - point is moveable)
}
grid.geometry.addAttribute(
  "moveable",
  new THREE.BufferAttribute(new Uint8Array(moveable), 1)
);
grid.material = new THREE.ShaderMaterial({
  uniforms: {
    time: {
      value: 0,
    },
    limits: {
      value: new THREE.Vector2(-limit, limit),
    },
    speed: {
      value: 5,
    },
  },
  vertexShader: `
    uniform float time;
    uniform vec2 limits;
    uniform float speed;

    attribute float moveable;

    varying vec3 vColor;

    void main() {
      vColor = color;
      float limLen = limits.y - limits.x;
      vec3 pos = position;

      if (floor(moveable + 0.5) > 0.5){
        // if a point has "moveable" attribute = 1
        float dist = speed * time;
        float currPos = mod((pos.z + dist) - limits.x, limLen) + limits.x;
        pos.z = currPos;
      }

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vColor;

    void main() {
      gl_FragColor = vec4(vColor, 1);
    }
  `,
  vertexColors: THREE.VertexColors,
});
grid2.geometry.addAttribute(
  "moveable",
  new THREE.BufferAttribute(new Uint8Array(moveable), 1)
);
grid2.material = new THREE.ShaderMaterial({
  uniforms: {
    time: {
      value: 0,
    },
    limits: {
      value: new THREE.Vector2(-limit, limit),
    },
    speed: {
      value: 5,
    },
  },
  vertexShader: `
    uniform float time;
    uniform vec2 limits;
    uniform float speed;

    attribute float moveable;

    varying vec3 vColor;

    void main() {
      vColor = color;
      float limLen = limits.y - limits.x;
      vec3 pos = position;

      if (floor(moveable + 0.5) > 0.5){
        // if a point has "moveable" attribute = 1
        float dist = speed * time;
        float currPos = mod((pos.z + dist) - limits.x, limLen) + limits.x;
        pos.z = currPos;
      }

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vColor;

    void main() {
      gl_FragColor = vec4(vColor, 1);
    }
  `,
  vertexColors: THREE.VertexColors,
});
grid.position.set(0, -8, 0);
grid.rotation.set(0, 0, 0);
grid.scale.set(0.9, 1, 1);
scene.add(grid);
grid2.position.set(0, 8, 0);
grid2.rotation.set(0, 0, 0);
grid2.scale.set(0.9, 1, 1);
scene.add(grid2);

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
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0.3;
scene.add(camera);

//Controls
// const controls = new THREE.OrbitControls(camera, canvas);
// controls.enableDamping = true;
// controls.enableZoom = false;
// controls.keys = {
//   LEFT: "ArrowLeft", //left arrow
//   UP: "ArrowUp", // up arrow
//   RIGHT: "ArrowRight", // right arrow
//   BOTTOM: "ArrowDown", // down arrow
// };

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
// let composer = new THREE.EffectComposer(
//   renderer,
//   new THREE.WebGLRenderTarget(sizes.width, sizes.height, rtParameters)
// );

// const renderPass = new THREE.RenderPass(scene, camera);
// composer.addPass(renderPass);
// renderPass.renderToScreen = true;

// const effect1 = new THREE.ShaderPass(THREE.DotScreenShader);

// composer.addPass(effect1);
// effect1.renderToScreen = true;

// const effectVignette = new THREE.ShaderPass(THREE.VignetteShader);

// effectVignette.uniforms["offset"].value = 0.95;
// effectVignette.uniforms["darkness"].value = 4;

// composer.addPass(effectVignette);
// effectVignette.renderToScreen = true;

// const glitchPass = new THREE.GlitchPass(0);
// composer.addPass(glitchPass);
// glitchPass.renderToScreen = true;

// const params = {
//   exposure: 0.4,
//   bloomStrength: 1.5,
//   bloomThreshold: 0,
//   bloomRadius: 2,
// };
// const bloomPass = new THREE.UnrealBloomPass(
//   new THREE.Vector2(window.innerWidth, window.innerHeight),
//   1.5,
//   0.4,
//   0.85
// );
// bloomPass.threshold = params.bloomThreshold;
// bloomPass.strength = params.bloomStrength;
// bloomPass.radius = params.bloomRadius;
// composer.addPass(bloomPass);
// composer.renderToScreen = true;

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
var time = 0;

const tick = () => {
  window.requestAnimationFrame(tick);

  time -= clock.getDelta();
  grid.material.uniforms.time.value = time;
  grid2.material.uniforms.time.value = time;
  //if ( mixer1 ) mixer1.update( deltaTime);

  targetX = mouseX * 0.0002;
  targetY = mouseY * 0.0002;

  //Update objects
  if (obj) obj.rotation.y += 0.1 * (targetX - obj.rotation.y);
  if (obj) obj.rotation.x += 0.1 * (3 * targetY - obj.rotation.x);

  if (camera.position.z < -10) {
    if (grid2) grid2.rotation.y += 0.1 * (targetX - grid2.rotation.y);
    if (grid2) grid2.rotation.x += 0.1 * (1 * targetY - grid2.rotation.x);
    if (grid) grid.rotation.y += 0.1 * (targetX - grid.rotation.y);
    if (grid) grid.rotation.x += 0.1 * (1 * targetY - grid.rotation.x);
  } else {
    if (grid) grid.rotation.y += 0.1 * (targetX - grid.rotation.y);
    if (grid) grid.rotation.x += 0.1 * (3 * targetY - grid.rotation.x);
    if (grid2) grid2.rotation.y += 0.1 * (targetX - grid2.rotation.y);
    if (grid2) grid2.rotation.x += 0.1 * (3 * targetY - grid2.rotation.x);
  }

  if (mesh) mesh.rotation.y += 0.45 * (targetX - mesh.rotation.y);
  if (mesh) mesh.rotation.x += 0.45 * (3 * targetY - mesh.rotation.x);

  if (img) img.rotation.y += 0.1 * (4 * targetX - img.rotation.y);
  if (img) img.rotation.x += 0.45 * (1 * targetY - img.rotation.x);

  if (mesh2) mesh2.rotation.y += 0.45 * (targetX - mesh2.rotation.y);
  if (mesh2) mesh2.rotation.x += 0.45 * (3 * targetY - mesh2.rotation.x);

  if (mesh3) mesh3.rotation.y += 0.45 * (targetX - mesh3.rotation.y);
  if (mesh3) mesh3.rotation.x += 0.45 * (3 * targetY - mesh3.rotation.x);

  // if (obj2) obj2.rotation.y += 0.005 * (targetX - obj2.rotation.y);
  // if (obj2) obj2.rotation.x += 0.005 * (targetY - obj2.rotation.x);
  // //if (obj) obj.rotation.z += -0.05 * (targetY - obj.rotation.x);

  //renderer.clear();

  // Update Orbital Controls

  // composer.render();
  // Update Orbital Controls
  //controls.update();
  renderer.render(scene, camera);

  // Call tick again on the next frame
};

tick();

const animzoommusic = document.getElementById("zoom");
const buttonpressmusic = document.getElementById("buttonpress");
const entermusic = document.getElementById("enter");
const imgchangemusic = document.getElementById("imgchange");
const bgmusic = document.getElementById("bgmusic");

// functions
gsap.registerPlugin(ScrollTrigger);
var section1 = document.getElementById("section1");
var section2 = document.getElementById("section2");
var click = document.getElementById("click");
var tl = gsap.timeline();
document.addEventListener(
  "keypress",
  (event) => {
    var name = event.key;
    var code = event.code;
    if (name === "Enter") {
      // Alert the key name and key code on keydown
      tl.to(camera.position, { x: 0.18, z: -15 });
      // .to(grid.position, { z: 15 }, 0)
      // .to(grid2.position, { z: 15 }, 0);
      console.log("a");
      tl.to("#section2", { opacity: 1 }, 0);
      tl.to("#click", { opacity: 0 }, 0);
      tl.to(materialimg, { opacity: 1 }, 0);
      entermusic.play();
    }
  },
  false
);

// click.addEventListener("click", () => {
//   tl.to(camera.position, { z: -15 });
//   // .to(grid.position, { z: 15 }, 0)
//   // .to(grid2.position, { z: 15 }, 0);
//   console.log("a");
//   tl.to("#section2", { opacity: 1 }, 0);
//   tl.to(materialimg, { opacity: 1 }, 0);
//   // tick();
// });
