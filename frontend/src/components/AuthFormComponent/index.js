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

    const handleClick = () => {
        setShowModal(true)
    }

    let classText;
    if (modal === 'signup') {
        classText = "show-sidebar"
    } else classText = "hidden"

    const modalType = (modal === "login" ? "login" : "signup")

    const formClass = (modal === "login" ? "signup-link" : "signup-link")

    const text = (
        (modal === 'signup' ? 'Already a sporcler?' : "")
    )
    
    return (
        <>            
            <button onClick={handleClick}>SIGN IN</button>
            
            {showModal &&
                <Modal onClose = {() => setShowModal(false)} type={modalType}>

                    {/* <div id="modal-contents"> */}
                        <div id="main-contents">
                            {modal === 'login' ? <LoginForm /> : <SignupForm />}
                            
                            <div className="button-links">
                                <div className="button-text">
                                    <p id="text">{text}</p>
                                    <button 
                                        className={formClass} onClick={toggleModal}>{modal === 'login' ? "Join Sparkle for Free" : "Log in"}
                                    </button>
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