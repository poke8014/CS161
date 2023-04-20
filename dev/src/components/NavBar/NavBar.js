import "./NavBar.css";
import UserIcon from "../../images/userIcon.png"
import backArrow from "../../images/backArrow.png"
import { useNavigate } from "react-router-dom"
import useLogout from "../../hooks/useLogout"
import useAuth from "../../hooks/useAuth"
import React from "react"

export default function NavBar({openMenu, showMenuButton=true, showLoginButton=true, showBackArrow=false}){

    const navigate = useNavigate();
    const logout = useLogout()
    const { auth } = useAuth(); 
    // const [showEmail, setShowEmail] = React.useState(false)

    function getFirstLetterEmail(){
        let firstLetter = auth?.email[0]
        return firstLetter.toUpperCase()
    }

    async function handleSignOut(){
        await logout();
        navigate('/')
    }

    function handleLoginClick(){
        navigate("/login")
    }

    function handleBrandClick(){
        navigate("/")
    }

    return (
        <nav className="nav-bar">
            <div className="menu-logo">
                {showMenuButton && 
                <div className="menu-button" onClick={openMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
                {showBackArrow && 
                <img className="back-arrow" src={backArrow} onClick={handleBrandClick}/>}
                <p className="brand-name" onClick={handleBrandClick}>audiovision</p>
            </div>
            {showLoginButton ?
                JSON.stringify(auth) === '{}' ?
                <div className="login" onClick={handleLoginClick}>
                        <button className="login-button">
                            <p className="login-text">Login</p>
                            <img src={UserIcon} className="user-icon" alt="user icon"/>
                            {/* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a> */}
                        </button>
                </div>
                :
                <div className="logged-in">
                    <div className="user">
                        <p>{getFirstLetterEmail()}</p>
                    </div>
                    {/* {showEmail && <p>hi</p>} */}
                    <div className="logout" onClick={handleSignOut}>
                        <button className="logout-button">
                            <p className="logout-text">Logout</p>
                        </button>
                    </div>
                </div>
                :
                ''
            }
        </nav>
    );
}