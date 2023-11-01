import './Home.css';
import CanvasComponent from './Canvas/Canvas';

function Home() {
  return (
    <div>
      <div className="home-wlc-text-div">
        <p className="home-wlc-text">At Learn Electronics, we're your gateway to the exciting world of electronics, microcontrollers, and more. Whether you're a beginner or a pro, our platform offers a treasure trove of knowledge and resources to help you explore and learn.</p>
        <div className='canvas-div'>
          <CanvasComponent />
        </div>
      </div>
    </div>
  );
}

export default Home;
