import NavBar from "../../components/NavBar/NavBar"
import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./LoginPage.css"

const LOGIN_URL = "/users/login"
const SIGNUP_URL = "/users/signup"
const PASSWORD_LENGTH_REQUIREMENT = 8;

export default function LoginPage(){

    const { setAuth, setLoggedIn, setUserID } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    //to be used when the download button is implemented
    const location = useLocation();
    const from = location.state?.from?.pathName || "/";

    const [formLogin, setFormType] = React.useState(true);

    const [userCreated, setUserCreated] = React.useState(false);

    const [validCredentials, setValidCredentials] = React.useState(true);
 
    const [validEmail, setValidEmail] = React.useState(true);
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
        let passLength = false;
        if (userSignUpInfo.password.length > PASSWORD_LENGTH_REQUIREMENT){
            passLength = true;
        }
        let oneUpper = /[A-Z]/.test(userSignUpInfo.password)
        let oneLow = /[a-z]/.test(userSignUpInfo.password)
        let oneNum = /[0-9]/.test(userSignUpInfo.password)
        let specialChars = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/
        let symbol = specialChars.test(userSignUpInfo.password)

        setPasswordReq( prevReq => {
            return {
                "passLength": passLength,
                "OneUpperCase": oneUpper,
                "oneLowerCase": oneLow,
                "oneNumber": oneNum,
                "oneSymbol": symbol
            }
        });
    },[userSignUpInfo.password])

    React.useEffect(() => {
        if (String(userSignUpInfo.password).length === 0){
            setPasswordValidFormat(false)
        }else if (passwordReq.oneLowerCase && passwordReq.passLength && passwordReq.OneUpperCase 
            && passwordReq.oneNumber && passwordReq.oneSymbol){
                setPasswordValidFormat(true)
        }else{
            setPasswordValidFormat(false)
        }
    }, [passwordReq])

    function changeFormType(e){
        e.preventDefault();
        setFormType(prev => !prev)
        setValidEmail(true)
        setPasswordsNoMatch(false)
        setPasswordValidFormat(true)
        setValidCredentials(true)
    }

    async function handleSubmit(e){
        e.preventDefault();
        let emailValid = checkEmail(e.target.value)
        if (formLogin){
            if (emailValid){
                const loggedInStatus = await loginUser();
                if (loggedInStatus){
                    console.log("location: " + from)
                    setLoggedIn(true)
                    localStorage.setItem("loggedIn", true);
                    localStorage.setItem("auth", JSON.stringify({ email: userLoginInfo.email,
                                            password: userLoginInfo.password,
                                            accessToken: loggedInStatus.accessToken }));
                    localStorage.setItem("userID", loggedInStatus.userID);
                    navigate(from, {replace: true})
                }else{
                    setValidCredentials(false)
                    console.log("The password and/or email entered does not match our records!")
                }
            }
        }else{
            let passMatch = checkIfPasswordsMatch()
            if (passMatch && emailValid && passwordValidFormat){
                let response = await postNewAccount()
                if (response){
                    console.log("Account Created!")
                    setUserCreated(true);
                    setFormType(prev => !prev)
                    setValidEmail(true)
                    setPasswordsNoMatch(false)
                    setPasswordValidFormat(true)
                    setUserSignUpInfo({
                        "email": "",
                        "password": "",
                        "confirmPassword": ""
                    })
                }
            }
            !passMatch ? setPasswordsNoMatch(true) : setPasswordsNoMatch(false)
        }
        emailValid ? setValidEmail(true) : setValidEmail(false)
    }

    async function loginUser(){
        try {
            const response = await axiosPrivate.post(LOGIN_URL, 
                            JSON.stringify(userLoginInfo),
                            {
                                headers: {'Content-Type': 'application/json'},
                                withCredentials: true
                            }
            );
            console.log(response?.data.success)
            console.log('Login response: ', response);
            const { accessToken, userID } = response?.data;
            setAuth({ email: userLoginInfo.email, password: userLoginInfo.password, accessToken });
            setUserID(userID)
            setUserLoginInfo({
                "email": "",
                "password": ""
            });
        } catch (error) {
            return false
        }
        return true
    }

    async function postNewAccount(){
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
            if (error.response.data.message == "Email already taken")
                setEmailTaken(true)
            return false;
        }
        return true
    }

    async function handleChange(e){
        if (formLogin){
            setUserLoginInfo( prevData => {
                return{
                    ...prevData,
                    [e.target.name] : e.target.value
                }
            })
        }else{
            setUserSignUpInfo( prevData => {
                return {
                    ...prevData,
                    [e.target.name] : e.target.value
                }
            })
        }
    }

    function checkEmail(e){
        let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let answer
        if (e === "Login"){
            answer = regExp.test(userLoginInfo.email)
        }else{
            answer = regExp.test(userSignUpInfo.email)
        }
        return answer
    }

    function checkIfPasswordsMatch(){
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
                <form className="login-signup-box" method="post">
                    <p className="form-type">{formLogin ? "Welcome Back!": "Join Us!"}</p>
                    <div className="user-input">
                        <input 
                            type={"email"} 
                            placeholder="Email Address" 
                            name="email" 
                            onChange={handleChange} 
                            value={formLogin ? userLoginInfo.email : userSignUpInfo.email}
                            required
                        />
                        {!validEmail && <label htmlFor="email" className="error">Enter a valid email!</label>}
                        {emailTaken && <label htmlFor="email" className="error">An account with this email already exists!</label>}
                    </div>
                    <div className="user-input">
                        <input 
                            type={"password"} 
                            placeholder="Password" 
                            name="password" 
                            onChange={handleChange} 
                            value={formLogin ? userLoginInfo.password : userSignUpInfo.password}
                            required
                        />
                        { !validCredentials ? <label htmlFor="password"className="error">The password and/or email entered does not match our records!</label> : ""}
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
                                <li className={userSignUpInfo.password.length > PASSWORD_LENGTH_REQUIREMENT ? "valid-req" : "invalid-req"}>More than 8 characters</li>
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
            { userCreated && <p className="user-created">Account created successfully! Login to continue!</p>}
        </div>
    )
}