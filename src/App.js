import React, { useRef, useState } from 'react';
import './style.css';
import gsap from 'gsap';

/*
Complete the challenges below, *** USING REACT HOOKS ***:

1. Clicking the ROTATE button, should rotate the 2 squares (.App__rotate-square, App__rotate-square-inner) 45 degrees clockwise, on every click. With a half second animation for the rotation. Square with class '.App__rotate-square-inner' should have a one second animation length and should be positioned on top (not above) of the larger square. Make sure the squares are in the center of the screen.

2. Cycle through the background color of the squares, on every rotation, using colors: '#6b00ff','#e301be','#ff0066','#24c5e0'. There should be a one second transition for the color change. The inside square should always be a different color from the large square.

3. Position contaner with class: '.App__stats-container' horizontally centered, 10px from the bottom of the page.

4. Add real values for `Mounted at`, `Last rotated at`, `Number of times rotated`

*/

// Function to generate new Time object
const getCurrentTime = () => {
  let currentDateObj = new Date();

  // return Local Time String
  return currentDateObj.toLocaleTimeString();
};

// function to Generate Random Color
const GenerateRandomColor = arg => {
  // Array of colors
  const colorArray = ['#6b00ff', '#e301be', '#ff0066', '#24c5e0'];
  let newColor = colorArray[Math.floor(Math.random() * 4)];

  while (newColor === arg) {
    newColor = colorArray[Math.floor(Math.random() * 4)];
  }
  // retunr new color
  return newColor;
};

export default function App() {
  // States Declarations
  const mountedAt = useState(getCurrentTime());
  const [clickCounter, setClickCounter] = useState(0);
  const [rotatedAt, setRotatedAt] = useState('No rotations yet');

  // Reference Declarations
  const outerSquareRef = useRef();
  const innerSquareRef = useRef();

  // function to update fields after animation is done
  const onAnimationComplete = () => {
    // Rotation Counter Increment
    setClickCounter(clickCounter + 1);
    // Update Rotation Time
    setRotatedAt(getCurrentTime().toString());
  };

  // button on Click event
  const onButtonClickHandler = event => {
    // Generating Random colors for both squares
    let innerColor = GenerateRandomColor('');
    let outerColor = GenerateRandomColor(innerColor);
    let timeline = gsap.timeline({ onComplete: onAnimationComplete });

    // GSAP animation for outerSquare (Emelent Rotation)
    timeline.to(outerSquareRef.current, {
      rotation: '+=45',
      duration: 0.5
    });
    // GSAP animation for outerSquare (Change Background Color)
    timeline.to(
      outerSquareRef.current,
      {
        onComplete: console.log('done'),
        background: innerColor,
        duration: 1
      },
      '<'
    );
    // GSAP animation for innerSquare (Emelent Rotation)
    timeline.to(
      innerSquareRef.current,
      {
        rotation: '+=45',
        duration: 1
      },
      '<'
    );
    // GSAP animation for innerSquare (Change Background Color)
    timeline.to(
      innerSquareRef.current,
      {
        background: outerColor,
        duration: 1
      },
      '<'
    );
  };

  // wait until DOM has been rendered

  return (
    <div className="App">
      <button className="App__rotate-button" onClick={onButtonClickHandler}>
        ROTATE SQUARE
      </button>
      <div className="App__rotate-square-inner" ref={innerSquareRef} />
      <div className="App__rotate-square" ref={outerSquareRef} />
      <div className="App__stats-container">
        <div className="App__stat">
          Mounted at: <span className="App__stats-value">{mountedAt}</span>
        </div>
        <div className="App__stat">
          Last rotated at:
          <span className="App__stats-value">{rotatedAt}</span>
        </div>
        <div className="App__stat">
          Number of times rotated:
          <span className="App__stats-value">{clickCounter}</span>
        </div>
      </div>
    </div>
  );
}
