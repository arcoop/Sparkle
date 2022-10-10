import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../store/session"
import { Redirect } from "react-router-dom"
import './SignUpForm.css'

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
            <ul>
                {errors.map(error => {
                    return (
                        <li key={error}>{error}</li>
                    )
                })}
            </ul>

            <h2>Create your free account</h2>


            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={email}
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    />

                <input type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />


    
                <input type="password" 
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e => {setConfirmPassword(e.target.value)} )}
                />

        
                <input 
                    type="text" 
                    value={username}
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                    />


                
                <button type="submit">Sign Up</button>
            </form>

        </>
    )
}

export default SignupForm;