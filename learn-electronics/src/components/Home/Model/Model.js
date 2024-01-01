import { useEffect } from 'react';
import * as BABYLON from '@babylonjs/core';

const Model = () => {
  useEffect(() => {
    const canvas = document.getElementById('babylonJSCanvas');
    const engine = new BABYLON.Engine(canvas, true);

    const scene = new BABYLON.Scene(engine);

    // Create a camera
    const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 3, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    scene.activeCamera = camera;

    BABYLON.SceneLoader.ImportMeshAsync("", "./", "uno.glb", scene).then((result) => {
      const modelMesh = result.meshes[0];
      modelMesh.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
      modelMesh.position = new BABYLON.Vector3(20, 0, 0);
    });

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener('resize', () => {
      engine.resize();
    });

    return () => {
      scene.dispose();
      engine.dispose();
    };
  }, []);

  return null;
};

export default Model;
