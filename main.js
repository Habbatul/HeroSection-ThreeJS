//import './style.css';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

 // Setup
var canvas = document.getElementById('canvas');
 var scene = new THREE.Scene();
 var camera = new THREE.PerspectiveCamera(75, canvas.window.innerHeight / window.innerWidth, 0.1, 1000);
 const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

 const origWidth = window.innerWidth - 80;
 const origHeight = window.innerHeight - 220;


 renderer.setSize(origWidth, origHeight);

 // Set up container
 const container = document.createElement('div');
 container.style.display = 'flex';
 container.style.justifyContent = 'center';
 container.style.alignItems = 'center';
 canvas.parentNode.insertBefore(container, canvas);
 container.appendChild(canvas);
 container.appendChild(renderer.domElement);

 // Set initial camera position
 camera.position.setZ(5);
 camera.position.setX(0);
 camera.position.setY(0);




 


// Torus

var geometry = new THREE.TorusGeometry(10, 0.7, 16, 4);
var material = new THREE.MeshStandardMaterial({ color: 0xbf47ff, wireframe : true });
var torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//torus 2
var geometry2 = new THREE.TorusGeometry(12, 0.7, 16, 30);
var material2 = new THREE.MeshStandardMaterial({ color: 0x681E4E });
var torus2 = new THREE.Mesh(geometry2, material2);

scene.add(torus2);

// Lights

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 10000000);

var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(pointLight, ambientLight);


function addStar() {
  var geometry = new THREE.SphereGeometry(0.25, 24, 24);
  var material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  var star = new THREE.Mesh(geometry, material);

  var [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, -z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

// var spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

// Avatar

var hanTexture = new THREE.TextureLoader().load('han.png');
var han = new THREE.Mesh(new THREE.BoxGeometry( 2.5, 2.5, 2.5 ), new THREE.MeshBasicMaterial({ map: hanTexture }));
han.material.opacity =0.5;
han.material.opacity =0.5;
scene.add(han);

//text
const loader = new FontLoader();

loader.load('node_modules/three/examples/fonts/helvetiker_bold.typeface.json', function(font) {

  const geometry = new TextGeometry('Welcome to', {
    font: font,
    size: 1, // Ukuran font baru yang lebih kecil
    height: 0.5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  const geometry2 = new TextGeometry('Hq.Han Website', {
    font: font,
    size: 1, // Ukuran font baru yang lebih kecil
    height: 0.5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 5,
  });




 const material = new THREE.MeshPhongMaterial({ 
  color: 0x3498db, // Ubah menjadi warna biru
  specular: 0x555555, 
  shininess: 5, // Kurangi nilai shininess agar tidak terlalu mengkilap
  roughness: 1 // Tambahkan properti roughness untuk membuat permukaan tampak kasar
});
  const textMesh = new THREE.Mesh(geometry, material);

  const material2 = new THREE.MeshPhongMaterial({ 
    color: 0x8e44ad, // Ubah menjadi warna ungu
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

 //deteksi mouse dengan canvas
 function onMouseMove(event) {
   // Calculate mouse position in normalized device coordinates
   // (-1 to +1) for both components
   mouse.x = (event.clientX / canvas.offsetWidth) * 2 - 1;
   mouse.y = -(event.clientY / canvas.offsetHeight) * 2 + 1;
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


    han.rotation.x += 0.1;
    camera.position.z +=0.2;
    

    if (elapsedTime < 5 && isAnimating) {
      requestAnimationFrame(rotate);
      
    } 
    else if (elapsedTime >= 3 && isAnimating) {
          isAnimating = false;
          elapsedTime = 0;

          function berhenti() {
              berhentiSejenak +=0.05;
        
              if (berhentiSejenak < 5) {
                requestAnimationFrame(berhenti);
              } 
              else {

                function rotateBack() {
                  elapsedTime += 0.05;
                  han.rotation.x -= 0.1;
                  camera.position.z -=0.2;

                  if (elapsedTime < 5) {
                    requestAnimationFrame(rotateBack);
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




//inisialisasi secara realtime
function myFunction(x) {
  if (x.matches) { // If media query matches
    const width = window.innerWidth - 20;
    const height = window.innerHeight - 500;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Handle window resizing
    window.addEventListener('resize', function() {
      const width = window.innerWidth - 20;
      const height = window.innerHeight - 500;

      renderer.setSize(width, height);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Set renderer size to original size if resized to larger size
      if (width >= origWidth && height >= origHeight) {
        renderer.setSize(origWidth, origHeight);
        camera.aspect = origWidth / origHeight;
        camera.updateProjectionMatrix();
      }
    });

    renderer.setSize(width, height);

    han.position.z = 1;
    han.position.x = 0;
    han.position.y = -0.5;

    torus.position.z = 1;
    torus.position.x = 0;
    torus.position.y = -0.5;

    torus2.position.z = 1;
    torus2.position.x = 0;
    torus2.position.y = -0.5;
  } 

  else if(!(x.matches)) {
    camera.aspect = origWidth / origHeight;
    camera.updateProjectionMatrix();

    // Handle window resizing
    window.addEventListener('resize', function() {
      const width = window.innerWidth - 80;
      const height = window.innerHeight - 220;

      renderer.setSize(width, height);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    renderer.setSize(origWidth, origHeight);

    han.position.z = 0;
    han.position.x = 0;
    han.position.y = -0.5;

    torus.position.z = 0;
    torus.position.x = 0;
    torus.position.y = -0.5;

    torus2.position.z = 0;
    torus2.position.x = 0;
    torus2.position.y = -0.5;
  }
}
var x = window.matchMedia("(max-width: 1264px)");
myFunction(x);
x.addListener(myFunction);


function IPHONEX(x) {
  if (h.matches && w.matches) { 
    const Width = window.innerWidth - 20;
    const Height = window.innerHeight - 450;
    camera.aspect = Width / Height;
    camera.updateProjectionMatrix();
    const width = window.innerWidth - 20;
    const height = window.innerHeight - 450;

    renderer.setSize(width, height);
    // renderer.setSize(100,200);
    han.position.z = 1;
    han.position.x =0;
    han.position.y = -0.5;
    
    torus.position.z = 1;
    torus.position.x = 0;
    torus.position.y = -0.5;
    
    torus2.position.z = 1;
    torus2.position.x = 0;
    torus2.position.y = -0.5;
  }
}

var w = window.matchMedia("(max-width: 360px)");
var h = window.matchMedia("(max-height: 780px)");

IPHONEX(x);
x.addListener(myFunction);

//buat durasi
let j=0;
let cek=0;

// Animation Loop

function animate() {

//animasi yang dilakukan 
  requestAnimationFrame(animate);

  //disini adalah logic untuk hover dari han
    // Update raycaster
    raycaster.setFromCamera(mouse, camera);

    // Find intersected object
    const intersects = raycaster.intersectObjects(scene.children);
  
    // Check if intersected object is han mesh
    if (intersects.length > 0 && intersects[0].object === han) {
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
        han.rotation.y -= 0.01;
        han.rotation.z -=0.01;
        if(han.rotation.y < 0){
          han.rotation.y = 0;
        }
        if(han.rotation.z < 0){
          han.rotation.z = 0;
        }
        
      }
      han.material.color.set(originalColor);
    }
    console.log(han.position.z)
// disini
  j++;
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




  
  // controls.update();
  renderer.render(scene, camera)
}

animate();

