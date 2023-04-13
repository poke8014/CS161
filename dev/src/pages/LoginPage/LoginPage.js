import NavBar from "../../components/NavBar/NavBar"
import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./LoginPage.css"

export default function LoginPage(){

    const { setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    //to be used when the download button is implemented
    const location = useLocation();
    const from = location.state?.from?.pathName || "/";

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

    const [userLoginInfo, setUserLoginInfo] = React.useState({
        "email": "",
        "password": ""
    })

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
        let emailValid = checkEmail(e.target.value)
        if (formLogin){
            console.log("login!")
            if (emailValid){
                if (await loginUser()){
                    console.log("location: " + from);
                    navigate(from, {replace: true})
                }else{
                    console.log("The password and/or email entered does not match our records!")
                }
            }
        }else{
            console.log("sign up!")
            let passMatch = checkIfPasswordsMatch()
            if (passMatch && emailValid && passwordValidFormat){
                let response = await postNewAccount()
                if (response){
                    console.log("Account Created!")
                    navigate("/login")
                    return true
                }
            }
            !passMatch ? setPasswordsNoMatch(true) : setPasswordsNoMatch(false)
        }
        emailValid ? setValidEmail(true) : setValidEmail(false)
    }

    async function loginUser(){
        console.log("before login: " + from)
        try {
            const response = await axiosPrivate.post(LOGIN_URL, 
                            JSON.stringify(userLoginInfo),
                            {
                                headers: {'Content-Type': 'application/json'},
                                withCredentials: true
                            }
            );
            console.log(response?.data.success)
            const accessToken = response?.data?.accessToken
            setAuth(`{ ${userLoginInfo.email}, ${userLoginInfo.password}, ${accessToken} }`)
            setUserLoginInfo({
                "email": "",
                "password": ""
            });
            console.log("location: " + from);
        } catch (error) {
            return false
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
            const response = await axiosPrivate.post(SIGNUP_URL, 
                            JSON.stringify(userSignUpInfo),
                            {
                                headers: {'Content-Type': 'application/json'},
                                withCredentials: true
                            }
            );
            setEmailTaken(false)
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