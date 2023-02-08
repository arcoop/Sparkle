import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../store/session"
import { Redirect } from "react-router-dom"
import './SignUpForm.css'
// import LoginFormModal from "../LoginFormModal"
import FormModal from "."

const InterimSignUp = ({email, setEmail, errors}) => {
    const sessionUser = useSelector(state => state.session.user)
    const [float, setFloat] = useState(email.length >= 1 ? "email-label floating" : "email-label")

    if (sessionUser) return <Redirect to="/" />;

    return (
        <div>
            <ul className="errors">
                {errors.map(error => {
                    return (
                        <li className="error" key={error}>{error}</li>
                    )
                })}
            </ul>

            <h2 id="join-text">Join for Free</h2>
            <p id="subtitle">By continuing you agree to our Terms of Use and Privacy Policy.</p>
                <div className="email-cred-div">
                    <label onFocus={() => setFloat("email-label floating")} onClick={() => setFloat("email-label floating")} className={float}>Email<p className="required">*</p></label>
                    <input className="signup-credentials"
                        type="text"
                        value={email}
                        onClick={() => setFloat("email-label floating")}
                        onFocus={() => setFloat("email-label floating") }
                        onBlur={() => setFloat(email.length >= 1 ? "email-label floating" : "email-label")}
                        onChange={e => setEmail(e.target.value)}
                        />
                </div>
        </div>
    )
}

export default InterimSignUp;