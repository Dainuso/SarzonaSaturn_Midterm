
const SCENE = new THREE.Scene();
const FOV = 75;
const NEAR = 0.1;
const CLOCK = new THREE.Clock();
const FAR = 1000;
const MAXPARTICLES = 1000;
const RENDERER = new THREE.WebGLRenderer();
RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);
// camera
let camera = new THREE.PerspectiveCamera(
  FOV,
  window.innerWidth / window.innerHeight,
  NEAR,
  FAR
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 150;
camera.lookAt(new THREE.Vector3(0, 0, 0));
// particles
let particles = new THREE.Geometry();
for (let i = 0; i < MAXPARTICLES; i++) {
  let particle = new THREE.Vector3(
    random(-150, 150),
    random(-5, 5),
    random(-150, 150)
  );
  particles.vertices.push(particle);
}
let particleMaterial = new THREE.ParticleBasicMaterial({
  color: 0xA0522D,
  size: 2,
});
let particleSystem = new THREE.ParticleSystem(particles, particleMaterial);
particleSystem.sortParticles = true;
SCENE.add(particleSystem);
//Saturn
let sphereLoader = new THREE.TextureLoader().load('img/saturnmap.jpg');
let sphereGeometry = new THREE.SphereGeometry( 50, 32, 32 );
let sphereMaterial = new THREE.MeshBasicMaterial( {map: sphereLoader} );
let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
SCENE.add( sphere );
// stars
let geometry1  = new THREE.SphereGeometry(200, 32, 32)
let material1  = new THREE.MeshBasicMaterial()
material1.map   = THREE.ImageUtils.loadTexture('img/tut-b3dstarfield.jpg')
material1.side  = THREE.BackSide
let mesh1  = new THREE.Mesh(geometry1, material1)
SCENE.add( mesh1);
mesh1.position.z=100

// random helper RNG
function random(min, max) {
  if (isNaN(max)) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}
// render loop
function render() {
    requestAnimationFrame(render);
    deltaTime = CLOCK.getDelta();
    particleSystem.rotation.y += -0.00300;
    sphere.rotation.y += -0.00150;
    mesh1.rotation.y += -0.0015;
    RENDERER.render(SCENE, camera);
  }
  render();
// resize
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  RENDERER.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize, false);