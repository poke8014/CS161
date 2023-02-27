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
                    <h1>Login</h1>
                    <div className="login-signup-buttons">
                        <button className="login-button">Login</button>
                        <button className="signup-button">Sign Up</button>
                    </div>
                    <form>
                        <input type={"text"} placeholder="Email Address" />
                        <input type={"text"} placeholder="Password" />
                        <p>Forgot Password?</p>
                        <input type={"submit"}  value="Login"/>
                    </form>
                </div>
            </div>
        </div>
    )
}