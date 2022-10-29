import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../store/session"
import { Redirect } from "react-router-dom"
import './SignUpForm.css'
// import LoginFormModal from "../LoginFormModal"
import FormModal from "."

const InterimSignUp = ({email, setEmail, errors}) => {

    //const [email, setEmail] = useState("")
    const sessionUser = useSelector(state => state.session.user)
    //const [emailPlaceholder, setEmailPlaceholder] = useState("Email")
    const [float, setFloat] = useState("email-label")

    if (sessionUser) return <Redirect to="/" />;

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     if (email.length < 7 || !email.includes("@") || !email.split(".").length === 2) {
    //         setErrors(["Enter a valid email"])
    //     }
    // }

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
                    <label onClick={() => setFloat("email-label floating")} className={float}>Email</label>
                    <input className="signup-credentials"
                        type="text"
                        value={email}
                        onClick={() => setFloat("email-label floating")}
                        onChange={e => setEmail(e.target.value)}
                        />
                </div>
            <div id="loginformmodal">
            </div>

        </div>
    )
}

export default InterimSignUp;