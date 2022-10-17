import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../store/comments";

const ExtrasButton = ({comment}) => {
    const [showMenu, setShowMenu] = useState(false)
    // const [hideButtonClass, setHideButtonClass] = useState("hide-button")
    // const [editButtonClass, setEditButtonClass] = useState("edit-button")
    const dispatch = useDispatch();

    const openMenu = () => {
        if (!showMenu) setShowMenu(true)
    }

    const sessionUser = useSelector(state => state.session.user)


    const signedInMenu = (
        <ul className="comments-menu">
            <li className="comment-menu-list-item">
                <button className="edit-button">Edit</button>
            </li>
            <li className="comment-menu-list-item">
                <button onClick={() => {dispatch(deleteComment(comment.id))}} className="delete-button">Delete</button>
            </li>
            <li className="comment-menu-list-item">
                <button className="hide-button">Hide</button>
            </li>
        </ul>
    )

    const signedOutMenu = (
        <ul className="comments-menu">
            <li className="comment-menu-list-item">
                <button className="hide-button">Hide</button>
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