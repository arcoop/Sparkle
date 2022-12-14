import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { logout } from "../../store/session";
import '../Navigation/Navigation.css'

const ProfileButton = ({user}) => {
    
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const openMenu = () => {
        if (!showMenu) setShowMenu(true)
    }

    const handleLogout = () => {
        if (location.pathname.includes("settings")) {
            dispatch(logout()).then(history.push('/quizzes'))
        } else dispatch(logout())
    }

    const menu = (
        <ul className="menu">
            <li  className="menu-list">
                <Link to={`/users/${user.id}`} id ="menu-username" className="menu-list-item">
                    <i id="menu-user-icon" className="fa-regular fa-user"></i>
                    <p id="user-username">{user.username}</p>
                </Link>
            </li>
            <li id="break"><hr id="horizontal-line" /></li>
           <li className="menu-list">
                <button className="menu-list-item" id="logout-button" onClick={handleLogout}>
                        <i id="logout-circle" className="ri-logout-circle-r-line"></i>
                        <p id="logout-text">Logout</p>
                </button>
            </li>
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
                <button className="profile-button" onClick={openMenu}>
                    <div id="outer-circle">
                        <i id="profile-circle" className="fa-regular fa-circle"></i>
                        <div id="inner-profile">
                            <i id="profile-user" className="fa-regular fa-user"></i>
                        </div>
                    </div>
                </button>
                {menu}
            </div>

        </>
       )
    } else {
        return (
            <> 
                <div>
                    <button className="profile-button" onClick={openMenu}>
                        <div id="outer-circle">
                            <i id="profile-circle" className="fa-regular fa-circle"></i>
                            <div id="inner-profile">
                                <i id="profile-user" className="fa-regular fa-user"></i>
                            </div>

                        </div>
                    </button>
                </div>
            </>
        )
    }
}

export default ProfileButton;