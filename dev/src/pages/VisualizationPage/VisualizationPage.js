import React, { useContext, useRef } from "react"
import NavBar from "../../components/NavBar/NavBar"
import Menu from "../../components/Menu/Menu"
import * as Sketches from "../../sketches"
import { FileContext } from "../../components/FileContext"
import "./VisualizationPage.css"

export default function VisualizationPage(){

    const [showMenu, setShowMenu] = React.useState(false);
    const { fileData } = useContext(FileContext);
    const audioLink = fileData.Location;

    function toggleShowMenu(){
        setShowMenu(prev => !prev)
    }

    const menuItems = [
        "Click on an existing audio",
        "Audio 1",
        "Audio 2",
        "Audio 3",
        "Audio 4",
        "Audio 5",
        "Audio 6"
    ];

    return (
        <div className="visualization-page">
            <NavBar openMenu={toggleShowMenu} />
            <main className="content-container">
                {showMenu && <Menu menuItems={menuItems} />}
                <div className="visualization-container">
                    <div className="canvas-wrapper">
                        <Sketches.TestSketch3 audioLink={audioLink} />
                    </div>
                </div>
            </main>
        </div>
    );
}