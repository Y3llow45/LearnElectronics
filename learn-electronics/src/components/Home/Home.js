import './Home.css';
import CanvasComponent from './Canvas/Canvas';

function Home() {
  return (
      <div className="home-wlc-text-div">
        <p className="home-wlc-text">At Learn Electronics, we're your gateway to the exciting world of electronics, microcontrollers, and more. Whether you're a beginner or a pro, our platform offers a treasure trove of knowledge and resources to help you explore and learn!</p>
        
        <div className='canvas-div'>
          <CanvasComponent />
          <p className="home-wlc-text">Microcontrollers are like tiny, smart computers that can make your home life easier. They can control lights, thermostats, and more.
            In our "Microcontrollers" category, you'll discover how these little devices can automate everyday tasks.
            Arduino, a popular microcontroller, is a great starting point for beginners. You can learn to build fun gadgets for your home.
            Get started with microcontrollers, and you'll be amazed at how they can enhance your home environment.</p>
        </div>
        
        <div className='electronics-div'>
          <p className="home-wlc-text">Electronics is all around us! It's the science behind phones, computers, and so much more.
    If you're curious about how things work, electronics can be both a hobby and a career. It's a world of endless possibilities.
    At our website, you can learn the basics of electronics, like circuits and components, in a beginner-friendly way.
    Dive into electronics, and you'll have the skills to create your own gadgets and devices in no time.
    Understanding electronics can open doors to endless innovations, from building robots to designing your own devices.</p>
        </div>
      </div>
  );
}

export default Home;
