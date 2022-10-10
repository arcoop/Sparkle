import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import './LoginForm.css'

const LoginFormModal = () => {
    const [showModal, setShowModal] = useState(false)

        return (
            <>
                <button onClick={() => setShowModal(true)}>SIGN IN</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <LoginForm />
                    </Modal>
                )}
            </>
        )
    
}

export default LoginFormModal;