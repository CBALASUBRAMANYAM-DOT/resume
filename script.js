// Typing animation - Slideshow from bottom with fade
const words = [
  "Data Analyst",
  "Python • SQL • Power BI • Excel",
  "Analyzing data and turning it into powerful insights"
];

let i = 0;

function slideshow(){
  const text = document.querySelector(".typing");
  
  text.classList.remove("fade-in");
  text.classList.add("fade-out");
  
  setTimeout(() => {
    text.innerText = words[i];
    text.classList.remove("fade-out");
    text.classList.add("fade-in");
    
    i++;
    if(i >= words.length){
      i = 0;
    }
  }, 300);
}

slideshow();
setInterval(slideshow, 2750);

// 3D DATA PARTICLES NETWORK BACKGROUND (Three.js)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x0099ff, 1.5);
pointLight.position.set(100, 100, 100);
pointLight.castShadow = true;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x00ff88, 1);
pointLight2.position.set(-100, -100, -100);
scene.add(pointLight2);

// Create Data Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;

const posArray = new Float32Array(particlesCount * 3);
const velocityArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++){
  posArray[i] = (Math.random() - 0.5) * 400;
  velocityArray[i] = (Math.random() - 0.5) * 0.3;
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.5,
  color: 0x0099ff,
  transparent: true,
  opacity: 0.8,
  sizeAttenuation: true
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create connecting lines between particles
const maxDistance = 50;
let connectionLines = null;

function createConnections(){
  // Remove old lines
  if(connectionLines){
    scene.remove(connectionLines);
  }
  
  // Store particle positions
  const positions = particlesGeometry.attributes.position.array;
  
  // Create line segments
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = [];
  
  for(let i = 0; i < particlesCount; i++){
    for(let j = i + 1; j < particlesCount; j++){
      const x1 = positions[i * 3];
      const y1 = positions[i * 3 + 1];
      const z1 = positions[i * 3 + 2];
      
      const x2 = positions[j * 3];
      const y2 = positions[j * 3 + 1];
      const z2 = positions[j * 3 + 2];
      
      const distance = Math.sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2);
      
      if(distance < maxDistance){
        linePositions.push(x1, y1, z1);
        linePositions.push(x2, y2, z2);
      }
    }
  }
  
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
  
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x0066cc,
    transparent: true,
    opacity: 0.1,
    linewidth: 1
  });
  
  connectionLines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(connectionLines);
}

createConnections();

// Data Flow Particles (Large Green Particles)
const flowGeometry = new THREE.BufferGeometry();
const flowCount = 300;
const flowPositions = new Float32Array(flowCount * 3);
const flowVelocity = new Float32Array(flowCount * 3);

for(let i = 0; i < flowCount * 3; i++){
  flowPositions[i] = (Math.random() - 0.5) * 350;
  flowVelocity[i] = (Math.random() - 0.5) * 0.5;
}

flowGeometry.setAttribute('position', new THREE.BufferAttribute(flowPositions, 3));

const flowMaterial = new THREE.PointsMaterial({
  size: 0.8,
  color: 0x00ff88,
  transparent: true,
  opacity: 0.6,
  sizeAttenuation: true
});

const flowParticles = new THREE.Points(flowGeometry, flowMaterial);
scene.add(flowParticles);

// Tiny Data Particle Flow (Ultra small particles following paths)
const tinyParticlesGeometry = new THREE.BufferGeometry();
const tinyParticlesCount = 1500;
const tinyPositions = new Float32Array(tinyParticlesCount * 3);
const tinyVelocities = new Float32Array(tinyParticlesCount * 3);

for(let i = 0; i < tinyParticlesCount * 3; i++){
  tinyPositions[i] = (Math.random() - 0.5) * 350;
  tinyVelocities[i] = (Math.random() - 0.5) * 0.8;
}

tinyParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(tinyPositions, 3));

const tinyMaterial = new THREE.PointsMaterial({
  size: 0.15,
  color: 0x00ccff,
  transparent: true,
  opacity: 0.5,
  sizeAttenuation: true
});

const tinyParticles = new THREE.Points(tinyParticlesGeometry, tinyMaterial);
scene.add(tinyParticles);

// Animation Loop
let time = 0;
let updateConnectionsCounter = 0;

