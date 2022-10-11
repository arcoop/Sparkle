import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import * as sessionActions from '../../store/session'
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
                <ul className="list-items">
                    <li className="list-item">
                        <Link to="/"><i className="fa-solid fa-house-chimney" id="home-button"></i></Link>
                    </li>
                    <li>
                        <Link className="navLinks" to='/'> QUIZZES</Link>
                    </li>
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
                <ul className="list-items">
                    <li className="list-item">
                        <Link to="/"><i className="fa-solid fa-house-chimney" id="home-button"></i></Link>
                    </li>
                    <li className="list-item" id="home-break"></li>
                    <li className="list-item">
                        <Link className="navLinks" to='/'> QUIZZES</Link>
                    </li>
                    <li className="break" id="line-break"></li>
                </ul>
                <div className="loginsignup">
                    <LoginFormModal />
                </div>
            </div>
        )
    }
}

export default Navigation;