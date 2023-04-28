//import './style.css';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as TWEEN from '@tweenjs/tween.js';

const canvas = document.getElementById('canvas');
const container = document.createElement('div');
container.style.display = 'flex';
container.style.justifyContent = 'center';
container.style.alignItems = 'center';


canvas.parentNode.insertBefore(container, canvas);
container.appendChild(canvas);



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });

const origWidth = window.innerWidth * 0.9;
const origHeight = window.innerHeight * 0.8;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(origWidth, origHeight);
camera.position.set(0, 0, 5);


 

 


// Torus

var geometry = new THREE.TorusGeometry(10, 0.7, 16, 4);
var material = new THREE.MeshStandardMaterial({ color: 0x005566, wireframe : true });
var torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//torus 2
var geometry2 = new THREE.TorusGeometry(12, 0.7, 16, 30);
var material2 = new THREE.MeshStandardMaterial({ color: 0x006655 });
var torus2 = new THREE.Mesh(geometry2, material2);

scene.add(torus2);

// Lights

var pointLight = new THREE.PointLight(0xCCCCCC);
pointLight.position.set(0, 0, 0);

var pointLight = new THREE.PointLight(0xCCCCCC);
pointLight.position.set(0, 0, 50);

var ambientLight = new THREE.AmbientLight(0x606060);
scene.add(pointLight, ambientLight);



function addStar() {
  var geometry = new THREE.SphereGeometry(0.25, 24, 24);
  var material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  var star = new THREE.Mesh(geometry, material);

  var [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  // Check if z value is between -50 and 50

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

//var spaceTexture = new THREE.TextureLoader().load('space.jpg');
//scene.background = spaceTexture;

// Avatar

var hanTexture = new THREE.TextureLoader().load('han.png');
var han = new THREE.Mesh(new THREE.BoxGeometry( 2.5, 2.5, 2.5 ), new THREE.MeshBasicMaterial({ map: hanTexture }));
// han.material.opacity =-1;
// han.material.opacity =-1;
scene.add(han);


//nametag
var alphaMap = new THREE.TextureLoader().load('card.png');
var cardText = new THREE.TextureLoader().load('card.png');
var alphaMap = new THREE.TextureLoader().load('card.png');
var cardMaterial = new THREE.MeshBasicMaterial({
    map: cardText,
    alphaMap: alphaMap,
    transparent: true,
    opacity: 7
});

var card = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.5), cardMaterial);
// han.material.opacity =-1;
// han.material.opacity =-1;
scene.add(card);
//text
const loader = new FontLoader();

loader.load('helvetiker_bold.typeface.json', function(font) {

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




 const material = new THREE.MeshPhongMaterial({ 
  color: 0x006666, // Ubah menjadi warna biru
  specular: 0x555555, 
  shininess: 5, // Kurangi nilai shininess agar tidak terlalu mengkilap
  roughness: 1 // Tambahkan properti roughness untuk membuat permukaan tampak kasar
});
  const textMesh = new THREE.Mesh(geometry, material);

  const material2 = new THREE.MeshPhongMaterial({ 
    color: 0xCCCCCC, // Ubah menjadi warna ungu
    specular: 0x555555, 
    shininess: 5, // Kurangi nilai shininess agar tidak terlalu mengkilap
    roughness: 1 // Tambahkan properti roughness untuk membuat permukaan tampak kasar
  });
  
  const textMesh2 = new THREE.Mesh(geometry2, material2);


  // Set the position of the text mesh to x=0, y=0, z=0
  textMesh.position.set(-3.8, 1, 18);
  textMesh2.position.set(-5.2, -0.9, 18);
  scene.add(textMesh);
  scene.add(textMesh2);

});







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
  var originalColor = han.material.color.clone();
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

  function rotate() {
    elapsedTime += 0.05;


    han.rotation.x += 0.03;
    camera.position.z +=0.2;
    card.material.opacity -=0.2;
    

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
                  card.material.opacity +=0.2;

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


//card1 adalah teks disamping

var alphaMap1 = new THREE.TextureLoader().load('tekssamping.png');
var cardText1 = new THREE.TextureLoader().load('tekssamping.png');
var alphaMap1 = new THREE.TextureLoader().load('tekssamping.png');
// membuat material
var cardMaterial1 = new THREE.MeshBasicMaterial({
  map: cardText1,
  alphaMap: alphaMap1,
  transparent: true,
  opacity: 10,
  depthTest: false, // non-aktifkan depth test agar selalu ditempatkan di depan
  depthWrite: false // non-aktifkan depth write agar tidak mempengaruhi depth buffer
});

var card1 = new THREE.Mesh(new THREE.PlaneGeometry(8, 0.5), cardMaterial1);
// han.material.opacity =-1;
// han.material.opacity =-1;


// mengatur properti renderOrder agar selalu dirender di depan objek lain
card1.renderOrder = 999;
scene.add(card1);


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

    card.position.z = 2;
    card.position.x = 1.8;
    card.position.y = -0.1;

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

    card.position.z = 2;
    card.position.x = 1.8;
    card.position.y = -0.1;

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

    card.position.z = 2;
    card.position.x = 1.8;
    card.position.y = -0.1;

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

    card.position.z = 2;
    card.position.x = 1.8;
    card.position.y = -0.1;

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
let cek=0;

let k=0;

var kondisiHanMuter=false;



// Animation Loop

function animate() {

//animasi yang dilakukan,, disini setTimeout berguna untuk melakukan 80 fps agar membatasi fps di semua device
setTimeout( function() {
  requestAnimationFrame( animate );
}, 1000/80 );

//untuk animasi tween agar gerakan perlahan smooth, lembut banget kek anu
TWEEN.update();


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
      han.material.color.set(hoverColor);
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

      han.material.color.set(originalColor);
    }
   
// disini
  j++;k++;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torus2.rotation.x -= 0.01;
  torus2.rotation.y -= 0.01;
  torus2.rotation.z -= 0.01;

  if(j<=100)
    han.position.y +=0.01;
  else
    han.position.y -=0.01;
  if(j==200)
    j=0;

  if(k<=100)
    card.material.opacity -=0.07;
  else
    card.material.opacity +=0.07;
  if(k==200)
    k=0;

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
  renderer.render(scene, camera)
}



animate();

