import { useDispatch, useSelector } from "react-redux"
import React, { useState } from "react"
import { login } from "../../store/session"
// import SignupFormModal from "../SignupFormModal"
import './LoginForm.css'
import LoginFormModal from "."
import FormModal from "."

const LoginForm = () => {
    const dispatch = useDispatch()
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [usernameFloat, setUsernameFloat] = useState("label has-focus")
    const [passwordFloat, setPasswordFloat] = useState("label")
    const [emailErrors, setEmailErrors] = useState([])
    const [passwordErrors, setPasswordErrors] = useState([])
    
    let username;

    const handleSubmit = e => {
        e.preventDefault();
        setEmailErrors([])
        setPasswordErrors([])
        const user = {credential, password}
        return dispatch(login(user))
            .catch(async(res) => {
                const data = await res.json();
                if (data && data.errors) {
                    if (credential.length < 1 && password.length < 1) {
                        setEmailErrors(["Missing email or username"])
                        setPasswordErrors(["Missing password"])
                    } else if (credential.length < 1) {
                        setEmailErrors(["Missing email or username"])
                    } else if (password.length < 1 ) {
                        setPasswordErrors(["Missing password"])
                    } else {
                        setEmailErrors(["Incorrect login information"])
                        setPasswordErrors(["Incorrect login information"])
                    }
                }
            })
    }
    
  
    const handleDemoLogin = () => {
        const demoCredential = "demo-user".split("")
        const demoPassword = "demouser123".split("")
        setCredential("")
        setPassword("")
        let tempCredential = ""
        let tempPassword = ""
        const loginAnimation = () => {
            const interval = setInterval(() => {
                if (demoCredential.length > 0) {
                    setUsernameFloat("label floating")
                    tempCredential += demoCredential.shift()
                    setCredential(tempCredential)
                } else if (demoPassword.length > 0) {
                    setPasswordFloat("label floating")
                    tempPassword += demoPassword.shift()
                    setPassword(tempPassword)
                } else {
                    clearInterval(interval)
                    setCredential(tempCredential)
                    setPassword(tempPassword)
                    return dispatch(login({credential: tempCredential, password: tempPassword}))
                }
            }, 65)
        };

        loginAnimation()
    }

    const handleUsernameClick = () => {
        if (password.length < 1) {
            setPasswordFloat(password.length > 0 ? "label credential-errors" : "label")
        } else setPasswordFloat(passwordErrors.length > 0 ? "label floating credential-errors" : "label floating")
        setUsernameFloat(emailErrors.length > 0 ? "label floating credential-errors" : "label floating")
    }

    const handlePasswordClick = () => {
        if (credential.length < 1) {
            setUsernameFloat(emailErrors.length > 0 ? "label credential-errors" : "label")
        } else setUsernameFloat(emailErrors.length > 0 ? "label floating credential-errors" : "label floating")
        setPasswordFloat(passwordErrors.length > 0 ? "label floating credential-errors" : "label floating")
    }


    return (
        <div>
            <ul className="errors">
                {errors.map(error => {
                    return (
                        <li className="error" key={error}>{error}</li>
                        )
                    })}
            </ul>
            <h2 id="login-text">Log In</h2>
            <p id="subtitle">By continuing you agree to <a id="subtitle-link" target="_blank" href="https://www.linkedin.com/in/adina-cooper/">view my LinkedIn</a>.</p>
            <div className="non-form-items">
                <button className="demo-user" onClick={handleDemoLogin}>LOG IN AS DEMO USER</button>
                {/* <hr className="hr" />  */}
                <div className="line-break-or">
                    <div className="hr"></div>
                    <p className="or-text">or</p>
                </div>
            </div>
                <form id="loginform" onSubmit={handleSubmit}>
                        <div className="cred-div">
                            <label onFocus={handleUsernameClick} onClick={handleUsernameClick} className={emailErrors.length > 0 ? `${usernameFloat} credential-errors` : usernameFloat}>Email Address or Username<p className="required">*</p></label>
                            <input className={usernameFloat === "label has-focus" ? "credentials has-focus" : emailErrors.length > 0 ? "credentials cred-errors" : "credentials"}
                                type="text"
                                value={credential}
                                onClick={handleUsernameClick}
                                onFocus={handleUsernameClick}
                                onChange={e => setCredential(e.target.value)}
                                />
                            {emailErrors.map(error => {
                                return (
                                    <div className="error" key={`${error} credential`}>{error} </div>
                                )
                            })}
                        </div>
                    <br></br>
                    <div className="cred-div">
                        <label onFocus={handlePasswordClick} onClick={handlePasswordClick} className={passwordErrors.length > 0 ? `${passwordFloat} credential-errors` : passwordFloat}>Password <p className="required">*</p></label>
                        <input type="password"
                            className={passwordErrors.length > 0 ? "credentials cred-errors" : "credentials"}
                            value={password}
                            onClick={handlePasswordClick}
                            onFocus={handlePasswordClick}
                            onChange={e => setPassword(e.target.value)}
                            />
                        {passwordErrors.map(error => {
                            return (
                                <div className="error" key={`${error} password`}>{error}</div>
                            )
                        })}
                    </div>
                    <br></br>
                    <button className="log-in" type="submit">LOG IN</button>
                </form>
        </div>
    )
}

export default LoginForm;