import React from 'react';
import { Engine, Scene } from 'babylonjs';
import Model from '../Model/Model';

const CanvasComponent = () => {
  return (
    <Engine antialias adaptToDeviceRatio canvasId="babylonJSCanvas">
      <Scene>
        <Model />
      </Scene>
    </Engine>
  );
};

export default CanvasComponent;
