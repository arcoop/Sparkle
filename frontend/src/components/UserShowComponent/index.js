import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser, getUser } from '../../store/users';
import './UserShow.css'


const UserShow = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    
    useEffect(() => {
        dispatch(fetchUser(id))
    },[id])

    let user = useSelector(getUser(id)) || {username: "username...", email: "email..."}

    
    return (
        <div id="users-show-page">

            <div id="show-page-top-section">
                <div id='show-page-icon'>
                    <i id="show-page-prof-icon" className="fa-regular fa-user"></i>
                </div>
                <div id='user-show-page-info'>
                    <div id='username-and-edit'>
                        <h2 id='username'>{user.username}</h2>
                        <button id='edit-button'>Edit button</button>
                    </div>
                    <div id='show-page-top-info'>
                        <p>Online</p>
                        <p>User since</p>
                    </div>
                </div>
            </div>

            <div id='users-show-page-bottom-section'>
                <div id="show-page-stats-row">
                    stats
                </div>

                <div id='main-user-profile'>
                    <div id="show-page-left-bar">
                        left bar
                    </div>

                    <div id="show-page-middle">
                        middle section
                    </div>

                    <div id="show-page-right-bar" >
                        right bar
                    </div>
                </div>

            </div>

        </div>
    )

}

export default UserShow;