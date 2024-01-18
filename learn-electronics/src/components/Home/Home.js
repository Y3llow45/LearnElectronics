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
      //selected = document.getElementById()
      //selected.style()
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div>
      <div className="sliding-container">
      <div className="slides" style={{ transform: `translateX(-${slideIndex * 100}vw)` }}>
        {slides.map((slide, index, text) => (
          <div key={index} className="slide">
            <h2>{descriptions[index]}</h2>
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

      <div class="custom-shape-divider-top-1705344337" style={{"height": "158px"}}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path  fill='#1A242D' class="shape-fill" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,144C384,128,480,64,576,48C672,32,768,64,864,85.3C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
      </svg>

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