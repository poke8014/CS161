import NavBar from "../../components/NavBar/NavBar"
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"

export default function LoginPage(){

    const [formLogin, setFormType] = React.useState(true);
    const [invalidEmail, setInvalidEmail] = React.useState(false);
    const [passwordsNoMatch, setPasswordsNoMatch] = React.useState(false);
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
        let emailValid = checkEmail()
        let passMatch = checkPasswords()
        if (emailValid && passMatch){
            postNewAccount()
            navigate("/")
            return true
        }
        !emailValid ? setInvalidEmail(true) : setInvalidEmail(false)
        !passMatch ? setPasswordsNoMatch(true) : setPasswordsNoMatch(false)
    }

    function postNewAccount(){
        const newUser = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userSignUpInfo)
        };
          
        fetch('/users/signup', newUser)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }

    function handleChange(e){
        setUserSignUpInfo( prevData => {
            return {
                ...prevData,
                [e.target.name] : e.target.value
            }
        })
    }

    function checkEmail(){
        let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regExp.test(userSignUpInfo.email)
    }

    function checkPasswords(){
        if (String(userSignUpInfo.password).length == 0 && String(userSignUpInfo.confirmPassword) == 0)
            return false;
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
                    <div className="user-input">
                        <input type={"email"} placeholder="Email Address" name="email" 
                            onChange={handleChange} value={userSignUpInfo.email}/>
                        {invalidEmail && <label htmlFor="email" className="error">Enter a valid email!</label>}
                    </div>
                    <div className="user-input">
                        <input type={"password"} placeholder="Password" name="password" 
                            onChange={handleChange} value={userSignUpInfo.password}/>
                    </div>
                    {formLogin ? <p className="forgot-password">Forgot Password?</p>
                        :   <div className="user-input">
                                <input type={"password"} placeholder="Confirm Password" name="confirmPassword" 
                                    onChange={handleChange} value={userSignUpInfo.confirmPassword}/>
                                {passwordsNoMatch && <label htmlFor="confirmPassword" className="error">The passwords entered do not match!</label>}
                            </div> 
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