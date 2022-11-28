import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect, useHistory, useLocation } from "react-router-dom"
import { fetchQuiz, fetchQuizzes, fetchRandomQuizID, getQuizzes } from "../../store/quizzes"
import './Header.css'
import CategoriesIndex from "../CategoryIndexComponent"
import SearchBar from "./SearchBar"


const Header = () => {
    const location = useLocation()
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(0)
    const [randomQuiz, setRandomQuiz] = useState(false)
    
    // 0 = no menu
    // 1 = hamburger
    // 2 = search
    // 3


    const openMenu = (menu) => {
        if (showMenu !== menu) {
            setShowMenu(menu)
        } else {
            setShowMenu(0)
        }
    }

    const hamburgerMenu = (
        showMenu === 1 ? <div className="categories-menu"><h2 className="categories-menu-heading"><Link to="/categories">Quiz Categories</Link></h2><CategoriesIndex /> </div> : <></>
    )

    const searchMenu = (
        showMenu === 2 ? <div className="search-bar-menu"> <SearchBar /></div> : <></>
    )

    useEffect(() => {
        const closeMenu = () => {
            setShowMenu(0)
        }

        if (showMenu === 1) {
            document.addEventListener("click", closeMenu)
        }

        return () => {
            document.removeEventListener("click", closeMenu)
        }
    }, [showMenu])

    const handleClick =  async () => {
        const randomQuizId = await dispatch(fetchRandomQuizID())
        history.push(`/quizzes/${randomQuizId}`)
    }

   return (
        <div>
            <div id="main-div">
                <div id="left-nav">
                    <div id="extras">
                        <button onClick={() => openMenu(1)} id="headers-extras-button">
                        {showMenu === 1 ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-bars"></i> }
                        </button>
                        {hamburgerMenu}
                    </div>
                    <Link id="nav-home-link" to="/quizzes">
                        <div className="icon">
                            <i id="nav-home-link-icon" className="ri-lightbulb-flash-fill"></i>
                        </div>
                        <p className="nav-home-link-text">sparkle</p>
                    </Link>
                    <div id="nav-links-left">
                        <Link className="left-nav-link" to='/categories'>Categories</Link>
                        <Link className="left-nav-link" to='/create'>Create</Link>
                        <a target="_blank" className="left-nav-link" href="https://adina-cooper.com/">Adina Cooper</a>
                    </div>
                </div>
                <div id="nav-buttons-right">
                    <button onClick={handleClick} className="submit-button" id="right-nav-button">Random Quiz</button>
                    <button onClick={() => openMenu(2)} id="search-button">
                        {showMenu === 2 ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-magnifying-glass"></i> }
                    </button>
                </div>
                {searchMenu}
            </div>


        </div>
    )

}

export default Header;