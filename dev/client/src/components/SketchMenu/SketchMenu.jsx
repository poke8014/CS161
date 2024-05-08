import React from "react"
import { VisualContext } from "../../context/VisualContext"
import Bars from "../../images/bars.png"
import Wave from "../../images/wave.png"
import Particles from "../../images/particles.png"
import Circle from "../../images/circle.png"
import "./SketchMenu.css"

export default function SketchMenu(){

    const { 
        selectedStyle, setSelectedStyle, colorSelected, fft, setFft,
        setColorSelected, barHeight, setBarHeight, playRef, setAudioPlaying
    } = React.useContext(VisualContext)

    async function handleSelectFileClick(e){
        await setSelectedStyle(e.target.id)
        await setAudioPlaying(false)
        await playRef.current.click()
    }

    async function handleSelectColorClick(e){
        await setColorSelected(e.target.id)
        await setAudioPlaying(false)
        await playRef.current.click()
    }

    async function handleHeightChange(e){
        await setBarHeight(e.target.value)
        await setAudioPlaying(false)
        await playRef.current.click()
    }

    async function handleFftChange(e){
        await setFft(e.target.value)
        await setAudioPlaying(false)
        await playRef.current.click()
    }

    return (
        <menu>
            <div className="visualization-selector">
                <img title="Bar Visualization" alt="bar visualization" id="simple" src={Bars} className={`simple-bar ${selectedStyle === "simple" ? "selected" : ""}`} 
                                onClick={handleSelectFileClick} />
                <img title="Wave Visualization" alt="wave visualization" id="wave" src={Wave} className={`wave-form ${selectedStyle === "wave" ? "selected" : ""}`} 
                                onClick={handleSelectFileClick} />
                <img title="Particles Visualization" alt="particles visualization" id="particles" src={Particles} className={`circle-form ${selectedStyle === "particles" ? "selected" : ""}`} 
                                onClick={handleSelectFileClick} />
                <img title="Circles Visualization" alt="circle visualization" id="circle" src={Circle} className={`circle-form ${selectedStyle === "circle" ? "selected" : ""}`} 
                                onClick={handleSelectFileClick} />
            </div>
            <div id="color" className="color-selection">
                <div id="red" className={colorSelected === "red" ? "color-selected" : ""} 
                    style={{backgroundColor: "red"}} onClick={handleSelectColorClick}></div>
                <div id="green" className={colorSelected === "green" ? "color-selected" : ""} 
                    style={{backgroundColor: "green"}} onClick={handleSelectColorClick}></div>
                <div id="blue" className={colorSelected === "blue" ? "color-selected" : ""} 
                    style={{backgroundColor: "blue"}} onClick={handleSelectColorClick}></div>
                <div id="yellow" className={colorSelected === "yellow" ? "color-selected" : ""} 
                    style={{backgroundColor: "yellow"}} onClick={handleSelectColorClick}></div>
                <div id="orange" className={colorSelected === "orange" ? "color-selected" : ""} 
                    style={{backgroundColor: "orange"}} onClick={handleSelectColorClick}></div>
                <div id="white" className={colorSelected === "white" ? "color-selected" : ""} 
                    style={{backgroundColor: "white"}} onClick={handleSelectColorClick}></div>
            </div>
            <div className="height-selection">
                <label htmlFor="height">Choose Bar Height: </label>
                <select name="height" id="height" value={barHeight} onChange={handleHeightChange}>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                </select>
            </div>
            <div className="fft">
                <label htmlFor="fft">FFT Size (Frequency):</label>
                <select name="fft" id="fft" value={fft} onChange={handleFftChange}>
                    <option value={32}>32</option>
                    <option value={64}>64</option>
                    <option value={128}>128</option>
                    <option value={256}>256</option>
                    <option value={512}>512</option>
                    <option value={1024}>1024</option>
                    <option value={2048}>2048</option>
                </select>
            </div>
        </menu>
    )
}