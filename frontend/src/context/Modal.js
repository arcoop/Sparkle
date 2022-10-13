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

    const divId = (type === "signup" ? "modal-content-signup" : "modal-content-login")

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background"
                onClick={onClose}>
            </div>

            <div id={divId}>
                {children}
            </div>

        </div>,
        modalNode
    )

}