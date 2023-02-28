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
                <form className="login-signup-box" method="get">
                    <p className="form-type">Login</p>
                    <div className="login-signup-buttons">
                        <button className="login-button-form">Login</button>
                        <button className="signup-button-form">Sign Up</button>
                    </div>
                    <input type={"text"} placeholder="Email Address" />
                    <input type={"text"} placeholder="Password" />
                    <p>Forgot Password?</p>
                    <input type={"submit"}  value="Login"/>
                    <p>Don't have an account? Sign Up now</p>
                </form>
            </div>
        </div>
    )
}