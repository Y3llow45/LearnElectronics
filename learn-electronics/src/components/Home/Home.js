import './Home.css';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Philips_N4422_-_power_supply_transformer-2098.jpg/330px-Philips_N4422_-_power_supply_transformer-2098.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Electronic_component_inductors.jpg/330px-Electronic_component_inductors.jpg',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.build-electronic-circuits.com%2Fwp-content%2Fuploads%2F2013%2F05%2Felectrolytic-capacitor.jpg&f=1&nofb=1&ipt=1d70c0f17be076547e735960b4a1bc9a59602c0f06b45ff9036fb78f45b4e46d&ipo=images',
  ];

  const handleButtonClick = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>

      <div className="sliding-container">
      <div className="slides" style={{ transform: `translateX(-${slideIndex * 100}vw)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="buttons">
        {slides.map((_, index) => (
          <button className="homecontrol" key={index} onClick={() => handleButtonClick(index)} />
        ))}
      </div>
      </div>

      <div class="learning-path">
        <div class="horizontal-div">
          <div class="empty-border"><div class="empty-topic"></div></div>
          <div class="emptyHconnector"></div>
          <div class="topic-border">
            <div class="topic" id="electrons">Electrons</div>
          </div>
          <div class="emptyHconnector"></div>
          <div class="empty-border"><div class="empty-topic"></div></div>
        </div>

        <div class="connector"></div>

        <div class="horizontal-div">
        <div class="topic-border">
            <div class="topic" id="electrons">Electricity safety</div>
          </div>
          <div class="Hconnector"></div>
          <div class="topic-border">
            <div class="topic" id="resistance">Resistance, Current, Voltage</div>
          </div>
          <div class="emptyHconnector"></div>
          <div class="empty-border"><div class="empty-topic"></div></div>
        </div>

        <div class="connector"></div>

        <div class="horizontal-div">
        <div class="empty-border"><div class="empty-topic"></div></div>
          <div class="emptyHconnector"></div>
          <div class="topic-border">
            <div class="topic" id="signal">AC, DC, PWM</div>
          </div>
          <div class="emptyHconnector"></div>
          <div class="empty-border"><div class="empty-topic"></div></div>
        </div>
        
        <div class="connector"></div>

        <div class="horizontal-div">
        <div class="empty-border"><div class="empty-topic"></div></div>
          <div class="emptyHconnector"></div>
          <div class="topic-border">
            <div class="topic" id="signal">Electromagnetism</div>
          </div>
          <div class="emptyHconnector"></div>
          <div class="empty-border"><div class="empty-topic"></div></div>
        </div>

        <div class="connector"></div>

        <div class="horizontal-div">
        <div class="topic-border">
            <div class="topic" id="electrons">IC's</div>
          </div>
          <div class="Hconnector"></div>
          <div class="topic-border">
            <div class="topic" id="resistance">Electric components</div>
          </div>
          <div class="Hconnector"></div>
          <div class="topic-border">
            <div class="topic" id="resistance">Extra components</div>
          </div>
        </div>

        <div class="horizontal-div">
          <div class="connector"></div>
          <div class="div-space"></div>
          <div class="connector"></div>
          <div class="div-space"></div>
          <div class="emptyconnector"></div>
        </div>

        <div class="horizontal-div">
        <div class="topic-border">
            <div class="topic" id="electrons">Microcontrollers</div>
          </div>
          <div class="emptyHconnector"></div>
          <div class="topic-border">
            <div class="topic" id="resistance">Basic circuits</div>
          </div>
          <div class="Hconnector"></div>
          <div class="topic-border">
            <div class="topic" id="resistance">Other resources</div>
          </div>
        </div>

        <div class="connector"></div>

        <div class="horizontal-div">
        <div class="empty-border"><div class="empty-topic"></div></div>
          <div class="emptyHconnector"></div>
          <div class="topic-border">
            <div class="topic" id="signal">Oscillation and frequency</div>
          </div>
          <div class="Hconnector"></div>
          <div class="topic-border">
            <div class="topic" id="signal">Tesla coil</div>
          </div>
        </div>

        <div class="connector"></div>

        <div class="horizontal-div">
        <div class="empty-border"><div class="empty-topic"></div></div>
          <div class="emptyHconnector"></div>
          <div class="topic-border">
            <div class="topic" id="signal">Laws and formulas</div>
          </div>
          <div class="emptyHconnector"></div>
          <div class="empty-border"><div class="empty-topic"></div></div>
        </div>

        <div class="connector"></div>

        <div class="horizontal-div">
        <div class="empty-border"><div class="empty-topic"></div></div>
          <div class="emptyHconnector"></div>
          <div class="topic-border">
            <div class="topic" id="signal">Advanced circuits</div>
          </div>
          <div class="emptyHconnector"></div>
          <div class="empty-border"><div class="empty-topic"></div></div>
        </div>

      </div>
    </div>
)}

export default Home;

/*<div className="home-wlc-text-div">
          <div class="learning-path">
            <div class="topic" id="electrons">Electrons</div>
            <div class="connector"></div>
            <div class="topic" id="resistance">Resistance, Current, Voltage</div>
          </div>
          <div className="firstDiv">
            <p className="home-wlc-text big-text">At Learn Electronics, we're your gateway to the exciting world of electronics, microcontrollers, and more. Whether you're a beginner or a pro, our platform offers resources to help you explore and learn!</p>
            <img src='../homeimage.png' alt="homeimage"></img>
          </div>
          <div className='el-components-div'>
            <p className='home-wlc-text el-components-text'>Electric components are the building blocks of electronics. They are the tiny parts that come together to create circuits and devices.</p>
            <img src='../c.jpg' alt='somet'></img>
          </div> <div className='canvas-div'>
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
      </div> */