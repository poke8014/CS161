import React from "react"
import NavBar from "../../components/NavBar/NavBar";
import Menu from "../../components/Menu/Menu";
import uploadIcon from "../../images/upload.png"
import { useNavigate } from "react-router-dom";
import "./UploadPage.css"

export default function UploadPage() {
    
    const [showMenu, setShowMenu] = React.useState(false)
    const navigate = useNavigate();
    
    function toggleShowMenu(){
        setShowMenu(prevState => !prevState)
    }

    function handleAudioUpload(){
        navigate("/visualization")
    }

    return (
        <div className="upload-page">
            <NavBar 
                openMenu={toggleShowMenu}
            />
            <div className="content">
                {showMenu && <Menu/>}
                <div className="upload-box">
                    <div className="upload-options">
                        <button className="upload-audio-button" onClick={handleAudioUpload}>
                            <p>Upload Audio File</p>
                            <img className="upload-icon" src={uploadIcon} alt="upload icon"/>
                        </button>
                        {/* <a target="_blank" href="https://icons8.com/icon/RXegk50IKV5u/upload">Upload</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> */}
                        <div className="drag-drop-area">
                            <p>Or</p>
                            <p>Drag and Drop Here!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}