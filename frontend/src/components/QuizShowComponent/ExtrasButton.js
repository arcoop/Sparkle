import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteQuiz } from "../../store/quizzes";

const ExtrasButton = ({author, quiz}) => {
    const [showMenu, setShowMenu] = useState(false)
    const history = useHistory()

    const dispatch = useDispatch();

    const openMenu = () => {
        if (!showMenu) setShowMenu(true)
    }

    const sessionUser = useSelector(state => state.session.user ) || {} 

    const handleEditClick = () => {
        history.push(`/create/edit/${quiz.id}`)
    }

    const signedInMenu = (
        <ul className="quiz-extras-menu">
            <li className="quiz-menu-list-item">
                <button onClick={handleEditClick}  id="quiz-menu-edit-button" className="quiz-menu-button">
                    <i className="fa-regular fa-pen-to-square"></i>
                    <p>Edit</p>
                </button>
            </li>
            <li className="quiz-menu-list-item">
                <button onClick={() => dispatch(deleteQuiz(quiz.id)) } className="quiz-menu-button" id="quiz-menu-delete-button">
                    <i className="fa-regular fa-trash-can"></i>
                    <p>Delete</p>
                </button>
            </li>
            <li className="quiz-menu-list-item">
                <button className="quiz-menu-button">
                    <i className="fa-regular fa-heart"></i>
                    <p>Favorite</p>
                </button>
            </li>
        </ul>
    )

    const signedOutMenu = (
        <ul className="quiz-extras-menu">
            <li className="quiz-menu-list-item">
                <button className="quiz-menu-button">
                    <i className="fa-regular fa-heart"></i>
                    <p>Favorite</p>
                </button>
            </li>
        </ul>
    )

    const menu = sessionUser.id === author.id ? signedInMenu : signedOutMenu

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
            <div id="quiz-menu">
                <button className="quiz-extras-button"><i className="fa-solid fa-ellipsis"></i></button>
                {menu}
            </div>
        )
    } else {
        return (
            <div id="quiz-menu">
                <button onClick={openMenu} className="quiz-extras-button"><i className="fa-solid fa-ellipsis"></i></button>
            </div>
        )
    }
}

export default ExtrasButton;