function animate(){
  requestAnimationFrame(animate);
  time += 0.001;
  
  // Rotate particles slowly
  particlesMesh.rotation.x += 0.00008;
  particlesMesh.rotation.y += 0.00015;
  particlesMesh.rotation.z += 0.00005;
  
  // Gentle floating motion for main particles
  const positions = particlesGeometry.attributes.position.array;
  for(let i = 0; i < particlesCount; i++){
    positions[i * 3] += Math.sin(time + i) * 0.015;
    positions[i * 3 + 1] += Math.cos(time + i * 0.5) * 0.015;
    positions[i * 3 + 2] += Math.sin(time + i * 0.3) * 0.01;
    
    // Bounce particles at boundaries
    if(Math.abs(positions[i * 3]) > 200) velocityArray[i * 3] *= -1;
    if(Math.abs(positions[i * 3 + 1]) > 200) velocityArray[i * 3 + 1] *= -1;
    if(Math.abs(positions[i * 3 + 2]) > 200) velocityArray[i * 3 + 2] *= -1;
  }
  
  particlesGeometry.attributes.position.needsUpdate = true;
  
  // Animate flow particles with velocity
  const flowPos = flowGeometry.attributes.position.array;
  for(let i = 0; i < flowCount; i++){
    flowPos[i * 3] += flowVelocity[i * 3];
    flowPos[i * 3 + 1] += flowVelocity[i * 3 + 1];
    flowPos[i * 3 + 2] += flowVelocity[i * 3 + 2];
    
    // Reset position when out of bounds
    if(Math.abs(flowPos[i * 3]) > 200) flowPos[i * 3] = (Math.random() - 0.5) * 350;
    if(Math.abs(flowPos[i * 3 + 1]) > 200) flowPos[i * 3 + 1] = (Math.random() - 0.5) * 350;
    if(Math.abs(flowPos[i * 3 + 2]) > 200) flowPos[i * 3 + 2] = (Math.random() - 0.5) * 350;
  }
  
  flowGeometry.attributes.position.needsUpdate = true;
  
  // Animate tiny particles with random drift
  const tinyPos = tinyParticlesGeometry.attributes.position.array;
  for(let i = 0; i < tinyParticlesCount; i++){
    tinyPos[i * 3] += Math.sin(time * 2 + i) * 0.08;
    tinyPos[i * 3 + 1] += Math.cos(time * 1.5 + i * 0.5) * 0.08;
    tinyPos[i * 3 + 2] += Math.sin(time * 1.8 + i * 0.3) * 0.06;
    
    // Wrap around boundaries
    if(Math.abs(tinyPos[i * 3]) > 250) tinyPos[i * 3] *= -0.9;
    if(Math.abs(tinyPos[i * 3 + 1]) > 250) tinyPos[i * 3 + 1] *= -0.9;
    if(Math.abs(tinyPos[i * 3 + 2]) > 250) tinyPos[i * 3 + 2] *= -0.9;
  }
  
  tinyParticlesGeometry.attributes.position.needsUpdate = true;
  
  // Update connections every few frames
  updateConnectionsCounter++;
  if(updateConnectionsCounter > 30){
    createConnections();
    updateConnectionsCounter = 0;
  }
  
  // Animate flow particles rotation
  flowParticles.rotation.x += 0.0003;
  flowParticles.rotation.y += 0.0005;
  flowParticles.rotation.z += 0.0002;
  
  // Pulse flow particles
  const flowScale = Math.sin(time * 3) * 0.3 + 1;
  flowParticles.scale.set(flowScale, flowScale, flowScale);
  
  // Animate tiny particles rotation
  tinyParticles.rotation.x += 0.0001;
  tinyParticles.rotation.y += 0.0003;
  tinyParticles.rotation.z += 0.00015;
  
  // Pulsing opacity for tiny particles
  const tinyOpacity = Math.sin(time * 2) * 0.3 + 0.5;
  tinyMaterial.opacity = tinyOpacity;
  
  // Enhanced camera movement
  camera.position.x = Math.sin(time * 0.3) * 15;
  camera.position.y = Math.cos(time * 0.2) * 15;
  camera.position.z = 100 + Math.sin(time * 0.5) * 20;
  camera.lookAt(scene.position);
  
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});