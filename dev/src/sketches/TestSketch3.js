import React from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";

const TestSketch = (props) => {
  const { audioLink } = props;
  let sound;

  const preload = (p5) => {
	sound = p5.loadSound(audioLink);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(220);

    if (sound.isPlaying()) {
		p5.fill(255, 0, 0);
	} else {
		p5.fill(0, 255, 0);
	}

    p5.rectMode(p5.CENTER);
    p5.rect(p5.width / 2, p5.height / 2, 100, 50);
  };

  const mouseClicked = (p5) => {
    const x = p5.mouseX;
    const y = p5.mouseY;
    const centerX = p5.width / 2;
    const centerY = p5.height / 2;
    sound.setVolume = 0.3;

    if (
      x > centerX - 50 &&
      x < centerX + 50 &&
      y > centerY - 25 &&
      y < centerY + 25
    ) {
      if (sound.isPlaying()) {
		sound.pause();
	  } else {
		sound.play();
	  }
    }
  };

  return <Sketch preload={preload} setup={setup} draw={draw} mouseClicked={mouseClicked} />;
};

export default TestSketch;
