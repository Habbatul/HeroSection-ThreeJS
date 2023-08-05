//import './style.css';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import * as TWEEN from '@tweenjs/tween.js';
import {  SelectiveBloomEffect, Selection, EffectComposer, EffectPass, RenderPass } from "postprocessing";
// Setup
const canvas = document.getElementById('canvas');
const container = document.createElement('div');
container.style.display = 'flex';
container.style.justifyContent = 'center';
container.style.alignItems = 'center';


canvas.parentNode.insertBefore(container, canvas);
container.appendChild(canvas);


var scene2 = new THREE.Scene();
var scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias:true, powerPreference:"high-performance" });
renderer.antialias=true;

const origWidth = window.innerWidth * 0.9;
const origHeight = window.innerHeight * 0.8;

// renderer.setClearColor(0x333333);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(origWidth, origHeight);
camera.position.set(0, 0, 5);
camera.layers.disable(0);
camera.layers.enable(1);





 //terapkan library postprocessing
 const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

//tadinya pakek bloomEffect tapi karena kita akan menambahkan lampu, avatar dan juga bintang maka memakai selective
const bloomEffect = new SelectiveBloomEffect(scene, camera, {
  mipmapBlur:true,
  radius:0.6,
  intensity:3.4,
  luminanceSmoothing:0,
  luminanceThreshold:0.3
});

composer.addPass(new EffectPass(camera, bloomEffect));

var objekDipilih = new Selection;
bloomEffect.selection = objekDipilih;


// Torus

var geometry = new THREE.TorusGeometry(10, 0.7, 16, 4);
var material = new THREE.MeshStandardMaterial({ 
  color: 0x005566, 
  wireframe : true, 
  metalness: 0.4,
  roughness: 0,
});
var torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//torus 2
var geometry2 = new THREE.TorusGeometry(12, 0.7, 16, 30);
var material2 = new THREE.MeshStandardMaterial({ 
  color: 0x006655,
  metalness: 0.5,
  roughness: 0
 });
var torus2 = new THREE.Mesh(geometry2, material2);

scene.add(torus2);

// Lights
// Add directional lights
// var directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.1);
// directionalLight1.position.set(2, 0, 1);

// var directionalLight2 = new THREE.DirectionalLight(0xffffff,  0.1);
// directionalLight2.position.set(-2, 0, 1);

// var directionalLight3 = new THREE.DirectionalLight(0xffffff,  0.1);
// directionalLight3.position.set(0, 2, 0);


// var directionalLight4 = new THREE.DirectionalLight(0xffffff,  0.1);
// directionalLight4.position.set(0, -2, -0.5);

// var directionalLight5 = new THREE.DirectionalLight(0xffffff,  0.1);
// directionalLight5.position.set(0, 0, 2);


// var directionalLight7 = new THREE.DirectionalLight(0xffffff,  0.1);
// directionalLight7.position.set(2, 2, -1);

// var directionalLight8 = new THREE.DirectionalLight(0xffffff,  0.1);
// directionalLight8.position.set(-2, 2, -1);

// var directionalLight9 = new THREE.DirectionalLight(0xffffff,  0.1);
// directionalLight9.position.set(-2, -2, -1);

// var directionalLight10 = new THREE.DirectionalLight(0xffffff,  0.1);
// directionalLight10.position.set(2, -2, -1);





// // directionalLight1.distance = 100;
// // directionalLight2.distance =100;
// // directionalLight3.distance = 100;
// // directionalLight4.distance = 100;
// // directionalLight6.distance = 100;
// // directionalLight7.distance = 100;
// // directionalLight8.distance = 100;
// // directionalLight9.distance = 100;
// // directionalLight10.distance = 100;


// // Add lights to the scene
// scene.add(directionalLight1);
// scene.add(directionalLight2);
// scene.add(directionalLight3);
// scene.add(directionalLight4);
// scene.add(directionalLight5);
// scene.add(directionalLight7);
// scene.add(directionalLight8);
// scene.add(directionalLight9);
// scene.add(directionalLight10);

// Create the lamp geometry
var lampGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var lampMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: 0xffffff,
  emissiveIntensity: 0.5,
  metalness: 0.7,
  roughness: 0.4,
});
var lampMesh = new THREE.Mesh(lampGeometry, lampMaterial);
lampMesh.position.set(-2, 2, 1.5);

