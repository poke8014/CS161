import React, { useRef, useEffect, useState } from 'react';

function TestSketchM(props) {
  const { audioLink } = props;
  const canvasRef = useRef(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const animationRef = useRef(null);
  const audioCtxRef = useRef(null);
  const audioElementRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    let analyser = null;
    let dataArray = null;

    const handleClick = () => {
      if (!audioPlaying) {
        // create audio context
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();

        // create analyser node
        analyser = audioCtxRef.current.createAnalyser();
        analyser.fftSize = 256;

        // connect analyser to audio source
        audioElementRef.current = new Audio(audioLink);
        audioElementRef.current.crossOrigin = 'anonymous';
        const sourceNode = audioCtxRef.current.createMediaElementSource(audioElementRef.current);
        sourceNode.connect(analyser);
        analyser.connect(audioCtxRef.current.destination);

        // resume AudioContext if necessary
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        // start audio playback
        audioElementRef.current.play();
        setAudioPlaying(true);

        // create data array for visualizations
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        // draw visualizations
        const draw = () => {
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

          animationRef.current = requestAnimationFrame(draw);
        };

        draw();
      } else {
         // pause audio playback
        if (audioElementRef.current)
          audioElementRef.current.pause();
        setAudioPlaying(false);
        cancelAnimationFrame(animationRef.current);
        if (analyser !== null)
          analyser.disconnect();

        // clear canvas
        if (canvasCtx !== null)
          canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        // release audio resources
        if (audioElementRef.current)
          audioElementRef.current.src = '';
        audioElementRef.current = null;
        if (audioCtxRef.current)
          audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
      if (audioPlaying) {
        if (audioElementRef.current)
          audioElementRef.current.pause();
        setAudioPlaying(false);
        cancelAnimationFrame(animationRef.current);
        if (canvasCtx !== null)
          canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
        if (analyser !== null)
          analyser.disconnect();
        if (audioElementRef.current)
          audioElementRef.current.src = '';
        audioElementRef.current = null;
        if (audioCtxRef.current)
          audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, [audioLink, audioPlaying]);

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
