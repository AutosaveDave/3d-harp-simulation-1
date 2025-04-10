import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import * as d3 from 'd3';
import * as CANNON from 'cannon-es';
import Chart from 'chart.js/auto';

// Initialize Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('harpCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a wooden frame for the harp with a wood grain texture
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('path/to/wood_texture.jpg');
const frameMaterial = new THREE.MeshBasicMaterial({ map: woodTexture });
const frameGeometry = new THREE.BoxGeometry(1, 5, 0.1);
const frame = new THREE.Mesh(frameGeometry, frameMaterial);
scene.add(frame);

// Add four strings to the harp with initial tuning E-A-D-G
const strings = [];
const stringTensions = [80, 60, 40, 20]; // Example tensions in newtons
const stringNotes = ['E', 'A', 'D', 'G'];
const stringFrequencies = [82.41, 110, 146.83, 196]; // Frequencies in Hz

for (let i = 0; i < 4; i++) {
    const stringGeometry = new THREE.CylinderGeometry(0.01, 0.01, 5, 32);
    const stringMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const string = new THREE.Mesh(stringGeometry, stringMaterial);
    string.position.set(0, 0, i * 0.1 - 0.15);
    strings.push(string);
    scene.add(string);
}

// Implement string plucking and vibration using physics
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

const stringBodies = strings.map((string, index) => {
    const shape = new CANNON.Cylinder(0.01, 0.01, 5, 32);
    const body = new CANNON.Body({ mass: 0.1, shape });
    body.position.set(0, 0, index * 0.1 - 0.15);
    world.addBody(body);
    return body;
});

function pluckString(index) {
    const body = stringBodies[index];
    body.applyForce(new CANNON.Vec3(0, 10, 0), body.position);
    gsap.to(strings[index].material.color, { r: 1, g: 0, b: 0, duration: 0.1, yoyo: true, repeat: 1 });
}

// Add tuning pegs and implement tuning functionality
const tuningPegs = [];
for (let i = 0; i < 4; i++) {
    const pegGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32);
    const pegMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const peg = new THREE.Mesh(pegGeometry, pegMaterial);
    peg.position.set(0, 2.5, i * 0.1 - 0.15);
    tuningPegs.push(peg);
    scene.add(peg);
}

function tuneString(index, tension) {
    stringTensions[index] = tension;
    stringFrequencies[index] = Math.sqrt(tension / 0.1) * 82.41; // Example calculation
}

// Implement camera controls with spacebar and mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        controls.enabled = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
        controls.enabled = false;
    }
});

// Add labels for string tension, pitch, and musical note
const labels = [];
for (let i = 0; i < 4; i++) {
    const label = document.createElement('div');
    label.style.position = 'absolute';
    label.style.color = 'white';
    label.innerHTML = `Tension: ${stringTensions[i]} N, Pitch: ${stringFrequencies[i]} Hz, Note: ${stringNotes[i]}`;
    labels.push(label);
    document.body.appendChild(label);
}

function updateLabels() {
    for (let i = 0; i < 4; i++) {
        labels[i].innerHTML = `Tension: ${stringTensions[i]} N, Pitch: ${stringFrequencies[i]} Hz, Note: ${stringNotes[i]}`;
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    world.step(1 / 60);
    for (let i = 0; i < 4; i++) {
        strings[i].position.copy(stringBodies[i].position);
    }
    updateLabels();
    renderer.render(scene, camera);
}

animate();
