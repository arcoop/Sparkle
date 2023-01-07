import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navigation from "../Navigation";
import UserEditProfile from "./UserEditProfile";
import './UserEditForm.css'
import { Link } from "react-router-dom";
import Footer from "../Navigation/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../../store/users";

const UserEditForm = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    // const [saveChangesButton, setSaveChangesButton] = useState("no-changes")
    const sessionUser = useSelector(state => state.session.user)

    const user = useSelector(state => state.users ? state.users[sessionUser.id] : null)

    useEffect(() => {
        dispatch(fetchUser(sessionUser.id))
    }, [])

    return ( user &&
        <div className="page-wrapper">
            <Navigation />
            <div className="edit-page">
                <div className="top-spacer"></div>
                <h2 className="profile-page-heading">Settings: {location.pathname.slice(10,11).toUpperCase() + location.pathname.slice(11)} </h2>
                <div className="profile-page">
                    <div className="left-settings-div">
                        <h3 className="settings-div-header">Settings</h3>
                        <ul>
                            <li className={location.pathname.includes("profile") ? "settings-wrapper on" : "settings-wrapper"}>
                                <div className="settings-nav-item"><Link className="settings-li-link" to={'/settings/profile'}>Profile</Link></div>
                            </li>
                            <li className={location.pathname.includes("password") ? "settings-wrapper on" : "settings-wrapper"}>
                                <div className="settings-nav-item"><Link className="settings-li-link" to={'/settings/password'}>Password</Link></div>
                            </li>
                            <li className={location.pathname.includes("basic-info") ? "settings-wrapper on" : "settings-wrapper"}>
                                <div className="settings-nav-item"><Link className="settings-li-link" to={'/settings/basic-info'}>Basic Info</Link></div>
                            </li>
                        </ul>
                    </div>
                    <div className="right-settings-tab">
                        <UserEditProfile user={user}/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}
export default UserEditForm;