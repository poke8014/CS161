import React, { useRef, useEffect } from 'react';

function TestSketchM(props) {
  const { audioLink } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');

    // draw visualizations
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    function draw(analyser, dataArray) {
      requestAnimationFrame(() => draw(analyser, dataArray));

      analyser.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      const barWidth = (WIDTH / dataArray.length) * 2.5;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i];

        canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
      }
    }

    const handleClick = async () => {
      try {
        // create audio context
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
      
        // create analyser node
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
      
        // connect analyser to audio source
        const audioElement = new Audio(audioLink);
        audioElement.crossOrigin = 'anonymous';
        const sourceNode = audioCtx.createMediaElementSource(audioElement);
        sourceNode.connect(analyser);
        analyser.connect(audioCtx.destination);
      
        // resume AudioContext if necessary
        if (audioCtx.state === 'suspended') {
          await audioCtx.resume();
        }
      
        // start audio playback
        await audioElement.play();
      
        // create data array for visualizations
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
      
        draw(analyser, dataArray);
      } catch (err) {
        console.error(err);
      }
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      // cleanup function
      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
      canvas.removeEventListener('click', handleClick);
    };
  }, [audioLink]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      style={{ border: '1px solid black' }}
    />
  );
}

export default TestSketchM;