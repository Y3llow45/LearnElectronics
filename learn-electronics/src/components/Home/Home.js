import './Home.css';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  
  const slides = [
    './transformer.png',
    './inductor.png',
    './capacitor.png',
    './dc.png',
    './H-bridge.png',
  ];

  const descriptions = [
    'A transformer is a passive component that transfers electrical energy from one electrical circuit to another',
    'A passive two-terminal electrical component that stores energy in a magnetic field when electric current flows through it.',
    'A capacitor is an electronic device that stores electrical energy in an electric field',
    'An electronic circuit or electromechanical device that converts a source of direct current (DC) from one voltage level to another',
    'An H-bridge is an electronic circuit that switches the polarity of a voltage applied to a load.'
  ]

  const titles = [
    'How transformers work?',
    'Check out this inductor tutorial!',
    'How to charger a capacitor?',
    `Let's boost some voltage with this circuit`,
    'Control mototrs with H-bridge',
  ]

  const handleButtonClick = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
      <div className="sliding-container">
      <div className="slides" style={{ transform: `translateX(-${slideIndex * 100}vw)` }}>
        {slides.map((slide, index, text) => (
          <div key={index} className="slide">
            <div className='little-slide'>
              <p className='slide-title'>{titles[index]}</p>
              <p className='slide-description'>{descriptions[index]}</p>
              <button className='slide-link'>Read more </button>
            </div>
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="buttons">
        {slides.map((_, index) => (
          <button className={index === slideIndex ? 'homecontrol active' : 'homecontrol'} key={index} onClick={() => handleButtonClick(index)} />
        ))}
      </div>
      </div>

      <div class="custom-shape-divider-top-1705344337" style={{"height": "200px"}}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 70">
        <path
          fill="#1A242D"
          className="shape-fill"
          fill-opacity="1"
          d="M0,35C120,55,240,35,360,30C480,25,600,35,720,35C840,35,960,25,1080,20C1200,15,1320,15,1440,35L1440,0L0,0Z"
        ></path>
      </svg>
      </div>    

      <div className='middle-home'>
        <div><p>Explore lessons</p></div>
        <div><p>Add lessons</p></div>
        <div><p>Edit lessons</p></div>
        <div><p>Other resources</p></div>
        <div><p>Github</p></div>
        <div><p>Distractions</p></div>
        <div><p>Visit blog</p></div>
      </div>

      <p className='lp-text'>Learning path</p>
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