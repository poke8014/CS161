import React from "react";
import Sketch from "react-p5";

const MySketch = (props) => {
    const { audioFile } = props;

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(400, 400).parent(canvasParentRef);
        // load audio file
        p5.soundFormats('mp3');
        const sound = p5.loadSound(audioFile, () => {
            sound.loop();
        });
    };

    const draw = (p5) => {
        p5.background(220);
        p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
    };

    return <Sketch setup={setup} draw={draw} />;
};

export default MySketch
