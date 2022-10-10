import { useDispatch, useSelector } from "react-redux"
import React, { useState } from "react"
import { login } from "../../store/session"
import SignupFormModal from "../SignupFormModal"
// import './LoginForm.css'

const LoginForm = () => {
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    
    const handleSubmit = e => {
        e.preventDefault();
        setErrors([])
        const user = {credential, password}
        return dispatch(login(user))
            .catch(async(res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(["Incorrect login information"])
                }
            })
    }

    const handleDemoLogin = () => {
        const user = {credential:"demo-user", password: "demouser123"}
        return dispatch(login(user))
    }

    return (
        <>
            <ul>
                {errors.map(error => {
                    return (
                        <li key={error}>{error}</li>
                        )
                    })}
            </ul>
            <h2 id="login-text">Log In</h2>
            <form onSubmit={handleSubmit}>
                <button className="demo-user" onClick={handleDemoLogin}>LOG IN AS DEMO USER</button>
                <hr className="hr" /> 
                <input className="credentials"
                    type="text" 
                    // value={credential}
                    placeholder="Email Address or Username"
                    onChange={e => setCredential(e.target.value)}
                    />
                <br></br>
                <input type="password" 
                className="credentials"
                // value={password}
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                />
                <br></br>
                <button className="log-in" type="submit">LOG IN</button>
                <SignupFormModal className="signup-link"></SignupFormModal>
                {/* <button className="signup-link">Join Sparkle for Free</button> */}
            </form>
        </>
    )
}

export default LoginForm;