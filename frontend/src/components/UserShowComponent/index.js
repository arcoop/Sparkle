import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUsers, getUser } from '../../store/users';
import './UserShow.css'
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Navigation/Footer';
const UserShow = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const sessionUser = useSelector(state => state.session.user)
    
    useEffect(() => {
        dispatch(fetchUsers(id))
    },[id])

    
    let user = useSelector(getUser(id)) || {username: "username...", email: "email..."}
    
    useEffect(() => {
        document.title = `${user.username}'s Sparkle Profile`
    }, [user])
    
    const formatDate = date => {
        const months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sept',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        }
        const fullDate = new Date(date)
        const month = months[fullDate.getMonth()];
        const day = fullDate.getDate();
        const year = fullDate.getFullYear();
        return `${month} ${day}, ${year}`
    }

    let onlineStatus;
    if (sessionUser) {
        onlineStatus = 
        <div id='online'>
            <i id="online-circle" className="fa-solid fa-circle"></i>
            <p>Online</p>
        </div>
    }  else onlineStatus = ""

    // const onlineId = sessionUser ? "online" : "offline"
    return (
        <div id="users-show-page">
            <Navigation />
            <div id="show-page-top-section">
                <div id='show-page-icon'>
                    <i id="show-page-prof-icon" className="fa-regular fa-user"></i>
                </div>
                <div id='user-show-page-info'>
                    <div id='username-and-edit'>
                        <h2 id='username'>{user.username}</h2>
                        <button id='edit-button'>Edit Profile</button>
                    </div>
                    <div id='show-page-top-info'>
                        {onlineStatus}
                        <div id='user-since'>
                            <i id='clock-icon' className="fa-solid fa-clock"></i>
                            <p>User since {formatDate(user.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id='users-show-page-bottom-section'>
                <div id="show-page-stats-row">
                    stats
                </div>

                <div id='main-user-profile'>
                    <div id="show-page-profile-bar">
                        <div id='profile-header'>Profile</div>
                        <ul>
                            <li className='prof-bar-list-item'>
                                <Link className='prof-bar-link'>Overview</Link> 
                            </li>
                            <li className='prof-bar-list-item'>
                                <Link className='prof-bar-link'>Plays</Link>
                            </li>
                            <li className='prof-bar-list-item'>
                                <Link className='prof-bar-link'>Stats</Link>
                            </li>
                            <li className='prof-bar-list-item'>
                                <Link className='prof-bar-link'>Quizzes</Link>
                            </li>
                        </ul>
                    </div>

                    <div id="show-page-middle">
                        middle section
                    </div>

                    <div id="show-page-right-bar" >
                        right bar
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )

}

export default UserShow;