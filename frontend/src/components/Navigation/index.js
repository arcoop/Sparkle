import { useDispatch, useSelector } from "react-redux";
// import {  NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import ProfileButton from "./ProfileButton";
import * as sessionActions from '../../store/session'
import { Redirect } from "react-router-dom";
import './Navigation.css'
import { Link } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import React from "react";


const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) {
        return (
            <div className="navbar">
                <ul>
                    <Link to="/"><i className="fa-solid fa-house-chimney" id="home-button"></i></Link>
                    <Link className="navLinks" to='/'> QUIZZES</Link>
                </ul>
                    <div className="profile">
                        <ProfileButton user={sessionUser}/>
                    </div>
                    {/* <button onClick={() => {dispatch(logout())}}>Logout</button> */}
            </div>
        )
    } else {
        return (
            <div className="navbar">
               <Redirect to='/'/>
                <ul>
                    <Link to="/"><i className="fa-solid fa-house-chimney" id="home-button"></i></Link>
                    <Link className="navLinks" to='/'> QUIZZES</Link>
                </ul>
                <div className="loginsignup">
                    <LoginFormModal />
                </div>
            </div>
        )
    }
}

export default Navigation;