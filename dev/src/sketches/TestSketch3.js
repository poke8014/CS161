import React from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";

const TestSketch = (props) => {
	let sound;
	let amplitude;
  
	const preload = (p5) => {
	  sound = p5.loadSound(props);
	};
  
	const setup = (p5, canvasParentRef) => {
	  p5.createCanvas(400, 400).parent(canvasParentRef);
	  amplitude = new p5.Amplitude();
	  sound.play();
	};
  
	const draw = (p5) => {
	  p5.background(220);
	  const level = amplitude.getLevel();
	  const size = p5.map(level, 0, 1, 50, 200);
  
	  p5.noStroke();
	  p5.fill(0, 255, 0);
	  p5.ellipse(p5.width / 2, p5.height / 2, size);
	};
  
	return <Sketch preload={preload} setup={setup} draw={draw} />;
};

export default TestSketch;
