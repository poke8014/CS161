import React from "react"
import "./HomePage.css"
import catChill from "../../images/music-g0ceccf190_1280.png"
import headMusic from "../../images/had-white.png"
import audioVid from "../../images/audio-wave-37169.mp4"
import NavBar from "../../components/NavBar/NavBar"

export default function HomePage(){
    return (
        <main className="home-page">
            <NavBar showMenuButton={false}/>
            <div className="first">
                <div>
                    <p>Unleash the power <span>of music with</span><span>audiovision</span></p>
                    <button>Let's Go!</button>
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
            <video src={audioVid} width="600" height="300" autoPlay={true} />
            <button>Let's Go!</button>
        </main>
    )
}