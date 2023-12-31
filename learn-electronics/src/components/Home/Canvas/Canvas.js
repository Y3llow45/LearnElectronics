import React from 'react';
import './Canvas.css';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Stage, PresentationControls } from '@react-three/drei';
import Model from '../Model/Mode'; // Import the modified Model component

const CanvasComponent = () => {
  return (
    <R3FCanvas dpr={[1, 2]} camera={{ fov: 100 }} className="arduino-canvas" shadows={false}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={1} />
      <PresentationControls speed={2} global>
        <Stage environment={null}>
          <Suspense fallback={null}>
            <Model scale={0.2} />
          </Suspense>
        </Stage>
      </PresentationControls>
    </R3FCanvas>
  );
};

export default CanvasComponent;
