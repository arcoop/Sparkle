import { Link } from "react-router-dom"
import './Header.css'

const Header = () => {
    return (
        <div id="main-div">
            <div id="left-nav">
                <div id="extras">
                    <button id="extras-button">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>
                <Link id="nav-home-link" to="/">
                    <div className="icon">
                        <i id="nav-home-link-icon" className="ri-lightbulb-flash-line"></i>
                    </div>
                    <p id="nav-home-link-text">sparkle</p>
                </Link>
                <div id="nav-links-left">
                    <Link className="left-nav-link" to='/'>Categories</Link>
                    <Link className="left-nav-link" to='/'>Badges</Link>
                    <Link className="left-nav-link" to='/'>Playlists</Link>
                    <Link className="left-nav-link" to='/'>Events</Link>
                    <Link className="left-nav-link" to='/'>Create</Link>
                    <Link className="left-nav-link" to='/'>Quiz Lab</Link>
                </div>
            </div>
            <div id="nav-buttons-right">
                <button className="submit-button" id="right-nav-button">Random Quiz</button>
                <button id="search-button">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </div>
    )

}

export default Header