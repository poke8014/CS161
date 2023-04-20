import React from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";

const TestSketch = (props) => {
  const { audioLink } = props;
  const song = React.useRef();
  const fft = React.useRef();
  const volhistory = React.useRef([]);

  const toggleSong = () => {
    if (song.current.isPlaying()) {
      song.current.pause();
    } else {
      song.current.play();
    }
  };

  const preload = (p5) => {
    song.current = p5.loadSound(audioLink);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(200, 200).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    song.current.setVolume(0.3);
    song.current.play();
    fft.current = new p5.FFT();
  };

  const draw = (p5) => {
    p5.background(0);
    fft.current.setInput(song.current);
    let vol = fft.current.getLevel();
    volhistory.current.push(vol);
    p5.stroke(255);
    p5.noFill();

    p5.translate(p5.width / 2, p5.height / 2);
    p5.beginShape();
    for (let i = 0; i < 360; i++) {
      let r = p5.map(volhistory.current[i], 0, 1, 10, 100);
      let x = r * p5.cos(i);
      let y = r * p5.sin(i);
      p5.vertex(x, y);
    }
    p5.endShape(p5.OPEN);

    if (volhistory.current.length > 360) {
      volhistory.current.splice(0, 1);
    }
  };

  const mouseClicked = (p5) => {
    toggleSong();
  };

  return (
    <Sketch
      preload={preload}
      setup={setup}
      draw={draw}
      mouseClicked={mouseClicked}
    />
  );
};

export default TestSketch;
