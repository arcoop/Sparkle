import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../store/session"
import { Redirect } from "react-router-dom"
import './SignUpForm.css'
// import LoginFormModal from "../LoginFormModal"
import FormModal from "."

const SignupForm = ({email, setEmail}) => {

    //const [email, setEmail] = useState("")
    const sessionUser = useSelector(state => state.session.user)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailFloat, setEmailFloat] = useState("sign-up-label floating")
    const [passwordFloat, setPasswordFloat] = useState("sign-up-label")
    const [confirmPasswordFloat, setConfirmPasswordFloat] = useState("sign-up-label")
    const [usernameFloat, setUsernameFloat] = useState("sign-up-label")
    const dispatch = useDispatch()
    const [passwordErrors, setPasswordErrors] = useState([])

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([])
        const user = {email, username, password}
        if (password === confirmPassword) {
            return dispatch(signup(user))
                .catch(async(res) => {
                    const data = await res.json()
                    if (data && data.errors) {
                        if (password.length < 6) {
                            setPasswordErrors(["Must be between 6 and 16 characters long"])
                        }
                        setErrors(["Sorry, this username is already taken."])
                    }
                })
        } else {
            setPasswordErrors(["passwords do not match"])
        }
    }

    // const confirmPasswordClick = () => {
    //     setPasswordPlaceholder("Password")
    //     setConfirmPassPlaceholder("")
    // }

    const handlePasswordClick = () => {
        if (confirmPassword.length < 1)  {
            setConfirmPasswordFloat("sign-up-label")
        } else setConfirmPasswordFloat("sign-up-label hidden")
        if (username.length < 1) {
            setUsernameFloat("sign-up-label")
        } else setUsernameFloat("sign-up-label-hidden")
        setPasswordFloat("sign-up-label floating")
    }

    const handleConfirmPassClick = () => {
        if (password.length < 1)  {
            setPasswordFloat("sign-up-label")
        } else setPasswordFloat("sign-up-label hidden")
        if (username.length < 1) {
            setUsernameFloat("sign-up-label")
        } else setUsernameFloat("sign-up-label hidden")
        setConfirmPasswordFloat("sign-up-label floating")
    }
    
    const handleUsernameClick = () => {
        if (password.length < 1)  {
            setPasswordFloat("sign-up-label")
        } else setPasswordFloat("sign-up-label hidden")
        if (confirmPassword.length < 1)  {
            setConfirmPasswordFloat("sign-up-label")
        } else setConfirmPasswordFloat("sign-up-label hidden")
        setUsernameFloat("sign-up-label floating")
    }

    return (
        <>
            {/* <ul className="errors">
                {errors.map(error => {
                    return (
                        <li className="sign-up-error" key={error}>{error}</li>
                    )
                })}
            </ul> */}

            <h2 id="join-text">Join for Free</h2>
            <p id="subtitle">By continuing you agree to our Terms of Use and Privacy Policy.</p>
            <form onSubmit={handleSubmit}>
                <div className="cred-div">
                    <label className="sign-up-label floating">Email</label>
                    <input className="signup-credentials"
                        disabled
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    {errors.map(error => {
                        return (
                            <div className="sign-up-error" key={`${error}-cred`}>{error}</div>
                        )
                    })}
                </div>

                <div className="cred-div">
                    <label onFocus={handlePasswordClick} onClick={handlePasswordClick} className={passwordFloat}>Password</label>
                    <input className={"signup-credentials"}
                        autoFocus
                        type="password"
                        onClick={handlePasswordClick}
                        onFocus={handlePasswordClick}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {passwordErrors.map(error => {
                        return (
                            <div className="sign-up-error" key={`${error}-pass`}>{error}</div>
                        )
                    })}
                </div>

    
                <div className="cred-div">
                    <label onFocus={handleConfirmPassClick} onClick={handleConfirmPassClick} className={confirmPasswordFloat}>Confirm Password</label>
                    <input className="signup-credentials"
                        type="password"
                        value={confirmPassword}
                        onChange={(e => {setConfirmPassword(e.target.value)} )}
                        onClick={handleConfirmPassClick}
                        onFocus={handleConfirmPassClick}
                    />
                </div>
        
                <div className="cred-div">
                    <label onFocus={handleUsernameClick} onClick={handleUsernameClick} className={usernameFloat}>Username</label>
                    <input className="signup-credentials"
                        type="text"
                        value={username}
                        onClick={handleUsernameClick}
                        onFocus={handleUsernameClick}
                        onChange={e => setUsername(e.target.value)}
                        />
                </div>
                
                <button className="signup-submit" type="submit">SUBMIT</button>
            </form>
            <div id="loginformmodal">
            </div>

        </>
    )
}

export default SignupForm;