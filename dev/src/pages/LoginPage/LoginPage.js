import NavBar from "../../components/NavBar/NavBar"
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"

export default function LoginPage(){

    const [formLogin, setFormType] = React.useState(true);
    const [invalidEmail, setInvalidEmail] = React.useState(false);
    const [passwordsNoMatch, setPasswordsNoMatch] = React.useState(false);
    const [passwordValidFormat, setPasswordValidFormat] = React.useState(true);
    const [emailTaken, setEmailTaken] = React.useState(false);
    const [passwordReq, setPasswordReq] = React.useState({
        "passLength": false,
        "OneUpperCase": false,
        "oneLowerCase": false,
        "oneNumber": false,
        "oneSymbol": false
    })

    const passwordLengthRequirement = 8;

    const [userSignUpInfo, setUserSignUpInfo] = React.useState({
        "email": "",
        "password": "",
        "confirmPassword": ""
    })
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!formLogin){
            let passLength = false;
            if (userSignUpInfo.password.length > passwordLengthRequirement){
                passLength = true;
            }
            let oneUpper = /[A-Z]/.test(userSignUpInfo.password)
            let oneLow = /[a-z]/.test(userSignUpInfo.password)
            let oneNum = /[0-9]/.test(userSignUpInfo.password)
            let specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            let symbol = specialChars.test(userSignUpInfo.password)

            setPasswordReq( prevReq => {
                return {
                    "passLength": passLength,
                    "OneUpperCase": oneUpper,
                    "oneLowerCase": oneLow,
                    "oneNumber": oneNum,
                    "oneSymbol": symbol
                }
            })
            checkPasswordValidity();
        }
    },[userSignUpInfo.password])

    async function checkPasswordValidity(){
        if (passwordReq.oneLowerCase && passwordReq.passLength && passwordReq.OneUpperCase 
            && passwordReq.oneNumber && passwordReq.oneSymbol){
                setPasswordValidFormat(true)
        }else{
            setPasswordValidFormat(false)
        }
    }

    function changeFormType(e){
        e.preventDefault();
        setFormType(prev => !prev)
    }

    async function handleSubmit(e){
        e.preventDefault();
        let emailValid = await checkEmail()
        let passMatch = await checkPasswords()
        await checkPasswordValidity();
        if (passMatch && emailValid && passwordValidFormat){
            let response = await postNewAccount()
            if (response){
                console.log("Account Created!")
                navigate("/")
                return true
            }
        }
        !emailValid ? setInvalidEmail(true) : setInvalidEmail(false)
        !passMatch ? setPasswordsNoMatch(true) : setPasswordsNoMatch(false)
    }

    async function postNewAccount(){
        const newUser = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userSignUpInfo)
        };
          
        try{
            await fetch('/users/signup', newUser)
            .then(response => response.json())
            .then(res => {
                if (res.message === "Email already taken"){
                    setEmailTaken(true)
                    return Promise.reject(res)
                }else{
                    setEmailTaken(false)
                }
            })
        }catch (error){
            console.error(error)
            return false;
        }
        return true
    }

    async function handleChange(e){
        await setUserSignUpInfo( prevData => {
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
        if (String(userSignUpInfo.password).length === 0 || String(userSignUpInfo.confirmPassword) === 0){
            return false;
        }
        return String(userSignUpInfo.password) === String(userSignUpInfo.confirmPassword);
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
                        {emailTaken && <label htmlFor="email" className="error">An account with this email already exists!</label>}
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
                                <li className={userSignUpInfo.password.length > passwordLengthRequirement ? "valid-req" : "invalid-req"}>More than 8 characters</li>
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