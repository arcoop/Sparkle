import { useDispatch, useSelector } from "react-redux"
import React, { useState } from "react"
import { login } from "../../store/session"
// import SignupFormModal from "../SignupFormModal"
import './LoginForm.css'
import LoginFormModal from "."
import FormModal from "."

const LoginForm = () => {
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    //const sessionUser = useSelector(state => state.session.user)
    
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
        const demoCredential = "demo-user".split("")
        const demoPassword = "demouser123".split("")
        setCredential("")
        setPassword("")
        let tempCredential = ""
        let tempPassword = ""
        const loginAnimation = () => {
            const interval = setInterval(() => {
                if (demoCredential.length > 0) {
                    tempCredential += demoCredential.shift()
                    console.log("tempCredential")
                    console.log(tempCredential)
                    setCredential(tempCredential)
                } else if (demoPassword.length > 0) {
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

    // const handleClick = () => {
    //     LoginFormModal.setShowModal()
    // }


    return (
        <>
            <ul className="errors">
                {errors.map(error => {
                    return (
                        <li className="error" key={error}>{error}</li>
                        )
                    })}
            </ul>
            <h2 id="login-text">Log In</h2>
            <p id="subtitle">By continuing you agree to our Community Guidelines.</p>
            <div className="non-form-items">
                <button className="demo-user" onClick={handleDemoLogin}>LOG IN AS DEMO USER</button>
                <hr className="hr" /> 
            </div>
                <form id="loginform" onSubmit={handleSubmit}>

                    <input className="credentials"
                        type="text" 
                        value={credential}
                        placeholder="Email Address or Username"
                        onChange={e => setCredential(e.target.value)}
                        />
                    <br></br>
                    <input type="password" 
                        className="credentials"
                        value={password} 
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                        />
                    <br></br>
                    <button className="log-in" type="submit">LOG IN</button>
                </form>
            
        </>
    )
}

export default LoginForm;