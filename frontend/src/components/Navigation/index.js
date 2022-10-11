import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import * as sessionActions from '../../store/session'
import { Redirect } from "react-router-dom";
import './Navigation.css'
import { Link } from "react-router-dom";
// import LoginFormModal from "../LoginFormModal";
import React from "react";
import FormModal from "../FormComponent";


const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) {
        return (
            <div className="navbar">
                <div className="nav-link-items">
                        <Link className="navLinks" to="/">
                            <div className="home-link">
                                <i className="fa-solid fa-house-chimney" id="home-button"></i> 
                                <p>QUIZZES</p>
                            </div>
                        </Link>
                        <Link className="navLinks" to='/'>QUIZ CREATION</Link>
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
                <Link className="navLinks" to="/">
                            <div className="home-link">
                                <i className="fa-solid fa-house-chimney" id="home-button"></i> 
                                <p>QUIZZES</p>
                            </div>
                        </Link>
                    <Link className="navLinks" to='/'><p>QUIZ CREATION</p></Link>
                    
                </div>
                <div className="loginsignup">
                    <FormModal />
                </div>
            </div>
        )
    }
}

export default Navigation;