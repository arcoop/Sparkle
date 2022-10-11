import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Modal } from "../../context/Modal";

const FormModal = () => {
    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState("login")

    const toggleModal = () => {
        setModal( modal === "login" ? "signup" : "login")
    }

    let classtext;

    const handleClick = () => {
        setShowModal(true)
    }

    const modalType = (modal === "login" ? "login" : "signup")

    const formClass = (modal === "login" ? "signup-link" : "signup-link")
    
    return (
        <>            
            <button className={classtext} onClick={handleClick}>SIGN IN</button>
            
            {showModal &&
                <Modal onClose = {() => setShowModal(false)} type={modalType}>
                    {modal === 'login' ? <LoginForm /> : <SignupForm />}
                    <button className={formClass} onClick={toggleModal}>{modal === 'login' ? "Join Sparkle for Free" : "Log in"}
                    </button>
                </Modal>
            }
        </>
    )
}

export default FormModal;