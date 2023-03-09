import NavBar from "../../components/NavBar/NavBar"
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"

export default function LoginPage(){

    const [formLogin, setFormType] = React.useState(true);
    const [userSignUpInfo, setUserSignUpInfo] = React.useState({
        "email": "",
        "password": "",
        "confirmPassword": ""
    })
    const navigate = useNavigate();

    function changeFormType(e){
        e.preventDefault();
        setFormType(prev => !prev)
    }

    function handleSubmit(e){
        e.preventDefault();
        if (checkEmail() && checkPasswords()){
            navigate("/")
            return true;
        }
    }

    function handleChange(e){
        setUserSignUpInfo( prevData => {
            return {
                ...prevData,
                [e.target.name] : [e.target.value]
            }
        })
    }

    function checkEmail(){
        let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(userSignUpInfo.email)
    }

    function checkPasswords(){
        return String(userSignUpInfo.password) === String(userSignUpInfo.confirmPassword);
    }

    console.log(userSignUpInfo);

    return (
        <div className="login-page">
            <NavBar 
                showMenuButton={false}
                showLoginButton={false}
                showBackArrow={true}
            />
            <div className="login-signup-container">
                <form className="login-signup-box" method="get">
                    <p className="form-type">{formLogin ? "Welcome Back!": "Join Us!"}</p>
                    <input type={"email"} placeholder="Email Address" name="email" 
                        onChange={handleChange} value={userSignUpInfo.email}/>
                    <input type={"password"} placeholder="Password" name="password" 
                        onChange={handleChange} value={userSignUpInfo.password}/>
                    {formLogin ? <p className="forgot-password">Forgot Password?</p>
                        : <input type={"password"} placeholder="Confirm Password" name="confirmPassword" 
                            onChange={handleChange} value={userSignUpInfo.confirmPassword}/>
                    }
                    <input className="form-submit" type={"submit"} 
                        value={formLogin ? "Login": "Create Account"} onClick={handleSubmit}/>
                    <p className="no-account">{formLogin ? "Don't have an account?" : "Already have an account?"}  
                        <button className="signup-now-button" onClick={changeFormType}>{formLogin ? "Sign Up Now" : "Log in"}</button>
                    </p>
                </form>
            </div>
        </div>
    )
}