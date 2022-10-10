import { useDispatch, useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";
import { logout } from "../../store/session";
import ProfileButton from "./ProfileButton";
import * as sessionActions from '../../store/session'
import { Redirect } from "react-router-dom";

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    if (sessionUser) {
        return (
            <>
                <ul>
                    <NavLink to='/'>Home</NavLink>
                    <button onClick={() => {dispatch(logout())}}>Logout</button>
                </ul>
                <ProfileButton />
            </>
        )
    } else {
        return (
            <>
               <Redirect to='/'/>
            <ul>
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
            </ul>
            </>
        )
    }
}

export default Navigation;