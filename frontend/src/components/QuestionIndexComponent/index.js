import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuestions, getQuestions } from "../../store/questions";
import { createQuizTake } from "../../store/quizTakes";
import QuestionTile from "../QuestionTileComponent/index";
import './QuestionIndex.css'

const QuestionIndex = ({quiz}) => {
    const dispatch = useDispatch()
    const questions = useSelector(getQuestions)

    const sessionUser = useSelector(state => state.session.user) || {}

    const {quizId} = useParams()
    const [score, setScore] = useState(0)
    const [time, setTime] = useState(quiz.time)
    const [inputVal, setInputVal] = useState("")
    const [usedAnswers, setUsedAnswers] = useState([])

    useEffect(() => {
        dispatch(fetchQuestions(quizId))
    }, [quizId])

    useEffect(() => {
        if (score === quiz.maxScore || time === 0) {
            const quizTake = {takerId: sessionUser ? sessionUser.id : null, quizId: quizId, score: score, time: time }
            console.log("creating quiz take")
            dispatch(createQuizTake(quizTake))
        }
    }, [score])

    useEffect(() => {
        questions.forEach(q => {
            if (Object.values(q)[2].toLowerCase() === inputVal.toLowerCase() && !usedAnswers.includes(Object.values(q)[2])) {
                setScore(score + 1)
                setInputVal("")
                let answer = document.getElementById(Object.values(q)[0])
                answer.className = "revealed-answer"
                setUsedAnswers(prev => prev + [Object.values(q)[2]])
            }
        })
    }, [inputVal])
   
    const playQuiz = (e) => {
        e.currentTarget.className = "hidden"
        let answerBox = document.getElementById("answer-box")
        answerBox.className = "answer-box"
    }

    return (
        <div id="quiz-questions-index">
                <div id="quiz-header">
                    <h3 className="answer-input-text"></h3>
                    <button 
                        onClick={playQuiz}
                        id="play-quiz" 
                        className="submit-button">
                        <p>Play Quiz</p>
                    </button>
                    <div id="answer-box" className="hidden">
                        <h3 id="enter-an-answer" className="answer-input-text">Enter answer:</h3>
                        <input
                            id="answer-input" 
                            className="answer-input"
                            type="text" 
                            value={inputVal}
                            onChange={e => setInputVal(e.target.value)}
                        />
                    </div>
                    <div id="right-side-quiz-header">
                        <h3 id="score">Score: {score} </h3>
                        <h3 id="timer">Time: {quiz.quizTimer}:00</h3>
                    </div>
                </div>

            <table>
                <tbody>
                    {questions.map(question => {
                        return (
                            <tr className="question-table-row">
                                <td className="question-table-question">
                                    <div id="question-container">
                                        <p className="question-body">{question.body}</p>
                                    </div>
                                </td>
                                <td>
                                    <div id="empty-div"></div>
                                    <div id={Object.values(question)[0]} className="revealed-answer-hidden">{question.answer}</div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </div>
    )

}
export default QuestionIndex;