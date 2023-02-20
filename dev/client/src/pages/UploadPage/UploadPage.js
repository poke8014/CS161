import React from "react"
import NavBar from "../../components/NavBar/NavBar";
import Menu from "../../components/Menu/Menu";
import "./UploadPage.css"

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
            {showMenu && <Menu/>}
        </div>
    );
}