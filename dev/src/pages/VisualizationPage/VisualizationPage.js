import React, { useContext } from "react"
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar"
import Menu from "../../components/Menu/Menu"
import SketchSimpleBars from "../../sketches/SketchSimpleBars"
import { FileContext } from "../../components/FileContext"
import "./VisualizationPage.css"

export default function VisualizationPage(){

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
              const response = await axios.get('http://localhost:8000/audioFiles/defaultAudio');
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
    }, [visualizationContainerSizeRef]);

    function toggleShowMenu(){
        setShowMenu(prev => !prev)
    }

    // const menuItems = [
    //     "Click on an existing audio",
    //     "Audio 1",
    //     "Audio 2",
    //     "Audio 3",
    //     "Audio 4",
    //     "Audio 5",
    //     "Audio 6"
    // ];

    return (
        <div className="visualization-page">
            <NavBar openMenu={toggleShowMenu} showMenuButton={false} />
            <main className="content-container">
                {/* {showMenu && <Menu menuItems={menuItems} />} */}
                <div className="visualization-container" ref={visualizationContainerSizeRef}>
                    {audioReady && <SketchSimpleBars audioLink={audioLink} width={canvasWidth - 10} height={canvasHeight - 10}/>}
                </div>
            </main>
        </div>
    );
}