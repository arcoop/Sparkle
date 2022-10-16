import './QuizIndex.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchQuizzes, getQuizzes } from '../../store/quizzes';
import { fetchUsers, getUsers } from '../../store/users';
import Navigation from '../Navigation';
import Footer from '../Navigation/Footer';

const QuizIndex = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchQuizzes())
        document.title = "Sparkle!"
    }, [])

    const quizzes = useSelector(getQuizzes)
    let sortedQuizzes = quizzes.slice()

    const sortQuizzesByDate = () => {
        let sorted = false
        while (!sorted) {
            sorted = true
            for (let i = 0; i < sortedQuizzes.length; i++) {
                if (sortedQuizzes[i].createdAt < sortedQuizzes[i + 1].createdAt) {
                    let temp = sortedQuizzes[i]
                    sortedQuizzes[i] = sortedQuizzes[i + 1]
                    sortedQuizzes[i + 1] = temp;
                    sorted = false;
                }
            }
        }
        console.log(sortedQuizzes)
        return sortedQuizzes;
    }
    
    return (
        <div id="index-page">
            <div id='index-header'>
                <h1>Quizzes by Day</h1>
                <h3>The latest quizzes published by Sparkle</h3>
            </div>

            <div id='quizzes-list'>

                <div className="quiz-list-element">
                    <Link  to="/" className='quiz-ele-image'>
                        <div className='quiz-image-icon-container'>
                            <div className='quiz-icon'></div>
                            <div className='icon-label'>
                                <div className='quiz-type'>Category</div>
                                <div className='quiz-timer'>Timer</div>
                                <div className='quiz-type-icon'></div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <Footer />
       </div>
    )
}

export default QuizIndex;