import NavBar from "../../components/NavBar/NavBar"
import React from "react";
import "./LoginPage.css"

export default function LoginPage(){

    const [formType, setFormType] = React.useState("login");

    function changeFormType(e){
        e.preventDefault()
    }

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
                        <button className="login-button-form" onClick={changeFormType}>Login</button>
                        <button className="signup-button-form" onClick={changeFormType}>Sign Up</button>
                    </div>
                    <input type={"email"} placeholder="Email Address" />
                    <input type={"password"} placeholder="Password" />
                    <p className="forgot-password">Forgot Password?</p>
                    <input className="login-button-submit" type={"submit"} value="Login"/>
                    <p className="no-account">Don't have an account? 
                        <button className="signup-now-button" onClick={changeFormType}>Sign Up now</button>
                    </p>
                </form>
            </div>
        </div>
    )
}