import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import './LoginForm.css'

const LoginFormModal = ({fromModal = false}) => {
    const [showModal, setShowModal] = useState(false)

    let text;
    let classText;
    if (fromModal) {
        text = "Log In" 
        classText = "signuppage"
    } else {
        text = "SIGN IN"
        classText = "navbar"
    }

        return (
            <>
                <button className={classText} onClick={() => setShowModal(true)}>{text}</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginForm />
                    </Modal>
                )}
            </>
        )
    
}

export default LoginFormModal;