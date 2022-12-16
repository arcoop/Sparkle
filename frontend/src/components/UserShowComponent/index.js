import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUser, fetchUsers, getUser } from '../../store/users';
import './UserShow.css'
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import Footer from '../Navigation/Footer';
import { fetchQuizTakesbyUser, getQuizTakes } from '../../store/quizTakes';
import { fetchQuizzes, getQuizzes } from '../../store/quizzes';
import { useState } from 'react';

const UserShow = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const sessionUser = useSelector(state => state.session.user)
    
    useEffect(() => {
        dispatch(fetchUser(id))
        dispatch(fetchQuizzes())
        dispatch(fetchQuizTakesbyUser(id))
    },[id])

    // let user = useSelector(getUser(id)) || {username: "username...", email: "email..."}
    let user = useSelector(state => state.users[id]) || {username: "username...", email: "email..."}

    const quizTakes = useSelector(state => Object.values(state.quizTakes))
    quizTakes.sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)

    // let userQuizTakes = []
    // quizTakes.forEach(take => {
    //     if (take['takerId'] == id) {
    //         userQuizTakes.push(take)
    //     }
    // })

    useEffect(() => {
        document.title = `${user.username}'s Sparkle Profile`
    }, [user])

    const quizzes = useSelector(getQuizzes)
    
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

    const formatTime = date => {
     
        const start = new Date(date)
      
        const now = new Date()

        let timeText; 
        let finalTimeDiff;
        let elapsedTime = now - start
        elapsedTime /= 1000
        if (Math.round(elapsedTime / 86400) >= 1) {
            finalTimeDiff = Math.round(elapsedTime /= 86400)
            timeText = finalTimeDiff === 1 ? "day" : "days"
        } else if (Math.round(elapsedTime / 3600) >= 1){
            finalTimeDiff = Math.round(elapsedTime /= 3600)
            timeText = finalTimeDiff === 1 ? "hour" : "hours"
        } else {
            finalTimeDiff = Math.round(elapsedTime / 60)
            timeText = finalTimeDiff === 1 ? "minute" : "minutes"
        }
    
        return `${finalTimeDiff} ${timeText} ago`
    }

    const [playsTabClass, setPlaysTabClass] = useState("user-profile-tab")
    const [quizzesTabClass, setQuizzesTabClass] = useState("hide")
    const [playsButton, setPlaysButton] = useState("button-active")
    const [quizzesButton, setQuizzesButton] = useState("user-profile-tab-button")

    const handleClick = (tab) => {
       if (tab === "plays") {
        setPlaysTabClass("user-profile-tab")
        setQuizzesTabClass('hidden')
        setQuizzesButton("user-profile-tab-button")
        setPlaysButton("button-active")
       } else if (tab === "quizzes") {
        setQuizzesTabClass("user-profile-tab")
        setPlaysTabClass("hidden")
        setPlaysButton("user-profile-tab-button")
        setQuizzesButton("button-active")
       }
    }

    let onlineStatus;
    if (sessionUser) {
        onlineStatus = 
        <div id='online'>
            <i id="online-circle" className="fa-solid fa-circle"></i>
            <p>Online</p>
        </div>
    }  else onlineStatus = ""

    const ShowQuizzesAuthored = () => {
        if (user.quizzesAuthored) {
            return (
                <ul className='quizzes-created-list'>
                    {user.quizzesAuthored.map((quiz, idx) => {
                        return (
                            <li key={(quiz.id+idx + 1)*idx+1} className='quizzes-created-link'><Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link></li>
                        )
                    })}
                </ul>
            )
        } else {
            return <></>
        }
    } 

    return (user &&
        <div className='page-wrapper'>
            <Navigation />
            <div id="users-show-page">
                <div id="show-page-top-section">
                    <div id='show-page-icon'>
                        <i id="show-page-prof-icon" className="fa-regular fa-user"></i>
                    </div>
                    <div id='user-show-page-info'>
                        <div id='username-and-edit'>
                            <h2 id='username'>{user.username}</h2>
                            {/* <button id='edit-button'>Edit Profile</button> */}
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
                <div id='main-user-profile'>
                    <div  id='profile-bar-container'>
                        <div id="show-page-profile-bar">
                            <div id='profile-header'>Profile</div>
                            <div className='user-prof-tab'>
                                <button id='user-plays-tab-button' className={playsButton} onClick={() => handleClick('plays')}>Plays</button>
                                <button id='user-quizzes-tab-button'className={quizzesButton} onClick={() => handleClick('quizzes')}>Quizzes</button>
                            </div>
                        </div>
                    </div>
                    <div id='user-quiz-plays' className={playsTabClass}>
                        <table className='quiz-takes-table'>
                            <tbody className='quiz-takes-table-body'>
                                <tr className='quiz-takes-heading-row'>
                                    <th className='quiz-takes-heading'>Quiz</th>
                                    <th className='quiz-takes-heading'>Time Taken</th>
                                    <th className='quiz-takes-heading'>Score</th>
                                </tr>
                                {quizTakes.map((take, idx) => {
                                    if (quizzes[take.quizId -1]) {
                                        return (
                                            <tr key={idx*idx} className='quiz-takes-row'>
                                                <td className='quiz-takes-data'><Link className='quiztake-link' to={`/quizzes/${quizzes[take.quizId -1].id}`}>{quizzes[take.quizId -1].title}</Link></td>
                                                <td className='quiz-takes-data'>{formatTime(take.createdAt)}</td>
                                                <td className='quiz-takes-data'>{take.score}</td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div id='user-quizzes-created' className={quizzesTabClass}>
                        <h2 className='tab-heading'>Quizzes Created</h2>
                        <ShowQuizzesAuthored />
                    </div>
                </div>
            
            
            </div>
            <Footer />
        </div>
    )

}

export default UserShow;