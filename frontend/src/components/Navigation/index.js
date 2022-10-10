import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/session";
import ProfileButton from "./ProfileButton";
import * as sessionActions from '../../store/session'

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    if (sessionUser) {
        return (
            <>
                <ul>
                    <Link to='/'>Home</Link>
                    <button onClick={() => {dispatch(logout)}}>Logout</button>
                </ul>
                <ProfileButton />
            </>
        )
    } else {
        return (
            <>
            <ul>
                <Link to='/login'>Log In</Link>
                <Link to='/signup'>Sign Up</Link>
            </ul>
            </>
        )
    }
}

export default Navigation;