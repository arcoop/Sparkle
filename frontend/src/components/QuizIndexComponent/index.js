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

    const quizzes = useSelector(getQuizzes) || []

    const sessionUser = useSelector(state => state.session.user) || {}

    // const sortQuizzesByDate = () => {
    //     let sorted = false
    //     while (!sorted) {
    //         sorted = true
    //         for (let i = 0; i < sortedQuizzes.length; i++) {
    //             if (sortedQuizzes[i].createdAt < sortedQuizzes[i + 1].createdAt) {
    //                 let temp = sortedQuizzes[i]
    //                 sortedQuizzes[i] = sortedQuizzes[i + 1]
    //                 sortedQuizzes[i + 1] = temp;
    //                 sorted = false;
    //             }
    //         }
    //     }
    //     console.log(sortedQuizzes)
    //     return sortedQuizzes;
    // }

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
                <div id='index-header'>
                    <h1 className='quiz-index-heading'>All Quizzes</h1>
                </div>
                <div id="index-content-container">
                    <div id='index-center-content'>
                        {/* <div id='quizzes-by-category'></div> */}
                        <ul id='quizzes-list'>
                            {quizzes.map(quiz => {
                                return (
                                    <li key={quiz.id} className='quiz-index-list-item'>
                                        <QuizTile quiz={quiz} author={quiz.author}/>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default QuizIndex;