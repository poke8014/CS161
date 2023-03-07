import NavBar from "../../components/NavBar/NavBar"
import React from "react";
import "./LoginPage.css"

export default function LoginPage(){

    const [formLogin, setFormType] = React.useState(true);

    const signUpRef = React.useRef(null)

    function changeFormType(e){
        e.preventDefault()
        let buttonPressed = String(e.target.className)
        switch(buttonPressed){
            case "signup-button-form":
                if(formLogin){
                    setFormType(prev => !prev)
                }
                break;
            case "login-button-form":
                if (!formLogin){
                    setFormType(prev => !prev)
                }
                break;
            case "signup-now-button":
                setFormType(false)
                signUpRef.current.focus()
                break;
        }
    }

    const selectedStyle = {
        "backgroundColor": "#2678F3",
        "color": "white"
    }

    const defaultStyle = {
        "margin": "0",
        "fontSize": "4ch",
        "padding": "10px 0px",
        "flex": "1",
        "borderRadius": "10px",
        "border": "1px solid rgb(103, 103, 103)",
        "backgroundColor": "#727F84"
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
                    <div className="login-signup-buttons">
                        <button className="login-button-form" onClick={changeFormType} 
                        style={formLogin ? selectedStyle : defaultStyle}>Login</button>
                        <button className="signup-button-form" onClick={changeFormType}
                        style={!formLogin ? selectedStyle : defaultStyle}>Sign Up</button>
                    </div>
                    <input type={"email"} placeholder="Email Address" ref={signUpRef} name="email"/>
                    <input type={"password"} placeholder="Password" name="pass"/>
                    {formLogin ? <p className="forgot-password">Forgot Password?</p>
                        : <input type={"password"} placeholder="Confirm Password" />
                    }
                    <input className="form-submit" type={"submit"} 
                        value={formLogin ? "Login": "Create Account"}/>
                    {formLogin &&
                        <p className="no-account">Don't have an account? 
                            <button className="signup-now-button" onClick={changeFormType}>Sign Up now</button>
                        </p>
                    }
                </form>
            </div>
        </div>
    )
}