import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Modal } from "../../context/Modal";
import InterimSignUp from "./InterimModalForm";

const FormModal = ({type = "login"}) => {
    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState(type)
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState([])

    //types: login, interimSignup, signup,

    const toggleModal = () => {
        if (modal === "login" || modal === "create-quiz-login") {
            setModal("interimSignup")
        } else if (modal === "signup") {
            setModal("login")
        } else if (modal === "interimSignup") setModal("signup")
        // setModal( modal === ("login" || "create-quiz-login")  ? "signup" : "login")
    }

    const otherToggleModal = () => {
        setModal("login")
    }

    const handleClick = () => {
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
        setModal('login')
        setEmail("")
    }

    let buttonText;
    let buttonClass;
    if (type === "create-quiz-login") {
        buttonText = "Log in"
        buttonClass="button-create-form-login"

    } else if (type === "create-quiz-signup")  {
        buttonText = "Sign Up"
        buttonClass = "button-create-form-signup"
    } else {
        buttonText = "SIGN IN"
        buttonClass = ""
    }

    let classText;
    if (modal === 'signup' || modal === 'interimSignup') {
        classText = "show-sidebar"
    } else classText = "hidden"

   // const modalType = (modal === "login" ? "login" : "signup")

    ///const formClass = (modal === "login" ? "signup-link" : "signup-link")
    let formClass;
    let submitButtonText;
    if (modal === 'login') {
        formClass = "signup-link"
        submitButtonText = "Start Sparkling for Free"
    }

    if (modal === 'signup') {
        formClass = "signup-link"
        submitButtonText = "Login"
    }
    if (modal === 'interimSignup') {
        formClass = "interim-signup-link"
        submitButtonText = "CONTINUE"
    }

    let text;
    if (modal === "login") text = ""
    if (modal === "signup") text = "Already sparkling?"

    let modalForm;
    if (modal === 'login') modalForm = <LoginForm />
    if (modal === 'signup') modalForm = <SignupForm email={email} setEmail={setEmail}/>
    if (modal === 'interimSignup') modalForm = <InterimSignUp email={email} setEmail={setEmail}/>

    
    return (
        <>            
            <button className={buttonClass} onClick={handleClick}>{buttonText}</button>

            <ul className="errors">
                {errors.map(error => {
                    return (
                        <li className="error" key={error}>{error}</li>
                    )
                })}
            </ul>
            
            {showModal &&
                // <Modal onClose = {() => setShowModal(false)} type={modalType}>
                // <Modal onClose = {() => setShowModal(false)} type={modal}>
                <Modal onClose = {handleClose} type={modal}>

                    {/* <div id="modal-contents"> */}
                        <div id="main-contents">
                            {/* {modal === 'login' ? <LoginForm /> : <SignupForm />} */}
                            {modalForm}
                            
                            <div className="button-links">
                                <div className="button-text">
                                    <p id="text">{text}</p>
                                    <button 
                                        // className={formClass} onClick={toggleModal}>{modal === 'login' ? "Start Sparkling for Free" : "Log in"}
                                        className={formClass} onClick={toggleModal}>{submitButtonText}
                                    </button>
                                </div>
                                <div className="second-button">
                                    {modal === "interimSignup" ? <p className="login-m-text">Already Sparkling?</p> : <></>}
                                    {modal === "interimSignup" ? <button id="login-m-link" className="signup-link" onClick={otherToggleModal}>Log In</button> : <></>}
                                </div>
                            </div>
                        </div>

                        <div className={classText} id="sidebar-contents">
                            {/* <div  id="sidebar"> */}
                                    <div className="sidebar-links">
                                        <a className="sidebar-a" target="_blank" href="mailto:cooperadina@gmail.com?subject='Love your work!'&body='Really enjoyed looking at your work. Would love to set up a time to talk.'">
                                            <i id="sidebar-email" className="fa-regular fa-envelope"></i>
                                        </a>
                                    </div>
                                    <div className="sidebar-links">
                                        <a className="sidebar-a" target="_blank" href="https://www.linkedin.com/in/adina-cooper/">
                                            <i id="sidebar-linkedin" className="fa-brands fa-linkedin"></i>
                                        </a>
                                    </div>
                                    <div className="sidebar-links">
                                        <a className="sidebar-a" target="_blank" href="https://github.com/arcoop">
                                            <i id="sidebar-github" className="fa-brands fa-github"></i>
                                        </a>
                                    </div>
                            {/* </div> */}
                        </div>



                </Modal>
            }
        </>
    )
}

export default FormModal;