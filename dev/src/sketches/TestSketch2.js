import React from "react";
import Sketch from "react-p5";
// Where is the circle
let x, y;

export default (props) => {
    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)

        p5.createCanvas(500, 500).parent(canvasParentRef);
        x = p5.width / 2;
        y = p5.height / 2;
    };

    const draw = (p5) => {
        p5.background(0);

        // Draw a circle
        p5.stroke(50);
        p5.fill(100);
        p5.ellipse(x, y, 24, 24);

        // Jiggling randomly on the horizontal axis
        x = x + p5.random(-1, 1);
        // Moving up at a constant speed
        y = y - 1;
        
        // Reset to the bottom
        if (y < 0) {
            y = p5.height;
        }
    };

    return <Sketch setup={setup} draw={draw} />;        
}

/*
 * Original code
 * View above to see react-p5 adaptation
 */
// function setup() {
//   createCanvas(720, 400);
//   // Starts in the middle
//   x = width / 2;
//   y = height;
// }

// function draw() {
//   background(200);
  
//   // Draw a circle
//   stroke(50);
//   fill(100);
//   ellipse(x, y, 24, 24);
  
//   // Jiggling randomly on the horizontal axis
//   x = x + random(-1, 1);
//   // Moving up at a constant speed
//   y = y - 1;
  
//   // Reset to the bottom
//   if (y < 0) {
//     y = height;
//   }
// }