// Add the point lights to the lamp mesh
var pointLight1 = new THREE.PointLight(0xffffff, 5, 5);
pointLight1.position.set(0, 0, 0);
lampMesh.add(pointLight1);

// Add the lamp mesh to the scene
scene.add(lampMesh);


// var pointLightHelper2 = new THREE.PointLightHelper(pointLight1, 5, 'red');
// scene.add(pointLightHelper2);


var pointLights = new THREE.PointLight(0xffffff, 2, 35);
pointLights.position.set(0, 0, 0);

//ambient light

var ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
var ambientLight2 = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight, pointLights);
scene2.add(ambientLight2);
// var pointLightHelper2 = new THREE.PointLightHelper(pointLight1, 5, 'red');
// scene.add(pointLightHelper2);


// Background

// var spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;




// Avatar
// buat point light
var pointLight = new THREE.PointLight(0xffffff, 4, 35);
pointLight.position.set(0, 0, 30);

// tambahkan point light ke dalam scene
scene.add(pointLight);

//buat geometry box
const geometryHan = new THREE.BoxGeometry( 2.5, 2.5, 2.5 );

// Load texture
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('asset/han.png');

var textureLoader = new THREE.TextureLoader();
var texture2 = textureLoader.load('asset/hansamping.png');

var textureLoader = new THREE.TextureLoader();
var texture3 = textureLoader.load('asset/hanAtas.png');

// Load normal map texture
// var textureLoader = new THREE.TextureLoader();
// var normalTexture = textureLoader.load('plastic.jpg');

var textureLoader = new THREE.TextureLoader();
var bMap = textureLoader.load('asset/bMap.jpg');

var textureLoader = new THREE.TextureLoader();
var metalMap = textureLoader.load('asset/metalic.png');

var textureLoader = new THREE.TextureLoader();
var roughMap = textureLoader.load('asset/rough.png');

// Create material
var materialHan = [
new THREE.MeshStandardMaterial({
  bumpMap:bMap,
  bumpScale: 0.07,
  map: texture2,
  roughnessMap:roughMap,
  roughness: 0.4,
  metalness: 0.6,
  
}),
new THREE.MeshStandardMaterial({
  bumpMap:bMap,
  bumpScale: 0.07,
  map: texture2,
  roughnessMap:roughMap,
  roughness: 0.4,
  metalness: 0.6,
  
}),
new THREE.MeshStandardMaterial({
  bumpMap:bMap,
  bumpScale: 0.07,
  map: texture3,
  roughnessMap:roughMap,
  roughness: 0.4,
  metalness: 0.6,
  
}),
new THREE.MeshStandardMaterial({
  bumpMap:bMap,
  bumpScale: 0.07,
  map: texture,
  roughnessMap:roughMap,
  roughness: 0.4,
  metalness: 0.6,
  
}),
new THREE.MeshStandardMaterial({
  bumpMap:bMap,
  bumpScale: 0.07,
  map: texture,
  roughnessMap:roughMap,
  roughness: 0.4,
  metalness: 0.6,
  
}),
new THREE.MeshStandardMaterial({
  bumpMap:bMap,
  bumpScale: 0.07,
  map: texture,
  roughnessMap:roughMap,
  roughness: 0.4,
  metalness: 0.6,
  
}),
];
geometryHan.computeVertexNormals();

var han = new THREE.Mesh(geometryHan, materialHan);
scene.add(han);


// //card
// //nametag
// var cardText = new THREE.TextureLoader().load('card.png');
// var AlphaText = new THREE.TextureLoader().load('card.png');
// var cardMaterial = new THREE.MeshBasicMaterial({
//     map: cardText,
//     alphaMap:AlphaText,
//     transparent: true,
//     opacity: 4,
// });

// var card = new THREE.Mesh(new THREE.PlaneGeometry(3, 3.3), cardMaterial);


// // han.material.opacity =-1;
// // han.material.opacity =-1;
// scene.add(card);

//coba gltf loader untuk card

var mesh;
const loader1 = new GLTFLoader();
loader1.load( 'asset/tulisan.gltf', function ( gltf ) {

  // menambahkan model ke scene
  scene2.add( gltf.scene );

  // mengatur rotasi mesh setelah model dimuat
  mesh = gltf.scene.getObjectByName( 'Curve' );

  // Memanggil fungsi untuk melakukan konfigurasi
  configureMesh();
}, undefined, function ( error ) {

  console.error( error );

} );

//konfigurasi gltf model

