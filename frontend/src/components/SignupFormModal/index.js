import React, { useState } from "react";
import SignupForm from "./SignUpForm";
import { Modal } from "../../context/Modal";
import '../LoginFormModal/LoginForm.css'

const SignupFormModal = () => {
    const [showModal, setShowModal] = useState(false)

   return (
    <>
    <button id="joinsparkle" className="signup-link" onClick={() => setShowModal(true)}>Join Sparkle for Free</button>
    {showModal && (
        <Modal onClose={() => setShowModal(false)} type="signup">
            <SignupForm />
        </Modal>
    )}
</>
   )
}

export default SignupFormModal;