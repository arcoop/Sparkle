import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import * as sessionActions from '../../store/session'
import { Redirect } from "react-router-dom";
import './Navigation.css'
import { Link } from "react-router-dom";
// import LoginFormModal from "../LoginFormModal";
import React from "react";
import FormModal from "../AuthFormComponent";


const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) {
        return (
            <div className="navbar">
                <div className="nav-link-items">
                        <Link className="navLinks" to="/" id="home-link">
                                <i className="fa-solid fa-house-chimney" id="home-button"></i> 
                                <p>QUIZZES</p>
                        </Link>
                        <Link className="navLinks" to={'/create'} id="quiz-create-link">
                                <p id="quiz-creation">QUIZ CREATION</p>
                        </Link>
                </div>

                    <div className="profile-button">
                        <ProfileButton user={sessionUser}/>
                    </div>
            </div>
        )
    } else {
        return (
            <div className="navbar">
               <Redirect to='/'/>
                <div className="nav-link-items">
                        <Link className="navLinks" to="/" id="home-link">
                                <i className="fa-solid fa-house-chimney" id="home-button"></i> 
                                <p>QUIZZES</p>
                        </Link>
                        <Link className="navLinks" to={'/create'} id="quiz-create-link">
                                <p id="quiz-creation">QUIZ CREATION</p>
                        </Link>
                </div>

                <div className="loginsignup">
                    <FormModal />
                </div>
            </div>
        )
    }
}

export default Navigation;