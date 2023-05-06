import React, { useRef, useEffect, useState } from 'react';
import { VisualContext } from "../context/VisualContext"

function SketchSimpleBars(props) {
  // properties passed through the visualization component
  const { 
    audioLink, 
    width, 
    height,
  } = props;

  const { selectedStyle, colorSelected, barHeight, fft} = React.useContext(VisualContext)

  const canvasRef = useRef(null);
  const playRef = useRef(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef(null);
  const audioCtxRef = useRef(null);
  const audioElementRef = useRef(null);

  async function clickButton(){
    await playRef.current.click();
  }

  useEffect(() => {
      console.log("change")
      if (audioPlaying)
        clickButton();
  }, [colorSelected, barHeight, fft, selectedStyle])


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
        }else if (selectedStyle === "circle"){
          // const drawCircleForm = () => {
          //   analyser.getByteFrequencyData(dataArray);
          
          //   canvasCtx.fillStyle = 'rgb(0, 0, 0)';
          //   canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
          
          //   const radius = Math.min(WIDTH, HEIGHT); // Adjust the size of the circle
          //   const centerX = WIDTH / 2;
          //   const centerY = HEIGHT / 2;
          
          //   const barWidth = (2 * Math.PI * radius) / dataArray.length;
          //   let angle = 0;
          
          //   for (let i = 0; i < dataArray.length; i++) {
          //     const barH = (dataArray[i] / 255) * (radius - 20);
          
          //     const x = centerX + (barH * Math.cos(angle));
          //     const y = centerY + (barH * Math.sin(angle));
          
          //     canvasCtx.fillStyle = colorSelected;
          //     canvasCtx.fillRect(x, y, barWidth, 3); // Adjust the height and thickness of the bars as desired
          
          //     angle += barWidth;
          //   }
          
          //   animationRef.current = requestAnimationFrame(drawCircleForm);
          // };
          
          // drawCircleForm();
          const drawFrequency = () => {
            analyser.getByteFrequencyData(dataArray);
          
            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
          
            const barCount = dataArray.length;
            const angleStep = (2 * Math.PI) / barCount;
            const radius = Math.min(WIDTH, HEIGHT) / 6;
            const barWidth = (2 * Math.PI * radius) / barCount;
          
            for (let i = 0; i < barCount; i++) {
              const amplitude = dataArray[i] / 255;
              const angle = i * angleStep;
              const centerX = WIDTH / 2;
              const centerY = HEIGHT / 2;
              const barHeight = amplitude * radius;
          
              const startX = centerX + radius * Math.cos(angle);
              const startY = centerY + radius * Math.sin(angle);
              const endX = startX + barHeight * Math.cos(angle);
              const endY = startY + barHeight * Math.sin(angle);
          
              canvasCtx.beginPath();
              canvasCtx.strokeStyle = colorSelected;
              canvasCtx.lineWidth = barWidth;
              canvasCtx.moveTo(startX, startY);
              canvasCtx.lineTo(endX, endY);
              canvasCtx.stroke();
            }
          
            animationRef.current = requestAnimationFrame(drawFrequency);
          };                
          drawFrequency();
        }
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
        // style={{ border: '1px solid green' }}
      />
      <button ref={playRef} className={`play-button ${audioPlaying ? "" : "play"}`}>Play/Pause</button>
    </main>
  );
}

export default SketchSimpleBars;
