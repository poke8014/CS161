import React, { useRef, useEffect, useState } from 'react';
import { VisualContext } from "../context/VisualContext"

function SketchSimpleBars(props) {
  // properties passed through the visualization component
  const { 
    audioLink, 
    width, 
    height,
  } = props;

  const { selectedStyle, colorSelected, barHeight, fft, playRef, audioPlaying, setAudioPlaying } = React.useContext(VisualContext)

  const canvasRef = useRef(null);
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
        audioCtxRef.current = new window.AudioContext();

        // create analyser
        analyser = audioCtxRef.current.createAnalyser();
        analyser.fftSize = fft;

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

        // add event listener to restart the song when it ends
        audioElementRef.current.addEventListener('ended', () => {
          audioElementRef.current.currentTime = 0;
          audioElementRef.current.pause();
        });

        //// draw visualizations ////
        if (selectedStyle === "simple"){
          const drawFrequency = () => {
            analyser.getByteFrequencyData(dataArray);

            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

            const barWidth = (WIDTH / dataArray.length);
            let x = 0;

            for (let i = 0; i < dataArray.length; i++) {
              const barH = dataArray[i] * barHeight;

              canvasCtx.fillStyle = colorSelected;
              canvasCtx.fillRect(x, HEIGHT - barH / 2, barWidth, barH / 2);

              x += barWidth + 1;
            }

            animationRef.current = requestAnimationFrame(drawFrequency);
          };
          drawFrequency()
        }else if (selectedStyle === "wave"){
          const drawWaveform = () => {
            analyser.getByteTimeDomainData(dataArray);
          
            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
          
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = colorSelected;
          
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
          drawWaveform()
        }else if (selectedStyle === "particles"){
          const drawParticlesForm = () => {
            analyser.getByteFrequencyData(dataArray);
          
            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
          
            const radius = Math.min(WIDTH, HEIGHT); // Adjust the size of the circle
            const centerX = WIDTH / 2;
            const centerY = HEIGHT / 2;
          
            const barWidth = (2 * Math.PI * radius) / dataArray.length;
            let angle = 0;
          
            for (let i = 0; i < dataArray.length; i++) {
              const barH = (dataArray[i] / 255) * (radius - 60);
          
              const x = centerX + (barH * Math.cos(angle));
              const y = centerY + (barH * Math.sin(angle));
          
              canvasCtx.fillStyle = colorSelected;
              canvasCtx.fillRect(x, y, barWidth, 3); // Adjust the height and thickness of the bars as desired
          
              angle += barWidth;
            }
          
            animationRef.current = requestAnimationFrame(drawParticlesForm);
          };
          
          drawParticlesForm();      
        }
        else if (selectedStyle === "circle"){
          const drawCircleForm = () => {
            analyser.getByteTimeDomainData(dataArray);
            
            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
            
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = colorSelected;
            
            const baseRadius = Math.min(WIDTH, HEIGHT) / 6; // Adjust the factor to control the size of the circle
            const maxRadius = baseRadius + 20; // Adjust the maximum radius for the pulsing effect
            const minRadius = baseRadius - 20; // Adjust the minimum radius for the pulsing effect
            const pulseSpeed = 0.0001; // Adjust the speed of the pulsing effect
            
            const radius = baseRadius + Math.sin(Date.now() * pulseSpeed) * (maxRadius - minRadius);
            const centerX = WIDTH / 2;
            const centerY = HEIGHT / 2;
            
            canvasCtx.beginPath();
            
            for (let i = 0; i < dataArray.length; i++) {
              const angle = (i / dataArray.length) * (2 * Math.PI);
              const x = centerX + (radius * Math.cos(angle));
              const y = centerY + (radius * Math.sin(angle));
              
              const barHeight = (dataArray[i] / 128.0) * (radius - 20);
              
              canvasCtx.moveTo(x, y);
              canvasCtx.lineTo(x + (barHeight * Math.cos(angle)), y + (barHeight * Math.sin(angle)));
            }
            
            canvasCtx.closePath();
            canvasCtx.stroke();
            
            animationRef.current = requestAnimationFrame(drawCircleForm);
          };
          
          drawCircleForm();  
        }
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
  }, [audioLink, audioPlaying, colorSelected, barHeight, fft, selectedStyle, width, height, currentTime, playRef, setAudioPlaying]);

  return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      />
  );
}

export default SketchSimpleBars;
