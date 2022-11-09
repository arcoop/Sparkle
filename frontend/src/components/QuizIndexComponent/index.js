import './QuizIndex.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchQuizzes, getQuizzes } from '../../store/quizzes';
import Footer from '../Navigation/Footer';
import QuizTile from '../QuizTileComponent';
import Navigation from '../Navigation';
import { fetchUsers } from '../../store/users';
import QuizCarousel from '../QuizCarouselComponent/QuizCarousel';

const QuizIndex = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchQuizzes())
        dispatch(fetchUsers())
        document.title = "Sparkle!"
    }, [])

    const quizzes = useSelector(state => Object.values(state.quizzes))

    const sortedQuizzesByDate = quizzes.slice().sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)

    const quizzesSortedByName = quizzes.slice().sort((a, b) => a.title < b.title ? -1 : 1)

    const sessionUser = useSelector(state => state.session.user) || {}

    const users = useSelector(state => (state.users))

    const categories = useSelector(state => state.categories)

    let topDivText;

    if (sessionUser.id) {
        topDivText = <div>Welcome, <Link id="home-page-user-link" to={`/users/${sessionUser.id}`}>{sessionUser.username}</Link>!</div>
    } else {
        topDivText = <div>Welcome to the world’s largest quiz community. Play a quiz or create your own. A sparkle shines in everyone!</div>
    }
    
    return ( quizzes &&
        <div className='page-wrapper'>
            <Navigation />
            <div id='index-page'>
                <div id="top-of-page">
                    {topDivText}
                </div>
                <div className='quiz-index-carousel'>
                    <QuizCarousel quizzes={quizzes}/>
                </div>
                <div id="index-content-container">
                    <div className='quiz-index-col' id='quiz-index-left-col'>
                            <h1 className='quiz-index-heading'>New Published Quizzes</h1>
                            <div id='main-new-quiz'>
                                <QuizTile quiz={sortedQuizzesByDate[0]} type="large"/>
                            </div>
                            <div className='new-quizzes-line-break'></div>
                            <div id='other-new-quizzes'>
                                {sortedQuizzesByDate.slice(1).map(quiz => {
                                    return (
                                        <QuizTile key={quiz.id} quiz={quiz} type="medium" />
                                    )
                                })}
                            </div>
                    </div>
                    <div className='quiz-index-col' id='quiz-index-right-col'>
                        {quizzesSortedByName.map(quiz => {
                            return (
                                <Link to={`/quizzes/${quiz.id}`} className='index-page-small-div'>
                                    <div className='small-div-left'>
                                        <div className='small-div-quiz-title'>{quiz.title}</div>
                                        <div className='small-div-author'>by {users[quiz.authorId].username}</div>
                                        <div className='small-div-cat-time'>
                                            <div className='small-div-cat'>{categories[quiz.categoryId].name}</div>
                                            <div className='small-div-time'>{quiz.quizTimer}m</div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <div className='small-div-image'>
                                        {quiz.iconUrl ? <img className='small-div-quiz-icon' src={quiz.iconUrl} alt="" /> : <img className="small-div-quiz-icon" src="https://cdn.writermag.com/2019/03/question-marks.jpg" alt="" />}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <div id='index-center-content'>                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default QuizIndex;