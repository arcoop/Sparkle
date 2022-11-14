import './QuizIndex.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchQuizzes, getQuizzes } from '../../store/quizzes';
import Footer from '../Navigation/Footer';
import QuizTile from '../QuizTileComponent';
import Navigation from '../Navigation';
import { fetchUsers } from '../../store/users';
import QuizCarousel from '../QuizCarouselComponent/QuizCarousel';
import { fetchQuizTakes, fetchSortedQuizTakes, getUsersQuizTakes } from '../../store/quizTakes';

const QuizIndex = () => {
    const dispatch = useDispatch();
    const [sortedQuizTakes, setSortedQuizTakes] = useState()
    const [recentQuizTakes, setRecentQuizTakes] = useState()
    
    const sessionUser = useSelector(state => state.session.user) || {}

    useEffect(() => {
        const getQuizTakes = async () => {
            setSortedQuizTakes(await dispatch(fetchSortedQuizTakes()))
        } 
        const getCurrentUserQuizTakes = async () => {
            if (sessionUser.id) setRecentQuizTakes(await dispatch(getUsersQuizTakes(sessionUser.id)))
        }

        const getRecentQuizTakes = async () => {
            setRecentQuizTakes(await dispatch(fetchQuizTakes()))
        }

        dispatch(fetchQuizzes()).then(() => {
            getQuizTakes()
            if (sessionUser.id) {
                getCurrentUserQuizTakes()
            } else getRecentQuizTakes()
        })
        document.title = "Sparkle!"
       
    }, [])

    const quizzes = useSelector(state => state.quizzes) 

    const quizzesArr = Object.values(quizzes)

    const sortedQuizzesByDate = quizzesArr.slice().sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)

    const quizzesSortedByName = quizzesArr.slice().sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)

    // const users = useSelector(state => state.users)

    // const categories = useSelector(state => state.categories)

    const categories = [
        [0,"no category chosen"],
        [1, "Entertainment"],
        [2, "Gaming"], 
        [3, "Geography"],
        [4, "History"],
        [5, "Holiday"],
        [6, "Just For Fun"],
        [7, "Language"],
        [8, "Literature"],
        [9, "Miscellaneous"],
        [10, "Movies"],
        [11, "Music"],
        [12, "Religion"],
        [13, "Science"],
        [14, "Sports"],
        [15,"Television"]
    ]

    let topDivText;

    if (sessionUser.id) {
        topDivText = <div>Welcome, <Link id="home-page-user-link" to={`/users/${sessionUser.id}`}>{sessionUser.username}</Link>!</div>
    } else {
        topDivText = <div>Welcome to the world’s largest quiz community. Play a quiz or create your own. A sparkle shines in everyone!</div>
    }

    let recentQuizTakesDiv;
    if (recentQuizTakes && recentQuizTakes.length >= 1 ) recentQuizTakesDiv = <> 
        <div className='right-div-quizzes-list-heading'>Quizzes</div>
        {recentQuizTakes.map((quizTake, idx) => {
        return (quizzes &&
            <Link key={idx} className='popular-quiz-list-item-link' to={`/quizzes/${quizTake.quizId}`}>
                {/* <div className='popular-quiz-list-item num'>{quizzes[quizTake.quizId].category}</div> */}
                <div className='popular-quiz-list-item separator'></div>
                <div className='popular-quiz-list-item title'>{quizzes[quizTake.quizId].title}</div>
            </Link>
        )
        })}
    </>
    if (recentQuizTakes && recentQuizTakes.length < 1) recentQuizTakesDiv = <>
        No recently played quizzes!
        <br></br>
        Try one now!
    </>
    
    return (quizzes && quizzesArr && sortedQuizTakes && recentQuizTakes &&
        <div className='page-wrapper'>
            <Navigation />
            <div id='index-page'>
                <div id="top-of-page">
                    {topDivText}
                </div>
                <div className='carousel-and-index'>
                    <div className='quiz-index-carousel'>
                        <QuizCarousel quizzes={quizzesArr}/>
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
                        <div className='quiz-index-col' id='quiz-index-center-col'>
                            {quizzesSortedByName.map(quiz => {
                                return (
                                    <Link key={quiz.id} to={`/quizzes/${quiz.id}`} className='index-page-small-div'>
                                        <div className='small-div-left'>
                                            <div className='small-div-quiz-title'>{quiz.title}</div>
                                            <div className='small-div-author'>by {quiz.author.authorUsername}</div>
                                            <div className='small-div-cat-time'>
                                                <div className='small-div-cat'>{categories[quiz.category.categoryId][1]}</div>
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
                        <div className='quiz-index-col' id='quiz-index-right-col'>
                            <div id='popular-quizzes' className='index-page-div'>
                                <h3 className='right-div-quizzes-heading'>Most Popular</h3>
                                <div className='right-div-quizzes-list'>
                                    <div className='right-div-quizzes-list-heading'>Quizzes</div>
                                    {sortedQuizTakes.map((quizTake, idx) => {
                                        return (
                                            <Link key={quizTake.id} className='popular-quiz-list-item-link' to={`/quizzes/${quizTake.id}`}>
                                                <div className='popular-quiz-list-item num'>{idx + 1}</div>
                                                <div id='popular-quiz-list-separator' className='popular-quiz-list-item separator'></div>
                                                <div className='popular-quiz-list-item title'>{quizTake.title}</div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                            <div id='recently-played-quizzes' className='index-page-div'>
                                <h3 className='right-div-quizzes-heading'>{sessionUser.id ? "Your Recently Played Quizzes" : "Recently Played Quizzes"}</h3>
                                <div className='right-div-quizzes-list'>
                                   {recentQuizTakesDiv}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default QuizIndex;