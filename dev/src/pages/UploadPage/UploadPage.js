import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Menu from "../../components/Menu/Menu";
import uploadIcon from "../../images/upload.png";
import { FileContext } from "../../context/FileContext";
import useAuth from "../../hooks/useAuth";
import "./UploadPage.css";

export default function UploadPage() {
    
    const [showMenu, setShowMenu] = React.useState(true);
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { setFileData, selectedFile, setSelectedFile } = useContext(FileContext);
    const { userID } = useAuth();
    
    const [guestAudios, setGuestAudios] = React.useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [menuItems, setMenuItems] = React.useState([]);

    const [existingAudioSelected, setExistingAudioSelected] = React.useState(false)
    
    function toggleShowMenu(){
        setShowMenu(prevState => !prevState);
    }

    async function handleAudioUpload(e){
        e.preventDefault();
        setIsLoading(true)

        if (existingAudioSelected){
            let existingAudioId = selectedFile[1]
            for (let audio in guestAudios){
                if (guestAudios[audio]._id == existingAudioId){
                    setFileData({
                        Location: guestAudios[audio].link
                    })
                    break 
                }
            }
            navigate("/visualization")
        }else{
            const formData = new FormData();
            formData.append("audiofile", file);
            if (userID) {
                formData.append("userID", userID);
            }
            // formData.append("userID", userID ?  userID : null);
            try {
                const apiURL = "http://localhost:8000/audioFiles/uploadAudio";
                const response = await axios.post(apiURL, formData, {
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
            }finally{
                setIsLoading(false)
            }
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

    React.useEffect(() => {
        console.log(selectedFile)
        console.log(guestAudios)
        console.log(file)
        let audioExists = false
        if (selectedFile){
            for (let audio in guestAudios){
                if (guestAudios[audio]._id == selectedFile[1]){
                    audioExists = true
                    break
                }
            }
        }
        if(audioExists){
            setExistingAudioSelected(true)
        }else{
            setExistingAudioSelected(false) 
        }
    }, [selectedFile])

    React.useEffect(() => {
        setMenuItems(prev => {
            return [
                ...prev,
                [
                    file?.name
                ]
            ]
        })
        console.log(file)
    },[file])

    React.useEffect(() => {
        const options = {method: 'GET', url: 'http://localhost:8000/audioFiles/existingAudioFiles'};
        axios.request(options).then(function (response) {
        setGuestAudios(response.data)
        }).catch(function (error) {
            console.error(error);
        });
        return () => setMenuItems([])
    },[])

    React.useEffect(() => {
        let titles = guestAudios.map(audio => {
            return [
                audio.title.replace(/[^a-zA-Z ]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
                audio._id
            ]
        })
        setMenuItems(titles)
    },[guestAudios])

    return (
        <div className="upload-page">
            <NavBar openMenu={toggleShowMenu} />
            {isLoading && <div className="loading-overlay">Getting your audio ready for visualizing...</div>}
            <div className="content">
                {showMenu && 
                    <Menu menuItems={menuItems}
                    selected={selectedFile}
                    setSelected={setSelectedFile}
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
                    <button className="submit-button" type="submit" disabled={!file && !existingAudioSelected} onClick={handleAudioUpload}>Visualize</button>
                </div>
            </div>
        </div>
    );
}