// Di luar fungsi loader
function configureMesh() {
  if (mesh) {
    //mengatur rotasi 90 derajat
    mesh.rotation.x=Math.PI/2;
    // Mengatur posisi mesh
    mesh.position.x = 0.4;
    mesh.position.y = -1.4;
    mesh.position.z = 2;

    // Mengatur skala mesh
    mesh.scale.set(8.2, 1, 10);

    // Mengatur material pada mesh
    const material = mesh.material;
    material.antialias = true;
    material.transparent = true;
    material.opacity = 0;
    
    //animation

  }
}


function setSceneObjectsToLayer(layer) {
  scene.traverse(function (object) {
    if (object.isMesh) {
      object.layers.set(layer);
    }
  });
}

setSceneObjectsToLayer(0);

//text scene
const loader = new FontLoader();

loader.load('asset/helvetiker_bold.typeface.json', function(font) {

  const geometry = new TextGeometry('Welcome to', {
    font: font,
    size: 1, // Ukuran font baru yang lebih kecil
    height: 0.05,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  const geometry2 = new TextGeometry('Hq.Han Website', {
    font: font,
    size: 1, // Ukuran font baru yang lebih kecil
    height: 0.05,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  const geoLoading = new TextGeometry('Loading', {
    font: font,
    size: 1, // Ukuran font baru yang lebih kecil
    height: 0,
    curveSegments: 1,
  });


  //untuk loading

  const materialLoad = new THREE.MeshBasicMaterial({
    color: 0x006666,
  });
    const loadingMesh = new THREE.Mesh(geoLoading, materialLoad);


 const material = new THREE.MeshStandardMaterial({ 
  color: 0x006666, // Ubah menjadi warna biru
  metalness: 0.6,
  roughness: 0
});
  const textMesh = new THREE.Mesh(geometry, material);

  const material2 = new THREE.MeshStandardMaterial({ 
    color: 0xCCCCCC, // Ubah menjadi warna ungu
    metalness: 0.6,
    roughness: 0
  });
  
  const textMesh2 = new THREE.Mesh(geometry2, material2);


  // Set the position of the text mesh to x=0, y=0, z=0
  textMesh.position.set(-3.8, 1, 18);
  textMesh2.position.set(-5.2, -0.9, 18);
  scene.add(textMesh);
  scene.add(textMesh2);

  //set loading
  loadingMesh.position.set(-2.5, -0.5, 0);
  loadingMesh.layers.set(1);
  loadingMesh.layers.enable(1);
  scene.add(loadingMesh);

});




//halaman loading content
window.addEventListener('readystatechange', loading, false);

//selesai loading 
window.addEventListener('load', loadingDone, false);

function loading(){
  camera.layers.disable(0);
  camera.layers.enable(1);
}
function loadingDone(){
  camera.layers.disable(1);
  camera.layers.enable(0);
}


 //buat raycaster
 const raycaster = new THREE.Raycaster();
 const mouse = new THREE.Vector2();
 let animasiberjalan=false;


 //agar mousetepat walau canvas dipindah ke tengah
 //deteksi mouse dengan canvas
 function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}




 window.addEventListener('mousemove', onMouseMove, false);

 //disini warna dari han ketoka hover
  // Define hover color
  var hoverColor = new THREE.Color(0x6D6D6D);
  // Define original color
  var originalColor = [];

  for (var i = 0; i < materialHan.length; i++) {
    originalColor[i] = materialHan[i].color.clone();
  }
 // ketika hover 


//ketika halaman di load
window.addEventListener('load', onBukak, false);

 function onBukak(event) {
   startRotationAnimation();
 }

 //ketika object diklik
 function onClick(event) {
   // Update raycaster
   raycaster.setFromCamera(mouse, camera);

   // Find all intersected objects
   const intersects = raycaster.intersectObjects(scene.children);

   if (intersects.length > 0) {
     // If intersected object is han mesh, start rotation animation
     if (intersects[0].object === han && animasiberjalan == false) {
       startRotationAnimation();
     }
   }
 }

 window.addEventListener('click', onClick, false);



 
 // Function for starting rotation animation on han mesh
function startRotationAnimation() {
  animasiberjalan =true;
  let elapsedTime = 0;
  let berhentiSejenak =0;
  let isAnimating = true;

    // var mat1 = new TWEEN.Tween(card.material)
    // .to({ opacity: 0 }, 500) // durasi animasi 500 ms
    // .easing(TWEEN.Easing.Quadratic.Out) // jenis animasi
    // .start(); // memulai animasi

    if (mesh) {
      var mat1 = new TWEEN.Tween(mesh.material)
      .to({ opacity: 0 }, 500) // durasi animasi 500 ms
      .easing(TWEEN.Easing.Quadratic.Out) // jenis animasi
      .start(); // memulai animasi
    }

  function rotate() {
    elapsedTime += 0.05;


    han.rotation.x += 0.03;
    camera.position.z +=0.2;
 
    // card.material.opacity -=0.2;

    if (elapsedTime < 5 && isAnimating) {
      //melakukan animasi untuk rotasi disini setTimeout berguna untuk melakukan 80 fps agar membatasi fps di semua device
      setTimeout( function() {
        requestAnimationFrame(rotate);
      }, 1000/80 );
      
    } 
    else if (elapsedTime >= 3 && isAnimating) {
          isAnimating = false;
          elapsedTime = 0;

          function berhenti() {
              berhentiSejenak +=0.05;
        
              if (berhentiSejenak < 5) {
                //melakukan animasi untuk berhenti sejenak disini setTimeout berguna untuk melakukan 80 fps agar membatasi fps di semua device
                setTimeout( function() {
                  requestAnimationFrame(berhenti);
                }, 1000/80 );

              } 
              else {

                function rotateBack() {
                  elapsedTime += 0.05;
                  han.rotation.x -= 0.03;
                  camera.position.z -=0.2;
                  // card.material.opacity +=0.2;

                  if (elapsedTime < 5) {
                    //melakukan animasi untuk rotasi ke asal disini setTimeout berguna untuk melakukan 80 fps agar membatasi fps di semua device
                    setTimeout( function() {
                      requestAnimationFrame(rotateBack);
                    }, 1000/80 );
                  } else {
                    isAnimating = true;
                    elapsedTime = 0;
                    animasiberjalan =false;
                  }
                }
                rotateBack();
              }
          }
          berhenti();
    }
  }

  rotate();
}

//issue1

//card1 adalah teks disamping
var cardText1 = new THREE.TextureLoader().load('asset/tekssamping.png');
//var alphaMap1 = new THREE.TextureLoader().load('tekssamping.png');
// membuat material
var cardMaterial1 = new THREE.MeshBasicMaterial({
  map: cardText1,
  //alphaMap: alphaMap1,
  transparent: true,
  opacity: 10,
  depthTest: true, // non-aktifkan depth test agar selalu ditempatkan di depan
  depthWrite:true,
});

var card1 = new THREE.Mesh(new THREE.PlaneGeometry(8, 0.55), cardMaterial1);
// han.material.opacity =-1;
// han.material.opacity =-1;


scene2.add(card1);
// cara pertama untuk merender ini didepan, tapi scene dibelakang mengalami post processing terhadap bloom
//lebih lengkap di https://stackoverflow.com/questions/12666570/how-to-change-the-zorder-of-object-with-threejs/12666937#12666937
// card1.renderOrder = 999;
// card1.onBeforeRender = function( renderer ) { renderer.clearDepth(); };

card1.rotation.z = -20.42;

//inisialisasi secara realtime
function myFunction(x) {
  if (x1.matches) { // If media query matches
    const width = window.innerWidth * 0.95;
    const height = window.innerHeight * 0.3;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    han.position.z = -0.2;
    han.position.x = 0;
    han.position.y = -0.5;

    // card.position.z = 2;
    // card.position.x = 1.8;
    // card.position.y = -0.1;

    torus.position.z = 0;
    torus.position.x = 0;
    torus.position.y = -0.5;

    torus2.position.z = 0;
    torus2.position.x = 0;
    torus2.position.y = -0.5;
  } 
  else if(x.matches){
    const width = window.innerWidth * 0.95;
    const height = window.innerHeight * 0.35;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    han.position.z = -0.2;
    han.position.x = 0;
    han.position.y = -0.5;

    // card.position.z = 2;
    // card.position.x = 1.8;
    // card.position.y = -0.1;

    torus.position.z = 0;
    torus.position.x = 0;
    torus.position.y = -0.5;

    torus2.position.z = 0;
    torus2.position.x = 0;
    torus2.position.y = -0.5;
    

  }
  else if(x2.matches){
    const width = window.innerWidth * 0.95;
    const height = window.innerHeight * 0.75;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);

    han.position.z = -0.2;
    han.position.x = 0;
    han.position.y = -0.5;

    // card.position.z = 2;
    // card.position.x = 1.8;
    // card.position.y = -0.1;

    torus.position.z = 0;
    torus.position.x = 0;
    torus.position.y = -0.5;

    torus2.position.z = 0;
    torus2.position.x = 0;
    torus2.position.y = -0.5;

  }
  else {
    camera.aspect = origWidth / origHeight;
    camera.updateProjectionMatrix();
    // Handle window resizing
    renderer.setSize(origWidth, origHeight);

    han.position.z = -0.2;
    han.position.x = 0;
    han.position.y = -0.5;

    // card.position.z = 2;
    // card.position.x = 1.8;
    // card.position.y = -0.1;

    torus.position.z = 0;
    torus.position.x = 0;
    torus.position.y = -0.5;

    torus2.position.z = 0;
    torus2.position.x = 0;
    torus2.position.y = -0.5;
  }
}
var x = window.matchMedia("(max-width: 885px)");
var x1 = window.matchMedia("(max-width: 430px)");
var x2 = window.matchMedia("(max-width: 1280px)");
myFunction(x);
x.addListener(myFunction);


//buat durasi
let j=0;
let k=0;
let cek=0;



var kondisiHanMuter=false;




//untuk rotasi lampMesh
// Inisialisasi variabel
var radius = 2.6; // radius orbit
var angle = 0; // sudut awal
var speed = 0.01; // kecepatan rotasi

var center = new THREE.Vector3(0, 0, 0); // pusat orbit

objekDipilih.add(han);
objekDipilih.add(lampMesh);





function addStar() {
  var geometry = new THREE.SphereGeometry(0.25, 24, 24);
  var material = new THREE.MeshStandardMaterial({ emmisive: 0xffffff });
  var star = new THREE.Mesh(geometry, material);

  var [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  // Check if z value is between -50 and 50
  star.position.set(x, y, z);
  objekDipilih.add(star);
  scene.add(star);
}

Array(160).fill().forEach(addStar);


//kondisi menghentikan animasi ketika scroll
let isSceneVisible = false; // Set awalnya ke false karena canvas terlihat

function handleScroll() {
  const canvasElement = document.getElementById('canvas');
  const rect = canvasElement.getBoundingClientRect();

  // Menentukan apakah elemen canvas ada di luar viewport
  if (
    rect.bottom <= 0 ||
    rect.top >= window.innerHeight ||
    rect.right <= 0 ||
    rect.left >= window.innerWidth
  ) {
    isSceneVisible = true;
  } else {
    isSceneVisible = false;
  }
}

window.addEventListener('scroll', handleScroll);



//pakek clok akan membatasi lebih  baik
// Animation Loop
let clock = new THREE.Clock();
let delta = 0;
// 70 fps
let interval = 1 / 70;


function animate() {
  // Logika update dan render

  requestAnimationFrame(animate);


if (!isSceneVisible) {
TWEEN.update();
  //membuat tulisan samping selalu mengikuti camera
  card1.position.copy(camera.position);
  card1.position.z -= 10 * (scene.scale.z || 1);
  card1.position.y=0;
  const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;

// Menentukan posisi x card1
if((canvasWidth / canvasHeight >= 2.4))
  card1.position.x = -18;
else if ((canvasWidth / canvasHeight >= 2.2)&&(canvasWidth / canvasHeight <= 2.4)) {
  // Rasio layar lebar (16:9)
  card1.position.x = -16.5;
} else if((canvasWidth / canvasHeight < 2.2)&&(canvasWidth / canvasHeight > 2.1)) {
  // Rasio layar tinggi (9:16)
  card1.position.x = -16;
}else if((canvasWidth / canvasHeight <= 2.1)&&(canvasWidth / canvasHeight > 1.9)) {
  // Rasio layar tinggi (9:16)
  card1.position.x = -14.5;
}else if((canvasWidth / canvasHeight <= 1.9)&&(canvasWidth / canvasHeight > 1.78)) {
  // Rasio layar tinggi (9:16)
  card1.position.x = -13;
}else if((canvasWidth / canvasHeight <= 1.78) && (canvasWidth / canvasHeight > 1.45)) {
  // Rasio layar tinggi (9:16)
  card1.position.x = -11.4;
} else {
  card1.position.x = -10;
}

  //disini adalah logic untuk hover dari han
    // Update raycaster
    raycaster.setFromCamera(mouse, camera);

    // Find intersected object
    const intersects = raycaster.intersectObjects(scene.children);
  
    // Check if intersected object is han mesh
    if (intersects.length > 0 && intersects[0].object === han) {
      kondisiHanMuter = true;
      canvas.style.cursor = "pointer";
      // Start rotation animation
      for (var i = 0; i < materialHan.length; i++) {
        materialHan[i].color.copy(hoverColor);
      }
      han.rotation.y +=0.01;
      han.rotation.z +=0.01;
      cek+=0.5;
    }else{
      canvas.style.cursor = "auto";
      if(cek != 0){
        cek-=0.5;
        han.rotation.y -=0.01;
        han.rotation.z -=0.01;
      }

      if(cek<=0 || cek>=500){
        var tweenY= new TWEEN.Tween(han.rotation)
        .to({ z: 0, y:0 }, 500) // durasi animasi 500 ms
        .easing(TWEEN.Easing.Quadratic.Out) // jenis animasi
        .onComplete(function() {
          kondisiHanMuter = false;
          cek=0;
        })
        .start(); // memulai animasi
      }

      for (var i = 0; i < materialHan.length; i++) {
        materialHan[i].color.copy(originalColor[i]);
      }
    }
   
// disini
  j++;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torus2.rotation.x -= 0.01;
  torus2.rotation.y -= 0.01;
  torus2.rotation.z -= 0.01;

 lampMesh.rotation.x -= 0.01;
 lampMesh.rotation.y -= 0.01;
 lampMesh.rotation.z -= 0.01;

   // Perbarui sudut rotasi
   angle += speed;

   // Hitung posisi baru untuk lampMesh
   var x = center.x + radius * Math.cos(angle);
   var y = center.y + radius * Math.sin(angle);
 
   // Perbarui posisi dan rotasi lampMesh
   lampMesh.position.set(x, y, 1.2);

//han naik turun
  if(j<=100){ 
    han.position.y +=0.01;}
  else{
    han.position.y -=0.01;}
  if(j==200)
    j=0;


//opacity card
if(animasiberjalan==false){
k++;
  if(k<=100){
      // var mat1 = new TWEEN.Tween(card.material)
      // .to({ opacity: 1 }, 500) // durasi animasi 500 ms
      // .easing(TWEEN.Easing.Quadratic.Out) // jenis animasi
      // .start(); // memulai animasi

      if (mesh) {
        var mat2 = new TWEEN.Tween(mesh.material)
        .to({ opacity: 1 }, 500) // durasi animasi 500 ms
        .easing(TWEEN.Easing.Quadratic.Out) // jenis animasi
        .start(); // memulai animasi
        }
  }
  else{
    // var mat2 = new TWEEN.Tween(card.material)
    // .to({ opacity: 0 }, 300) // durasi animasi 500 ms
    // .easing(TWEEN.Easing.Quadratic.Out) // jenis animasi
    // .start(); // memulai animasi

    if (mesh) {
      var mat2 = new TWEEN.Tween(mesh.material)
      .to({ opacity: 0 }, 300) // durasi animasi 500 ms
      .easing(TWEEN.Easing.Quadratic.Out) // jenis animasi
      .start(); // memulai animasi
      }
  }
  if(k>=200)
    k=0;
}
   
    

    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject(camera);
    var direction = vector.sub(camera.position).normalize();

    // menghitung rotasi objek berdasarkan posisi mouse
    var angleX = Math.atan2(-direction.y, -direction.z);
    var angleY = Math.atan2(direction.x, -direction.z);


    if (animasiberjalan == false && kondisiHanMuter == false) {
      // membuat animasi rotasi menggunakan Tween.js
      var tweenX = new TWEEN.Tween(han.rotation)
        .to({ x: angleX }, 500) // durasi animasi 500 ms
        .easing(TWEEN.Easing.Quadratic.Out) // jenis animasi
        .start(); // memulai animasi

      var tweenY = new TWEEN.Tween(han.rotation)
        .to({ y: angleY }, 500) // durasi animasi 500 ms
        .easing(TWEEN.Easing.Quadratic.Out) // jenis animasi
        .start(); // memulai animasi
    }


  // controls.update();
  delta += clock.getDelta();

  if (delta  > interval) {
      // The draw or time dependent code are here
      renderer.clear();
      composer.render();
      renderer.render( scene, camera );
      renderer.clearDepth();
      renderer.render( scene2, camera );

      delta = delta % interval;
  }

  }
}



animate();

