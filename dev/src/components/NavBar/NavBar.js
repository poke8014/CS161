import "./NavBar.css";
import UserIcon from "../../images/userIcon.png"
import backArrow from "../../images/backArrow.png"
import { useNavigate } from "react-router-dom";

export default function NavBar({openMenu, showMenuButton=true, showLoginButton=true, showBackArrow=false}){

    const navigate = useNavigate();

    function handleLoginClick(){
        navigate("/login")
    }

    function handleBrandClick(){
        navigate("/visualization")
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
            {showLoginButton && 
            <div className="login" onClick={handleLoginClick}>
                <button className="login-button">
                    <p className="login-text">Login</p>
                    <img src={UserIcon} className="user-icon" alt="user icon"/>
                    {/* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a> */}
                </button>
            </div>}
        </nav>
    );
}