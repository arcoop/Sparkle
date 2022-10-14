import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchQuiz, getQuiz } from "../../store/quizzes";
import { fetchUser, fetchUsers, getUser } from "../../store/users";
import './QuizShow.css'

const QuizShow = () => {
    const dispatch = useDispatch();
    const {quizId} = useParams();

    useEffect(() => {
        dispatch(fetchQuiz(quizId))
    }, [quizId])

    let quiz = useSelector(getQuiz(quizId)) || {title: "", category: ""};

    useEffect(() => {
        if(quiz.authorId) dispatch(fetchUser(quiz.authorId))
    }, [quiz])

    let user = useSelector(getUser(quiz.authorId)) || {username:"", email:""}
        
    const [score, setScore] = useState(0)
    const [timer, setTImer] = useState(quiz.quizTimer)

    return (
        <div id="quiz-show-page">
            <div id="left-side">
                <div id="top-row">
                    <p className="quiz-category">{quiz.category}</p>
                </div>
                <div id="top-level-info">
                    <h1 className="quiz-title">{quiz.title}</h1>
                    <h2 className="quiz-description">{quiz.description}</h2>
                </div>

    
                <div id="mid-level-info">
                    <h3> by {user.username}</h3>
                </div>

                <div id="more-info">
                    <div id="more-info-header">
                        <h4>More Info</h4>
                    </div>
                    <div id="quiz-type">
                        <p>{quiz.quizType}</p>
                    </div>
                </div>

                <div id="quiz-div">
                    <div id="quiz-header">
                        <button id="play-quiz" className="submit-button">Play Quiz</button>
                        <div id="right-side-quiz-header">
                            <h3 id="score">Score</h3>
                            <h3 id="timer">Time: {quiz.quizTimer}:00</h3>
                        </div>
                    </div>

                    <div id="quiz-content">
                        
                    </div>

                </div>
            </div>

            <div id="right-side">
                <p>right side</p>
            </div>
        </div>
    )

}

export default QuizShow;