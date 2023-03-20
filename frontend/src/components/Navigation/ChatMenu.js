import { useState } from "react";
import "./ChatMenu.css"

const ChatMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    
    const toggleMenu = () => {
        if (!showMenu) {
            setShowMenu(true)
        } else setShowMenu(false)

    }

    if (showMenu) {
        return (
            <div>
                <div>
                    <i className="fa-solid fa-comment-dots" onClick={toggleMenu}></i>
                </div>
                <div className="chat-box">
                    <div className="chat-head">
                        <div className="chat">
                            Chat
                        </div>
                        <div onClick={() => setShowMenu(false)}>x-button</div>
                    </div>
                    <div>
                        Chat Room List
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <i className="fa-solid fa-comment-dots" onClick={ toggleMenu }></i>
            </div>
        )
    }
}
export default ChatMenu;