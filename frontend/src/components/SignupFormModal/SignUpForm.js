import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../store/session"
import { Redirect } from "react-router-dom"
import './SignUpForm.css'
import LoginFormModal from "../LoginFormModal"

const SignupForm = () => {

    const [email, setEmail] = useState("")
    const sessionUser = useSelector(state => state.session.user)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [confirmPassword, setConfirmPassword] = useState("")
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


    return (
        <>
            <ul className="errors">
                {errors.map(error => {
                    return (
                        <li className="error" key={error}>{error}</li>
                    )
                })}
            </ul>

            <h2>Create your free account</h2>


            <form onSubmit={handleSubmit}>
                <input className="signup-credentials"
                    type="text" 
                    value={email}
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    />

                <input 
                className="signup-credentials"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />


    
                <input className="signup-credentials"
                type="password" 
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e => {setConfirmPassword(e.target.value)} )}
                />
        
                <input className="signup-credentials"
                    type="text" 
                    value={username}
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                    />
                
                <button className="signup-submit" type="submit">SUBMIT</button>
            </form>
            <div id="loginformmodal">
                <LoginFormModal fromModal={true}></LoginFormModal>
            </div>

        </>
    )
}

export default SignupForm;