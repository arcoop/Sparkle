import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../store/session"
import { Redirect } from "react-router-dom"
import './SignUpForm.css'
// import LoginFormModal from "../LoginFormModal"
import FormModal from "."

const InterimSignUp = () => {

    const [email, setEmail] = useState("")
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = e => {
        e.preventDefault();
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
                
                <button className="signup-submit" type="submit">CONTINUE</button>
            </form>
            <div id="loginformmodal">
            </div>

        </>
    )
}

export default InterimSignUp;