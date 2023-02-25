import React from "react"
import NavBar from "../../components/NavBar/NavBar";
import Menu from "../../components/Menu/Menu";
import "./UploadPage.css"
import uploadIcon from "../../images/upload.png"

export default function UploadPage() {
    
    const [showMenu, setShowMenu] = React.useState(false)
    
    function toggleShowMenu(){
        console.log(showMenu)
        setShowMenu(prevState => !prevState)
    }

    return (
        <div className="upload-page">
            <NavBar 
                showMenu={toggleShowMenu} 
            />
            <div className="content">
                {showMenu && <Menu/>}
                <div className="upload-box">
                    <div className="upload-options">
                        <button className="upload-audio-button">
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