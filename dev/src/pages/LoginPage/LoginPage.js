import NavBar from "../../components/NavBar/NavBar"
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"

export default function LoginPage(){

    const [formLogin, setFormType] = React.useState(true);
    const [invalidEmail, setInvalidEmail] = React.useState(false);
    const [passwordsNoMatch, setPasswordsNoMatch] = React.useState(false);
    const [passwordValidFormat, setPasswordValidFormat] = React.useState(true);/////
    const [passwordReq, setPasswordReq] = React.useState({
        "passLength": 0,
        "OneUpperCase": false,
        "oneLowerCase": false,
        "oneNumber": false,
        "oneSymbol": false
    })
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
        let validPass = checkPasswordValidity();
        if (passMatch && emailValid && validPass){
            postNewAccount()
            navigate("/visualization")
            return true
        }
        if (!validPass) setPasswordValidFormat(false)
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
        if (String(userSignUpInfo.password).length === 0 && String(userSignUpInfo.confirmPassword) === 0)
            return false;
        return String(userSignUpInfo.password) === String(userSignUpInfo.confirmPassword);
    }

    function checkPasswordValidity(){
        let currentPass = userSignUpInfo.password
        setPasswordReq( prevReq => {
            let passLength = currentPass.length
            let oneUpper = /[A-Z]/.test(currentPass)
            let oneLow = /[a-z]/.test(currentPass)
            let oneNum = /[0-9]/.test(currentPass)
            let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            let symbol = specialChars.test(currentPass)
            return {
                "passLength": passLength,
                "OneUpperCase": oneUpper,
                "oneLowerCase": oneLow,
                "oneNumber": oneNum,
                "oneSymbol": symbol
            }
        })
        if (passwordReq.oneLowerCase && passwordReq.passLength > 8 && passwordReq.OneUpperCase 
            && passwordReq.oneNumber && passwordReq.oneSymbol){
                setPasswordValidFormat(true)
                return true
        }
        return false
    }

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
                    { (!passwordValidFormat && !formLogin) &&
                        <div className="password-requirements">
                            <label htmlFor="requirements">Your password needs the following requirements:</label>
                            <ul className="requirements" name="requirements">
                                <li className={passwordReq.passLength > 8 ? "valid-req" : "invalid-req"}>More than 8 characters</li>
                                <li className={passwordReq.oneLowerCase ? "valid-req" : "invalid-req"}>1 lower case letter</li>
                                <li className={passwordReq.OneUpperCase ? "valid-req" : "invalid-req"}>1 upper case letter</li>
                                <li className={passwordReq.oneNumber ? "valid-req" : "invalid-req"}>1 number</li>
                                <li className={passwordReq.oneSymbol ? "valid-req" : "invalid-req"}>1 special character</li>
                            </ul>
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