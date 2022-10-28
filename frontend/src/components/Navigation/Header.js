import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect, useHistory } from "react-router-dom"
import { fetchQuiz, fetchQuizzes, getQuizzes } from "../../store/quizzes"
import './Header.css'
import CategoriesIndex from "../CategoryIndexComponent"


const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false)
    const [randomQuiz, setRandomQuiz] = useState(false)
    
    const openMenu = () => {
        if (!showMenu) setShowMenu(true)
    }

    const menu = (
        showMenu ? <div className="categories-menu"><h2 className="categories-menu-heading">All Categories</h2><CategoriesIndex /> </div> : <></>
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

    const quizIds = useSelector(state => Object.keys(state.quizzes))
    
    console.log('quizids')
    console.log(quizIds)
    let quizId;
    let idx;
    
    const handleClick = () => {
        setRandomQuiz(true)
        idx = Math.floor(Math.random() * quizIds.length)
        console.log('idx')
        console.log(idx)
        quizId = parseInt(quizIds[idx])
        // console.log(quizId)
        // console.log(quiz)
        // console.log(quiz.id)
        history.push(`/quizzes/${quizId}`)
        setRandomQuiz(false)
    }
    
    useEffect(() => {
        dispatch(fetchQuizzes())
    }, [randomQuiz])
    
    // useEffect(() => {
    //     dispatch(fetchQuiz(quizId))
    //     // console.log("dispatching")
    //     // dispatch(fetchQuizzes())
    //     // console.log("done dispatching")
    // }, [quizId])

   return (
        <div>
            <div id="main-div">
                <div id="left-nav">
                    <div id="extras">
                        <button onClick={openMenu} id="headers-extras-button">
                            <i className="fa-solid fa-bars"></i>
                        </button>
                        {menu}
                    </div>
                    <Link id="nav-home-link" to="/">
                        <div className="icon">
                            <i id="nav-home-link-icon" className="ri-lightbulb-flash-fill"></i>
                        </div>
                        <p className="nav-home-link-text">sparkle</p>
                    </Link>
                    <div id="nav-links-left">
                        <Link className="left-nav-link" to='/categories'>Categories</Link>
                        {/* <Link className="left-nav-link" to='/'>Badges</Link> */}
                        {/* <Link className="left-nav-link" to='/'>Playlists</Link> */}
                        {/* <Link className="left-nav-link" to='/'>Events</Link> */}
                        <Link className="left-nav-link" to='/create'>Create</Link>
                        {/* <Link className="left-nav-link" to='/'>Quiz Lab</Link> */}
                    </div>
                </div>
                <div id="nav-buttons-right">
                    <button className="submit-button" id="right-nav-button" onClick={handleClick}>Random Quiz</button>
                    {/* <button id="search-button">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button> */}
                    
                </div>
            </div>

        </div>
    )

}

export default Header;