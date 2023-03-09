import React from "react"
import NavBar from "../../components/NavBar/NavBar";
import Menu from "../../components/Menu/Menu";
import uploadIcon from "../../images/upload.png"
import { useNavigate } from "react-router-dom";
import "./UploadPage.css"

export default function UploadPage() {
    
    const [showMenu, setShowMenu] = React.useState(false)
    // const [users, setUsers] = React.useState();
    const navigate = useNavigate();

    // React.useEffect(() => {
    //     fetch("/users")
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(err => console.log("error: " + err))
    // }, []);
    
    function toggleShowMenu(){
        setShowMenu(prevState => !prevState)
    }

    function handleAudioUpload(){
        navigate("/visualization")
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
        <div className="upload-page">
            <NavBar 
                openMenu={toggleShowMenu}
            />
            <div className="content">
                {showMenu && 
                <Menu
                    menuItems={menuItems}        
                />}
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