import React, { useState } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import Menu from "../../components/Menu/Menu";
import uploadIcon from "../../images/upload.png";
import { useNavigate } from "react-router-dom";
import "./UploadPage.css";

export default function UploadPage() {
    
    const [showMenu, setShowMenu] = React.useState(false)
    // const [users, setUsers] = React.useState();
    const [file, setFile] = useState(null)
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

    async function handleAudioUpload(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("audiofile", file);
        try {
            const response = await axios.post("/audioFiles/uploadAudio", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("File uploaded:", response.data);
            // navigate("/visualization")
        } catch (err) {
            console.error("Error uploading file:", err);
        }
    }

    function handleFileChange(e) {
        setFile(e.target.files[0]);
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
                        <form onSubmit={handleAudioUpload}>
                            <label className="upload-audio-button">
                                <p>Upload Audio File</p>
                                <img className="upload-icon" src={uploadIcon} alt="upload icon"/>
                                <input type="file" onChange={handleFileChange} />
                            </label>
                            <button type="submit" disabled={!file}>Upload</button>
                        </form>
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