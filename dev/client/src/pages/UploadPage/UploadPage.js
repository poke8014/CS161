import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Menu from "../../components/Menu/Menu";
import uploadIcon from "../../images/upload.png";
import { FileContext } from "../../context/FileContext";
import { FileUploader } from "react-drag-drop-files";
import useAuth from "../../hooks/useAuth";
import "./UploadPage.css";

export default function UploadPage() {
    
    const [showMenu, setShowMenu] = React.useState(false);
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { setFileData, selectedFile, setSelectedFile } = useContext(FileContext);
    const { userID } = useAuth();
    
    const [guestAudios, setGuestAudios] = React.useState([])
    const [userAudios, setUserAudios] = React.useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [menuItems, setMenuItems] = React.useState([]);

    const [existingAudioSelected, setExistingAudioSelected] = React.useState(false)

    const audioFormats = [
        'MP3',
        'WAV',
        'FLAC',
        'AAC',
        'OGG',
        'WMA',
        'M4A',
        'AIFF',
        'APE',
        'ALAC'
    ];   
    
    function toggleShowMenu(){
        setShowMenu(prevState => !prevState);
    }

    async function handleAudioUpload(e){
        e.preventDefault();
        setIsLoading(true)

        if (existingAudioSelected){
            let existingAudioId = selectedFile[1]
            // const allAudios = [...guestAudios, ...userAudios];
            for (let audio of guestAudios.concat(userAudios)){
                if (audio._id === existingAudioId){
                    setFileData({
                        Location: audio.link,
                    });
                    break;
                }
            }
            navigate("/visualization")
        }else{
            const formData = new FormData();
            formData.append("audiofile", file);
            if (userID) {
                formData.append("userID", userID);
            }
            try {
                const apiURL = "http://localhost:8000/audioFiles/uploadAudio";
                const response = await axios.post(apiURL, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                // console.log("File uploaded:", response.data);
                setFileData({
                    ...response.data,
                    url: response.data.Location          // set audio link in context
                });
                setSelectedFile([file.name, response.data.key]);
                localStorage.setItem('audioID', response.data.Location);
                navigate("/visualization")
            } catch (err) {
                console.error("Error uploading file:", err);
            }finally{
                setIsLoading(false)
            }
        }
    }

    function handleFileChange(file) {
        setFile(file);
    }

    React.useEffect(() => {
        // console.log(selectedFile)
        // console.log(guestAudios)
        // console.log(file)
        let audioExists = false
        if (selectedFile) {
            for (let audio of guestAudios.concat(userAudios)) {
                if (audio._id === selectedFile[1]) {
                    audioExists = true;
                    break;
                }
            }
        }
        if(audioExists){
            setExistingAudioSelected(true)
        }else{
            setExistingAudioSelected(false) 
        }
        // console.log("Existing audio selected: ", existingAudioSelected);
    }, [selectedFile, guestAudios, userAudios])

    React.useEffect(() => {
        setMenuItems(prev => {
            return [
                ...prev,
                [
                    file?.name
                ]
            ]
        })
    },[file])

    React.useEffect(() => {
        const options = {method: 'GET', url: 'http://localhost:8000/audioFiles/existingAudioFiles'};
        axios.request(options).then(function (response) {
        setGuestAudios(response.data)
        }).catch(function (error) {
            console.error(error);
        });
        return () => {
            setMenuItems([])
        }
    },[])

    React.useEffect(() => {
        if (userID) {
            const options = {method: 'GET', url: `http://localhost:8000/audioFiles/userAudioFiles/${userID}`};
            axios.request(options).then(function (response) {
                setUserAudios(response.data);
                // console.log("Fetched user audios: ", response.data);
            }).catch(function (error) {
                console.error(error);
            });
        } else {
            setUserAudios([]);
        }
    }, [userID]);

    React.useEffect(() => {
        let guestTitles = guestAudios.map(audio => {
            return [
                audio.title.replace(/[^a-zA-Z ]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
                audio._id
            ]
        });
        let userTitles = userAudios.map(audio => {
            return [
                audio.title.replace(/[^a-zA-Z ]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
                audio._id
            ]
        });

        if (file) {
            userTitles = [...userTitles, [file.name, file.name]];
        }
        
        setMenuItems([...guestTitles, ...userTitles]);
    },[guestAudios, userAudios, file]);

    return (
        <div className="upload-page">
            <NavBar openMenu={toggleShowMenu} />
            {isLoading && <div className="loading-overlay">Getting your audio ready for visualizing...</div>}
            <div className="content">
                {showMenu && 
                    <Menu menuItems={menuItems}
                    selected={selectedFile}
                    setSelected={setSelectedFile}
                    uploadedFile={file}
                />}
                { !userID ? <div className="saveAudios">Login or Create an Account to <b>SAVE your Audios</b></div> : '' }
                <div className="upload-container">
                    <FileUploader classes="upload-box" handleChange={handleFileChange} types={audioFormats} onTypeError={(err) => setErrorMessage(err)}>
                        <div className="upload-options">   
                                <label className="upload-audio-button">
                                    <div className="upload-content">
                                        <p>Upload Audio File</p>
                                        <img className="upload-icon" src={uploadIcon} alt="upload icon" />
                                    </div>
                                    <input type="file" onChange={handleFileChange} />
                                </label>
                                <div className="drag-drop-area">
                                    <p>Or</p>
                                    <p>Drag and Drop Here!</p>
                                </div>
                        </div>
                    </FileUploader>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button className="submit-button" type="submit" disabled={!file && !existingAudioSelected} onClick={handleAudioUpload}>Visualize</button>
                </div>
            </div>
        </div>
    );
}