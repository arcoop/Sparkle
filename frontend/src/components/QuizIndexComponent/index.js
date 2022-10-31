import './QuizIndex.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchQuizzes, getQuizzes } from '../../store/quizzes';
import Footer from '../Navigation/Footer';
import QuizTile from '../QuizTileComponent';
import Navigation from '../Navigation';
import { fetchUsers } from '../../store/users';

const QuizIndex = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchQuizzes())
        dispatch(fetchUsers())
        document.title = "Sparkle!"
    }, [])

    const quizzes = useSelector(state => Object.values(state.quizzes)) || []

    const sortedQuizzesByDate = quizzes.slice().sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)

    const sessionUser = useSelector(state => state.session.user) || {}

    let topDivText;

    if (sessionUser.id) {
        topDivText = <div>Welcome, <Link id="home-page-user-link" to={`/users/${sessionUser.id}`}>{sessionUser.username}</Link>!</div>
    } else {
        topDivText = <div>Welcome to the world’s largest quiz community. Play a quiz or create your own. A sparkle shines in everyone!</div>
    }
    
    return (
        <div className='page-wrapper'>
            <Navigation />
            <div id='index-page'>
                <div id="top-of-page">
                    {topDivText}
                </div>
                <div className='quiz-index-carousel'>Quizzes carousel</div>
                <div id="index-content-container">
                    <div id='quiz-index-left-col'>
                        <div id='quiz-index-left-top'>
                            <h1 className='quiz-index-heading'>New Published Quizzes</h1>
                            <div id='main-new-quiz'>
                                <QuizTile quiz={sortedQuizzesByDate[0]} type="large"/>
                            </div>
                            <div id='other-new-quizzes'>
                                <QuizTile quiz={sortedQuizzesByDate[1]}  type="small"/>
                                <QuizTile quiz={sortedQuizzesByDate[2]}  type="small"/>
                            </div>
                        </div>
                        <div id='quiz-index-left-bottom'>Other Quizzes
                            <ul id='quizzes-list'>
                                {quizzes.map(quiz => {
                                    return (
                                        <li key={quiz.id} className='quiz-index-list-item'>
                                            <QuizTile quiz={quiz} author={quiz.authorId} type="medium"/>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                    </div>
                    <div id='quiz-index-right-col'>

                    </div>
                    <div id='index-center-content'>
                        {/* <div id='quizzes-by-category'></div> */}
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default QuizIndex;