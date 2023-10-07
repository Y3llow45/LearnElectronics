import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const textureLoader = new THREE.TextureLoader();

function Home() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    // Append renderer to container
    const container = document.getElementById('3d-container');
    container.appendChild(renderer.domElement);

    // Load 3D model
    const loader = new GLTFLoader();
    let model;
    loader.load('../../assets/scene.gltf', (gltf) => {
        model = gltf.scene;
      
        // Apply textures here
        const texture = textureLoader.load('../../assets/textures/Material_218_baseColor.png');
        model.traverse((child) => {
          if (child.isMesh) {
            child.material.map = texture;
          }
        });
      
        scene.add(model);
      },
      (err) => {
        console.error('Error loading GLTF model:', err);
      });

    // Camera position
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (model) {
        model.rotation.x += 0.01;
        model.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <div>
      <div className="home-wlc-text-div">
        <p className="home-wlc-text">At Learn Electronics, we're your gateway to the exciting world of electronics, microcontrollers, and more. Whether you're a beginner or a pro, our platform offers a treasure trove of knowledge and resources to help you explore and learn.</p>
      </div>
      <div id="3d-container"></div>
    </div>
  );
}

export default Home;
