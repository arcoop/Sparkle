import { useDispatch, useSelector } from "react-redux"
import React, { useState } from "react"
import { login } from "../../store/session"
import './LoginForm.css'
import { Redirect } from "react-router-dom"



const LoginFormPage = () => {
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) return <Redirect to="/" />;

    
    const handleSubmit = e => {
        e.preventDefault();
        setErrors([])
        const user = {credential, password}
        return dispatch(login(user))
            .catch(async(res) => {
                setErrors(res.errors)
            })
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
            <form onSubmit={handleSubmit}>
                <label> Username or Email
                    <input 
                        type="text" 
                        value={credential}
                        onChange={e => setCredential(e.target.value)}
                        />
                </label>

                <label> Password
                    <input type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                </label>
                
                <button type="submit">Log In</button>
            </form>
        </>
    )
}

export default LoginFormPage;