import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import * as sessionActions from '../../store/session'
import { Redirect } from "react-router-dom";
import './Navigation.css'
import { Link } from "react-router-dom";
// import LoginFormModal from "../LoginFormModal";
import React from "react";
import FormModal from "../AuthFormComponent";
import Header from "./Header";


const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)

    const leftNav = (
        <div className="left-nav">
            <div className="nav-link-items">
                <Link className="navLinks" to="/" id="home-link">
                    <i className="fa-solid fa-house-chimney" id="home-button"></i> 
                    <p>quizzes</p>
                </Link>
                <Link to="/">
                    <p>events</p>
                </Link>
                <div className="line-break" id="nav-line-break"></div>
                <Link className="navLinks" to={'/create'} id="quiz-create-link">
                        <p id="quiz-creation">quiz creation</p>
                </Link>
                <Link to="/">
                    <p>community</p>
                </Link>
                <Link to="/">
                    <p>videos</p>
                </Link>
                <Link to="/">
                    <p>sparklecon</p>
                </Link>
            </div>
        </div>
    )

    let rightNav;
    if (sessionUser) {
        rightNav = (
            <div className="right-nav">
                <div className="profile-button">
                    <ProfileButton user={sessionUser}/>
                </div>
                {/* <Redirect to='/'/> */}
            </div>
        )
    } else {
        rightNav = (
            <div className="loginsignup">
                <FormModal />
            </div>
        )
    }

    return (
        <div className="header-div">
            <div className="navbar">
                {leftNav}
                {rightNav}
            </div>
            <div className="inner-header">
                <Header />
            </div>
        </div>
    )
}

export default Navigation;