import "./NavBar.css";
import UserIcon from "../../images/userIcon.png"

export default function NavBar({showMenu}){
    return (
        <div className="nav-bar">
            <div className="menu-logo">
                <div className="menu-button" onClick={showMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p className="brand-name">audiovision</p>
            </div>
            <div className="login">
                <button className="login-button">
                    <p className="login-text">Login</p>
                    <img src={UserIcon} className="user-icon" alt="user icon"/>
                    {/* <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a> */}
                </button>
            </div>
        </div>
    );
}