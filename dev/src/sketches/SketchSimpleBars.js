import React, { useRef, useEffect, useState } from 'react';

function SketchSimpleBars(props) {
  // properties passed through the visualization component
  const { 
    audioLink, 
    width, 
    height,
    barColor,
    barH = 5.5,
    fftSize = 256
  } = props;

  const canvasRef = useRef(null);
  const playRef = useRef(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef(null);
  const audioCtxRef = useRef(null);
  const audioElementRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const playButton = playRef.current;
    const canvasCtx = canvas.getContext('2d');
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    let analyser = null;
    let dataArray = null;

    const handleClick = () => {
      if (!audioPlaying) {
        // create audio context
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();

        // create analyser
        analyser = audioCtxRef.current.createAnalyser();
        analyser.fftSize = fftSize;

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
        audioElementRef.current.currentTime = currentTime;
        audioElementRef.current.play();
        setAudioPlaying(true);

        // create data array for visualizations
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        //// draw visualizations ////
        const drawFrequency = () => {
          analyser.getByteFrequencyData(dataArray);

          canvasCtx.fillStyle = 'rgb(0, 0, 0)';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

          const barWidth = (WIDTH / dataArray.length);
          let x = 0;

          for (let i = 0; i < dataArray.length; i++) {
            const barHeight = dataArray[i] * barH;

            canvasCtx.fillStyle = barColor;
            canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
          }

          animationRef.current = requestAnimationFrame(drawFrequency);
        };

        const drawWaveform = () => {
          analyser.getByteTimeDomainData(dataArray);
        
          canvasCtx.fillStyle = 'rgb(0, 0, 0)';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        
          canvasCtx.lineWidth = 2;
          canvasCtx.strokeStyle = barColor;
        
          canvasCtx.beginPath();
          const sliceWidth = WIDTH * 1.0 / dataArray.length;
          let x = 0;
          for (let i = 0; i < dataArray.length; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * HEIGHT / 2;
        
            if (i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }
        
            x += sliceWidth;
          }
        
          canvasCtx.stroke();
          animationRef.current = requestAnimationFrame(drawWaveform);
        };

        const draw = () => {
          let radius = Math.min(WIDTH, HEIGHT) / 2 * 0.8;
          let centerX = WIDTH / 2;
          let centerY = HEIGHT / 2;
          let barWidth = 2 * Math.PI / dataArray.length;
        
          analyser.getByteFrequencyData(dataArray);
        
          canvasCtx.fillStyle = 'rgb(0, 0, 0)';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        
          canvasCtx.beginPath();
        
          for (let i = 0; i < dataArray.length; i++) {
            const amplitude = dataArray[i];
            const angle = (Math.PI / 2) - (i * barWidth);
            const x = centerX + Math.cos(angle) * (radius + amplitude * 0.5);
            const y = centerY - Math.sin(angle) * (radius + amplitude * 0.5);
            const barHeight = amplitude * 0.5;
        
            canvasCtx.moveTo(x, y);
            canvasCtx.lineTo(x, y - barHeight);
          }
        
          canvasCtx.strokeStyle = barColor;
          canvasCtx.stroke();
        
          animationRef.current = requestAnimationFrame(draw);
        };                 
        
        drawFrequency();
        //////////////////////////////////////////////////////////////
      } else {
        // pause audio playback
        if (audioElementRef.current){
          setCurrentTime(audioElementRef.current.currentTime)
          audioElementRef.current.pause();
        }
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

    playButton.addEventListener('click', handleClick);

    return () => {
      playButton.removeEventListener('click', handleClick);
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
    <main>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        // style={{ border: '1px solid black' }}
      />
      <button ref={playRef} className='play-button'>Play/Pause</button>
    </main>
  );
}

export default SketchSimpleBars;
