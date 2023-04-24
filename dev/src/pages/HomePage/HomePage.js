import React from "react"
import "./HomePage.css"
import catChill from "../../images/music-g0ceccf190_1280.png"
import headMusic from "../../images/had-white.png"
//import audioVid from "../../images/audio-wave-37169.mp4"
import audioVid from "../../images/sound.png"
import NavBar from "../../components/NavBar/NavBar"

export default function HomePage(){

    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          }, {
            threshold: 1.0
          });
      
          const element = document.querySelector('.description');
          observer.observe(element);
      
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
                    <p>Unleash the power <span>of music with</span><span className="audiovision-span">audiovision</span></p>
                    <button className="start">Let's Go!</button>
                </div>
                <img src={catChill} />
            </div>
            <p className="description">
                audiovision is an interactive web app that brings 
                your audio to life with stunning visuals. Upload your own audio files or 
                browse our collection, and experience a whole new way of visualizing sound.
            </p>
            <div className="second">
                <img src={headMusic} />
                <p>Let audiovision reveal the hidden emotions in your favorite music</p>
            </div>
            <p className="data-analysis-des">
                audiovision uses audio data analysis to create stunning 
                visualizations that bring your audio to life. 
            </p>
            <img src={audioVid} />
            {/* <video className="visual-vid" src={audioVid} autoPlay={true} /> */}
            <button className="last">Let's Go!</button>
            <br />
        </main>
    )
}