import React, { useContext } from "react"
import axios from "../../axios";
import NavBar from "../../components/NavBar/NavBar"
import SketchMenu from "../../components/SketchMenu/SketchMenu"
import SketchSimpleBars from "../../sketches/SketchSimpleBars"
import { FileContext } from "../../context/FileContext"
import { VisualContext } from "../../context/VisualContext"
import "./VisualizationPage.css"

export default function VisualizationPage(){

    const { playRef, audioPlaying } = React.useContext(VisualContext)

    const [showMenu, setShowMenu] = React.useState(false);
    const [defaultAudio, setDefaultAudio] = React.useState({});
    const { fileData } = useContext(FileContext);
    const [audioLink, setAudioLink] = React.useState(null);
    const [audioReady, setAudioReady] = React.useState(false);

    const [canvasWidth, setCanvasWidth] = React.useState(null)
    const [canvasHeight, setCanvasHeight] = React.useState(null)
    const visualizationContainerSizeRef = React.useRef(null)

    React.useEffect(() => {
        const fetchDefaultAudio = async () => {
            try {
              const response = await axios.get('/audioFiles/defaultAudio');
              setDefaultAudio(response.data);
            } catch (error) {
              console.error(error);
            }
        };
      
        fetchDefaultAudio();
    },[])

    React.useEffect(() => {
        if (fileData){
            setAudioLink(fileData.Location)
        }else{
            setAudioLink(defaultAudio.link)
        }
    },[defaultAudio, fileData])

    React.useEffect(() => {
        if (audioLink)
            setAudioReady(true)
    },[audioLink])
    
    React.useLayoutEffect(() => {
        function handleResize() {
            if (visualizationContainerSizeRef.current) {
                let { offsetWidth, offsetHeight } = visualizationContainerSizeRef.current;
                setCanvasWidth(offsetWidth)
                setCanvasHeight(offsetHeight)
            }
        }
        
        handleResize();
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [visualizationContainerSizeRef, showMenu]);

    function toggleShowMenu(){
        setShowMenu(prev => !prev)
    }

    return (
        <div className="visualization-page">
            <NavBar openMenu={toggleShowMenu}/>
            {showMenu && <SketchMenu />}
            <div className="content-container">
                <div className="visualization-container" ref={visualizationContainerSizeRef}>
                    {audioReady && <SketchSimpleBars 
                        audioLink={audioLink} 
                        width={canvasWidth - 10} 
                        height={canvasHeight}
                    />}
                </div>
                <button ref={playRef} className={`play-button ${audioPlaying ? "" : "play"}`}>{audioPlaying ? "Pause" : "Play"}</button>
                {audioPlaying && <p className="pauseAudioInfo">Pausing the audio will save current time</p>}
            </div>
        </div>
    );
}