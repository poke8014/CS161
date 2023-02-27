import NavBar from "../../components/NavBar/NavBar"
import "./LoginPage.css"

export default function LoginPage(){
    return (
        <div className="login-page">
            <NavBar 
                showMenuButton={false}
                showLoginButton={false}
            />
            <div className="login-signup-container">
                <div className="login-signup-box">
                    
                </div>
            </div>
        </div>
    )
}