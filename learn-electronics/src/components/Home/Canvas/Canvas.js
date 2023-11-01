import './Canvas.css'
import {Canvas} from '@react-three/fiber'
import { Suspense } from 'react';
import {useGLTF, Stage, PresentationControls} from '@react-three/drei';

function Model(props) {
  const {scene} = useGLTF('./uno.glb');
  return <primitive object={scene} {...props} />
} 

const CanvasComponent = () => {
    return (
        <Canvas dpr={[1,2]} camera={{fov:100}} className='arduino-canvas' shadows={false} >
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 1, 1]} intensity={1} />
            <PresentationControls speed={2} global>
                <Stage environment={null}>
                    <Suspense fallback={null}>
                        <Model scale={0.2} />
                    </Suspense>
                </Stage>
            </PresentationControls>
        </Canvas>
    );
};

export default CanvasComponent;