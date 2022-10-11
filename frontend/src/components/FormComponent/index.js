import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Modal } from "../../context/Modal";

const FormModal = ({fromSignUp = false}) => {
    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState(LoginForm)

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

    const form = (modal === LoginForm ? <LoginForm /> : <SignupForm />)

    const handleClick = () => {
        setShowModal(true)
        setModal( modal === LoginForm ? SignupForm : LoginForm)
    }
    const toggleModal = () => {
        console.log('switching modal between log in and sign up')
    }
    let text;
    let classText
    if (fromSignUp) {
        text = "Log In"
        classText = "signuppage"
    } else if (modal === LoginForm) {
        text = "JOIN SPARKLE FOR FREE"
    } else {text = "SIGN IN"}

    return (
        <>
            {/* <button className={classText} onClick={handleClick}>{text}</button> */}
            <button className="{classText}" onClick={handleClick}>{text}</button>
            {showModal &&
                <Modal onClose = {() => setShowModal(false)} >
                    {form}
                    <button onClick={toggleModal}>Already a Sparkler? Log in!</button>
                </Modal>
            }
        </>
    )
}

export default FormModal;