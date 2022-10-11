import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Modal } from "../../context/Modal";

const FormModal = () => {
    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState("login")

    // let text;
    // let classText;
    // if (fromSignUp) {
    //     text = "Log In" 
    //     classText = "signuppage"
    // } else if (modal === LoginForm) {
    //     text = "SIGN IN"
    //     classText = "navbar"
    // } else {
    //     text = "JOIN SPARKLE FOR FREE"
    // }

    // let form = (modal === "login" ? <LoginForm /> : <SignupForm />)

    // const handleClick = () => {
    //     setShowModal(true)
    //     setModal( modal === "login" ? "signup" : "login")
    // }

    const toggleModal = () => {
        setModal( modal === "login" ? "signup" : "login")
    }

    let classtext;

    const handleClick = () => {
        setShowModal(true)
        classtext = "hidden"
    }

    // let text;
    // let classText
    // if (modal === "login") {
    //     text = "JOIN SPARKLE FOR FREE"
    //     classText = "signuppage"
    // } else if (modal === "login") {
    //     text = "JOIN SPARKLE FOR FREE"
    // } else {text = "Already a sparkler? Log In"}

    return (
        <>
            {/* <button className={classText} onClick={handleClick}>{text}</button> */}
            
            <button className={classtext} onClick={handleClick}>SIGN IN</button>
            

            {showModal &&
                <Modal onClose = {() => setShowModal(false)} >
                    {modal === 'login' ? <LoginForm /> : <SignupForm />}
                    <button onClick={toggleModal}>{modal === 'login' ? "JOIN SPARKLE FOR FREE" : "Log in"}
                    </button>
                </Modal>
            }
        </>
    )
}

export default FormModal;