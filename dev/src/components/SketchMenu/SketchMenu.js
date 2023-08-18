import React from "react"
import { VisualContext } from "../../context/VisualContext"
import Bars from "../../images/bars.png"
import Wave from "../../images/wave.png"
import Particles from "../../images/particles.png"
import Circle from "../../images/circle.png"
import "./SketchMenu.css"

export default function SketchMenu(){

    const { 
        selectedStyle, setSelectedStyle, colorSelected, 
        setColorSelected, barHeight, setBarHeight, fft, setFft
    } = React.useContext(VisualContext)

    function handleSelectFileClick(e){
        setSelectedStyle(e.target.id)
    }

    function handleSelectColorClick(e){
        setColorSelected(e.target.id)
    }

    function handleHeightChange(e){
        setBarHeight(e.target.value)
    }

    function handleFftChange(e){
        setFft(e.target.value)
    }

    return (
        <menu>
            <div className="visualization-selector">
                <img id="simple" src={Bars} className={`simple-bar ${selectedStyle === "simple" ? "selected" : ""}`} 
                                onClick={handleSelectFileClick} />
                <img id="wave" src={Wave} className={`wave-form ${selectedStyle === "wave" ? "selected" : ""}`} 
                                onClick={handleSelectFileClick} />
                <img id="particles" src={Particles} className={`circle-form ${selectedStyle === "particles" ? "selected" : ""}`} 
                                onClick={handleSelectFileClick} />
                <img id="circle" src={Circle} className={`circle-form ${selectedStyle === "circle" ? "selected" : ""}`} 
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