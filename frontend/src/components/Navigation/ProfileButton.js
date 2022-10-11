import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/session";
import '../Navigation/Navigation.css'

const ProfileButton = ({user}) => {
    
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()


    const openMenu = () => {
        if (!showMenu) setShowMenu(true)
    }

    const menu = (
        <ul className="menu">
            <li className="menu-list-item" id="user-profile">
                <Link to={`/users/${user.id}`}>{user.username}</Link>
            </li>
           <li className="menu-list-item"><button id="logout-button" onClick={() => {dispatch(logout())}}>Logout</button></li>
        </ul>
    )

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
        <> 
            <div>
                <i className="fa-solid fa-circle-user"
                    onClick={openMenu}
                ></i>
                {menu}
            </div>

        </>
       )
    } else {
        return (
            <> 
                <div>
                <i className="fa-solid fa-circle-user"
                        onClick={openMenu}
                    ></i>
                </div>
            </>
        )
    }
}

export default ProfileButton;