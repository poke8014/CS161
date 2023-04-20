import "./VisualizationPage.css"
import NavBar from "../../components/NavBar/NavBar"
import Menu from "../../components/Menu/Menu"
import React from "react"
import * as Sketches from "../../sketches"
// import TestSketch2 from "../../sketches/TestSketch2"

// import { useNavigate } from "react-router-dom";

export default function VisualizationPage(){

    const [showMenu, setShowMenu] = React.useState(false)

    function toggleShowMenu(){
        setShowMenu(prev => !prev)
    }

    return (
        <div className="visualization-page">
             <NavBar openMenu={toggleShowMenu} />
             <main className="content-container">
                {showMenu && <Menu/>}
                <div className="visualization-container">
                    <div className="canvas-wrapper">
                        <Sketches.TestSketch audioLink={audioLink} />
                    </div>
                </div>
             </main>
        </div>
    );
}