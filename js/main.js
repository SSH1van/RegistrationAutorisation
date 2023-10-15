//====================Setup======================//
scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);


//===================Mars======================//
const marsTexture = new THREE.TextureLoader().load('../texture/mars.jpg');
const normalTexture = new THREE.TextureLoader().load('../texture/normal.jpg');
const mars = new THREE.Mesh(
	new THREE.SphereGeometry(3, 32, 32),
	new THREE.MeshStandardMaterial({ map: marsTexture, normalMap: normalTexture })
   );
scene.add(mars);

//====================Torus======================//
const geometry = new THREE.TorusGeometry(10, .2, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x808080 });
const torus = new THREE.Mesh(geometry, material);
const torus2 = new THREE.Mesh(geometry, material);
const torus3 = new THREE.Mesh(geometry, material);
scene.add(torus, torus2, torus3);


//====================Light======================//
const pointLight = new THREE.PointLight(0xffffff, .6);
pointLight.position.set(25, 25, 25);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


//====================Help======================//
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);
//
//const controls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.addEventListener('change', renderer); !!!!!!!!!many errors!!!!!!!!!


//===================Stars======================//
function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);
  
	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  
	star.position.set(x, y, z);
	scene.add(star);
  };
Array(200).fill().forEach(addStar);


//===================Background======================//
const spaceTexture = new THREE.TextureLoader().load('../texture/space.jpg');
scene.background = spaceTexture;


//===================ScrollAnimation======================//
function moveCamera() {
	const t = document.body.getBoundingClientRect().top;
	camera.position.z = (t * +0.1) +50; 
	camera.position.x = t * +0.002;
	camera.rotation.y = t * +0.002;
  }
  document.body.onscroll = moveCamera;
  moveCamera();



//====================Animate======================//
function animate() {
	requestAnimationFrame(animate);
  
	torus.rotation.x -= 0.012;
	torus.rotation.z += 0.01;
	torus2.rotation.x += 0.01;
	torus2.rotation.y += 0.015;
	torus3.rotation.z -= 0.019;
	torus3.rotation.y += 0.01;
	mars.rotation.y -= 0.01;
	//controls.update();

	renderer.render(scene, camera);
  }

  animate();