import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../store/session"
import { Redirect } from "react-router-dom"

const SignUpFormPage = () => {

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
                    setErrors(res.errors)
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
            <form onSubmit={handleSubmit}>
                <label> Email
                    <input 
                        type="text" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                </label>

                <label> Username
                    <input 
                        type="text" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        />
                </label>

                <label> Password
                    <input type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                </label>

                <label> Confirm Password
                    <input type="password" 
                    value={confirmPassword}
                    onChange={(e => {setConfirmPassword(e.target.value)} )}
                    />

                </label>
                
                <button type="submit">Sign Up</button>
            </form>

        </>
    )
}

export default SignUpFormPage;