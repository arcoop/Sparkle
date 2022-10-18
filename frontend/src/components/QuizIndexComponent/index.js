import './QuizIndex.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchQuizzes, getQuizzes } from '../../store/quizzes';
import Footer from '../Navigation/Footer';
import QuizTile from '../QuizTileComponent';

const QuizIndex = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchQuizzes())
        document.title = "Sparkle!"
    }, [])

    const quizzes = useSelector(getQuizzes)
    
    let sortedQuizzes = quizzes.slice()

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
    
    return (
        <div id="index-page">
            <div id='index-header'>
                <h1>Quizzes by Day</h1>
                <h3>The latest quizzes published by Sparkle</h3>
            </div>

            <div id='quizzes-by-category'></div>

            <div id='quizzes-list'>
                {quizzes.map(quiz => {
                    return (
                        <Link to={`/quizzes/${quiz.id}`}>
                            <QuizTile quiz={quiz}/>
                        </Link>
                    )
                })}

            </div>
            <Footer />
       </div>
    )
}

export default QuizIndex;