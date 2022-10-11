import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import './LoginForm.css'

const LoginFormModal = ({fromModal = false}) => {
    const [showModal, setShowModal] = useState(false)

    // useEffect(() => {
    //     const modal = document.getElementById("joinsparkle")
    //     const closeModal = () => {
    //         setShowModal(false)
    //     }
    //     if (showModal) {
    //         modal.addEventListener("click", closeModal)
    //     }
       
    // }, [showModal])

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