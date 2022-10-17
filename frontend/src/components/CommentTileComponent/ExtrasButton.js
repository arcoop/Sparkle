import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/comments";
import './CommentTile.css'

const ExtrasButton = ({comment}) => {
    const [showMenu, setShowMenu] = useState(false)
    // const [hideButtonClass, setHideButtonClass] = useState("hide-button")
    // const [editButtonClass, setEditButtonClass] = useState("edit-button")
    const dispatch = useDispatch();

    const openMenu = () => {
        if (!showMenu) setShowMenu(true)
    }

    const sessionUser = useSelector(state => state.session.user)

    const SharedDiv = () => {
        return (
            <ul className="comment-menu">
            </ul>
        )
    }


    const signedInMenu = (
        <ul className="comment-menu">
            <li className="comment-menu-list-item">
                <button id="edit-button" className="menu-button">Edit</button>
            </li>
            <li className="comment-menu-list-item">
                <button onClick={() => {dispatch(deleteComment(comment.id))}} className="menu-button" id="delete-button">Delete</button>
            </li>
            <li> <button className="menu-button" id="hide-button">Hide</button></li>
        </ul>
    )

    const signedOutMenu = (
        <ul className="comment-menu">
            <li>
                <button className="menu-button" id="hide-button">Hide</button>
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