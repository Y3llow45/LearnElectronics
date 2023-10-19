import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from "./components/Header/Header"
import Home from './components/Home/Home';
import Lessons from './components/Lessons/Lessons';
import Add from './components/Add/Add';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Footer from './components/Footer/Footer';
import Edit from './components/Edit/Edit';
import ModPage from './components/ModPage/ModPage';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {Canvas} from '@react-three/fiber'
import { Suspense } from 'react';
import {useGLTF, Stage, PresentationControls} from '@react-three/drei';

function Model(props) {
  const {scene} = useGLTF('./uno.glb');
  return <primitive object={scene} {...props} />
} 

function App() {
  return (
    <div className="app-container">
        <Header />
        <ToastContainer
          className="add-toast-container"
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
        <div className='main-content'>
          <Switch>
            <Route path="/" exact>
              <Home></Home>
              <Canvas dpr={[1,2]} camera={{fov:100}} style={{ height: '600px' }} shadows={false} >
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
            </Route>
            <Route path="/lessons" component={Lessons} />
            <Route path="/add" component={Add} />
            <Route path="/edit" component={Edit} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/supersecretemoderatorpage" component={ModPage} />
          </Switch>
        </div>
    <Footer />
    </div>
  );
}

export default App;
//<color attach="background" args={["#101010"]}/>