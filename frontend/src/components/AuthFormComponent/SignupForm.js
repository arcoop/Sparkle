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
    const [passwordPlaceholder, setPasswordPlaceholder] = useState("")
    const [confirmPassPlaceholder, setConfirmPassPlaceholder] = useState("Confirm Password")
    const [usernamePlaceholder, setUsernamePlaceholder] = useState("Username")
    const [active, setActive] = useState(true)
    const dispatch = useDispatch()

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
                        setErrors(data.errors)
                    }
                })
        } else {
            setErrors(["passwords do not match"])
        }
    }

    const confirmPasswordClick = () => {
        setActive(false)
        setPasswordPlaceholder("Password")
        setConfirmPassPlaceholder("")
    }


    return (
        <>
            <ul className="errors">
                {errors.map(error => {
                    return (
                        <li className="error" key={error}>{error}</li>
                    )
                })}
            </ul>

            <h2 id="join-text">Join for Free</h2>
            <p id="subtitle">By continuing you agree to our Terms of Use and Privacy Policy.</p>
            <form onSubmit={handleSubmit}>
                <input className="signup-credentials"
                    type="text" 
                    value={email}
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    />

                <input 
                className={"signup-credentials"}
                autoFocus
                type="password"
                placeholder={passwordPlaceholder}
                onClick={() => setPasswordPlaceholder("")}
                value={password}
                onChange={e => setPassword(e.target.value)}
                />

    
                <input className="signup-credentials"
                type="password" 
                value={confirmPassword}
                placeholder={confirmPassPlaceholder}
                onChange={(e => {setConfirmPassword(e.target.value)} )}
                onClick={confirmPasswordClick}
                />
        
                <input className="signup-credentials"
                    type="text" 
                    value={username}
                    placeholder={usernamePlaceholder}
                    onClick={() => setUsernamePlaceholder("")}
                    onChange={e => setUsername(e.target.value)}
                    />
                
                <button className="signup-submit" type="submit">SUBMIT</button>
            </form>
            <div id="loginformmodal">
            </div>

        </>
    )
}

export default SignupForm;