import React from "react"
import { useNavigate } from "react-router-dom";
import catChill from "../../images/music-g0ceccf190_1280.png"
import headMusic from "../../images/had-white.png"
import audioVid from "../../images/sound.png"
import NavBar from "../../components/NavBar/NavBar"
import "./HomePage.css"

export default function HomePage(){

  const navigate = useNavigate()

  const descriptionText = React.useRef(null)
  const musicImage = React.useRef(null)
  const dataAnalysisDesRef = React.useRef(null)

  const audioVisualizerRef = React.useRef(null)

  const handleMouseEnter = () => {
    audioVisualizerRef.current.style.visibility = "visible";
  };

  const handleMouseLeave = () => {
    audioVisualizerRef.current.style.visibility = "hidden";
  };

  function handleClick(){
    navigate("/upload")
  }

  React.useEffect(() => {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.animationPlayState = "running";
          }
        });
      }, {
        threshold: 0.5
      });

      observer.observe(descriptionText.current)
      observer.observe(musicImage.current)
      observer.observe(dataAnalysisDesRef.current)
  
      // cleanup function
      return () => {
        observer.disconnect();
      }
  },[])

  return (
      <main className="home-page">
          <NavBar showMenuButton={false}/>
          <div className="first">
              <div className="left">
                  <p>Unleash the power 
                    <span>of music with</span>
                    <span className="audiovision-span" onMouseEnter={handleMouseEnter} 
                          onMouseLeave={handleMouseLeave}>audiovision</span>
                  </p>
                  <button className="start" onClick={handleClick}>Let's Go!</button>
              </div>
              <img loading="lazy" alt="cat sitting on a couch chilling with headphones on" src={catChill} />
          </div>
          <p className="description" ref={descriptionText}>
              <span className="audio-visual" onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}>audiovision</span> is an interactive web app that brings 
              your audio to life with stunning visuals. Upload your own audio files or 
              browse our collection, and experience a whole new way of visualizing sound.
          </p>
          <div className="second">
              <img loading="lazy" alt="music head" src={headMusic} ref={musicImage}/>
              <p>Let <span className="audio-visual" onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}>audiovision</span> reveal the hidden emotions in your favorite music</p>
          </div>
          <p className="data-analysis-des" ref={dataAnalysisDesRef} >
            <span className="audio-visual" onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}>audiovision</span> uses audio data analysis to create stunning 
              visualizations that bring your audio to life. 
          </p>
          <img loading="lazy" alt="audio visualization" src={audioVid} className="visual-vid" />
          {/* <video className="visual-vid" src={audioVid} autoPlay={true} /> */}
          <button className="last" onClick={handleClick}>Let's Go!</button>
          <br />
          {/* Animation when hovering over the audiovision */}
          <div className="audio-visualizer" ref={audioVisualizerRef}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
      </main>
  )
}