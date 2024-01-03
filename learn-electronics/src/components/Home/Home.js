import './Home.css';

function Home() {
  return (
      <div className="home-wlc-text-div">
        <div className="firstDiv">
          <p className="home-wlc-text big-text">At Learn Electronics, we're your gateway to the exciting world of electronics, microcontrollers, and more. Whether you're a beginner or a pro, our platform offers resources to help you explore and learn!</p>
          <img src='../homeimage.png'></img>
        </div>
        <div className='el-components-div'>
          <p className='home-wlc-text el-components-text'>Electric components are the building blocks of electronics. They are the tiny parts that come together to create circuits and devices.</p>
          <img src='../c.jpg' alt='somet'></img>
        </div>

        <div className='canvas-div'>
        <img src="./arduino.png" alt="arduino" id="arduino"></img>
          <p className="microcontroller-text home-wlc-text">Microcontrollers are tiny computers. They can control lights, thermostats, motors and many more.
            In our "Microcontrollers" category, you'll discover how these little devices can automate everyday tasks.
            </p>
        </div>
        
        <div className='electronics-div'>
          <p className="home-wlc-text">Electronics are all around us! It's the science behind phones, computers, and so much more.
            This can be both a hobby and a career. Understanding electronics can open doors to endless innovations, from building robots to designing your own devices.</p>
            <div className='img-bottom-div'>
            <img className='img-bottom' src='../1.png' alt='somet'></img>
            <img className='img-bottom' src='../2.png' alt='somet'></img>
            </div>
        </div>
      </div>
  );
}

export default Home;