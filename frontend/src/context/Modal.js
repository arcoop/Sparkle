import React, { useContext, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom";
import './Modal.css'

const ModalContext = React.createContext();

export const ModalProvider = ({...props}) => {
    const [value, setValue] = useState("")
    const modalRef = useRef()

    useEffect(() => {
        setValue(modalRef.current)
    }, [])

    return (
        <>
            <ModalContext.Provider value={value} >
                {props.children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export const Modal = ({onClose, type, children}) => {
    const modalNode = useContext(ModalContext)
    if (!modalNode) return null
    
    //(type === "signup" ? "modal-content-signup" : "modal-content-login")

    let divId;
    let backgroundId;
    if (type === "signup") {
        divId = "modal-content-signup"
        backgroundId = "modal-background"
    }
    if (type === "login") {
        divId = "modal-content-login" 
        backgroundId = "modal-background"
    }
    if (type === "interimSignup") {

        divId = "modal-content-interim"
        backgroundId = "modal-background"
    }

    if (type === "quizPaused") {
        divId = "modal-paused"
        backgroundId = "modal-paused-background"
    }

    return ReactDOM.createPortal(
        <div id="modal">
            <div id={backgroundId}
                onClick={onClose}>
            </div>

            <div id={divId}>
                {children}
            </div>

        </div>,
        modalNode
    )

}
