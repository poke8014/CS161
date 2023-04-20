import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Menu from "../../components/Menu/Menu";
import uploadIcon from "../../images/upload.png";
import { FileContext } from "../../components/FileContext";
import "./UploadPage.css";

export default function UploadPage() {
    
    const [showMenu, setShowMenu] = React.useState(false);
    // const [users, setUsers] = React.useState();
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { setFileData } = useContext(FileContext);

    // React.useEffect(() => {
    //     fetch("/users")
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(err => console.log("error: " + err))
    // }, []);
    
    function toggleShowMenu(){
        setShowMenu(prevState => !prevState);
    }

    async function handleAudioUpload(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append("audiofile", file);
        try {
            const response = await axios.post("http://localhost:8000/audioFiles/uploadAudio", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("File uploaded:", response.data);
            setFileData({
                ...response.data,
                url: response.data.Location          // set audio link in context
            });
            console.log(file);
            navigate("/visualization")
        } catch (err) {
            console.error("Error uploading file:", err);
        }
    }

    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        const validExt = ['audio/mpeg'];

        if (selectedFile && validExt.includes(String(selectedFile.type))) {
            setFile(selectedFile);
            setErrorMessage("")
        } else {
            setFile(null);
            setErrorMessage("Invalid file type. Please upload an audio file.");
        }
    }

    return (
        <div className="upload-page">
            <NavBar openMenu={toggleShowMenu} />
            <div className="content">
                {showMenu && <Menu menuItems={[
                    "Click on an existing audio",
                    file ? file.name : "",
                    "Audio 1",
                    "Audio 2",
                    "Audio 3",
                    "Audio 4",
                    "Audio 5",
                    "Audio 6"
                    ]}
                />}
                <div className="upload-container">
                    <div className="upload-box">
                        <div className="upload-options">
                            <form>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <label className="upload-audio-button">
                                    <div className="upload-content">
                                        <p>Upload Audio File</p>
                                        <img className="upload-icon" src={uploadIcon} alt="upload icon" />
                                    </div>
                                    <input type="file" onChange={handleFileChange} />
                                </label>
                            </form>
                            <div className="drag-drop-area">
                                <p>Or</p>
                                <p>Drag and Drop Here!</p>
                            </div>
                        </div>
                    </div>
                    <button className="submit-button" type="submit" disabled={!file} onClick={handleAudioUpload}>Upload</button>
                </div>
            </div>
        </div>
    );
}