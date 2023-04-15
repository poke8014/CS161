import React from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import testAudio from "../testAudio/FlyAway.mp3";

const TestSketch = (props) => {
  const { audioRef } = props;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(220);

    if (!audioRef.current.paused) {
      p5.fill(255, 0, 0);
    } else {
      p5.fill(0, 255, 0);
    }
    p5.rect(p5.width / 2 - 50, p5.height / 2 - 25, 100, 50);
  };

  const mouseClicked = (p5) => {
    if (
      p5.mouseX > p5.width / 2 - 50 &&
      p5.mouseX < p5.width / 2 + 50 &&
      p5.mouseY > p5.height / 2 - 25 &&
      p5.mouseY < p5.height / 2 + 25
    ) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />;
};

export default TestSketch;
