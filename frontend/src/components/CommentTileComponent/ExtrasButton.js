import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/comments";
import './CommentTile.css'

const ExtrasButton = ({stateChanger, comment}) => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch();
    const openMenu = () => {
        if (!showMenu) setShowMenu(true)
    }

    const sessionUser = useSelector(state => state.session.user) || {}

    const signedInMenu = (
        <ul className="comment-menu">
            <li className="comment-menu-list-item">
                <button onClick={() => stateChanger(true)} id="comment-edit-button" className="comment-menu-button">
                    <i class="fa-regular fa-pen-to-square"></i>
                    <p>Edit</p>
                </button>
            </li>
            <li className="comment-menu-list-item">
                <button onClick={() => dispatch(deleteComment(comment.id))} className="comment-menu-button" id="delete-button">
                    <i class="fa-regular fa-trash-can"></i>
                    <p>Delete</p>
                </button>
            </li>
            {/* <li className="comment-menu-list-item"> <button className="comment-menu-button" id="hide-button">Hide</button></li> */}
        </ul>
    )

    const signedOutMenu = (
        <ul className="comment-menu">
            <li className="comment-menu-list-item">
                <button className="comment-menu-button" id="hide-button">Hide</button>
            </li>
        </ul>
    )

    const menu = sessionUser.id === comment.commenterId ? signedInMenu : signedOutMenu

    useEffect(() => {
        const closeMenu = () => {
            setShowMenu(false)
        }
        if (showMenu) {
            document.addEventListener("click", closeMenu)
        }
        return () => {
            document.removeEventListener("click", closeMenu)
        }
    }, [showMenu])

    if (showMenu) {
        return (
            <div id="comment-menu">
                <button className="comment-extras-button"><i className="fa-solid fa-ellipsis"></i></button>
                {menu}
            </div>
        )
    } else {
        return (
            <div id="comment-menu">
                <button onClick={openMenu} className="comment-extras-button"><i className="fa-solid fa-ellipsis"></i></button>
            </div>
        )
    }
}

export default ExtrasButton;