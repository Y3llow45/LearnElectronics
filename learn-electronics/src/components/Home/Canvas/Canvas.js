import React, { useState, useEffect } from 'react';
import './Canvas.css';
import { Canvas as R3FCanvas, useThree } from '@react-three/fiber';
import { Suspense } from 'react';
import { useGLTF, Stage, PresentationControls } from '@react-three/drei';

function Model(props) {
    const { scene } = useGLTF('./uno.glb');
    return <primitive object={scene} {...props} />;
  }
  
  function CheckWebGL({ children }) {
    const { gl } = useThree();
    const [webGLAvailable, setWebGLAvailable] = useState(true);
  
    useEffect(() => {
      if (!gl) {
        setWebGLAvailable(false);
      }
    }, [gl]);
  
    return webGLAvailable ? children : null;
  }
  
  const CanvasComponent = () => {
    return (
      <R3FCanvas dpr={[1, 2]} camera={{ fov: 100 }} className="arduino-canvas" shadows={false}>
        <CheckWebGL>
          <ambientLight intensity={0.5} />
          <directionalLight position={[1, 1, 1]} intensity={1} />
          <PresentationControls speed={2} global>
            <Stage environment={null}>
              <Suspense fallback={null}>
                <Model scale={0.2} />
              </Suspense>
            </Stage>
          </PresentationControls>
        </CheckWebGL>
      </R3FCanvas>
    );
  };
  
  export default CanvasComponent;