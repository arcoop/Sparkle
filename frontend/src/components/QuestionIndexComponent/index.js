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
    const [min, setMin] = useState(quiz.quizTimer || [])
    const [seconds, setSeconds] = useState(0)
    const [inputVal, setInputVal] = useState("")
    const [usedAnswers, setUsedAnswers] = useState([])
    const [time, setTime] = useState(quiz.quizTimer || "")
    const [timerOn, setTimerOn] = useState(true)
    const [answerBoxClassName, setAnswerBoxClassName] = useState("hidden")
    const [playButtonClassName, setPlayButtonClassName] = useState("submit-button")
    const [pauseButton, setPauseButton] = useState("")

    useEffect(() => {
        dispatch(fetchQuestions(quizId))
    }, [quizId])

    useEffect(() => {
        if (score === quiz.maxScore || (min === 0 && seconds === 0)) {
            const quizTake = {takerId: sessionUser ? sessionUser.id : null, quizId: quizId, score: score, time: `${min}:${seconds}` }
            dispatch(createQuizTake(quizTake))
        }
    }, [score, min, seconds])


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

    let secondsInterval;
    let minuteInterval;
    
    const playQuiz = (e) => {
        setPlayButtonClassName("hidden")
        setAnswerBoxClassName("answer-box")
        setMin(prevMin => prevMin - 1)
        setSeconds(59)
        let tempSeconds = 59;
        let tempMin = quiz.quizTimer - 1;
        
        const timer = () => {
            const handlePause = () => {
                clearInterval(secondsInterval)
                clearInterval(minuteInterval)
            }
            setPauseButton(<p onClick={handlePause} className="pause">Pause</p>)
            const secondsInterval = setInterval(() => {
                if (tempMin === 0) tempSeconds -= 1
                setSeconds(prevSecs => prevSecs === 0 ? 59 : prevSecs - 1)
                if (tempSeconds === 0 ) clearInterval(secondsInterval)
            }, 1000)

            const minuteInterval = setInterval(() => {
                if (tempMin === 0 ) {
                    clearInterval(minuteInterval)
                } else {
                    tempMin -= 1; 
                    setMin(prevMin => prevMin - 1)
                }
            }, 60000)
        };
        timer()
    }

    return (
        <div id="quiz-questions-index">
                <div id="quiz-header">
                    <h3 className="answer-input-text"></h3>
                    <button 
                        onClick={playQuiz}
                        id="play-quiz" 
                        className={playButtonClassName}>
                        <p>Play Quiz</p>
                    </button>
                    <div id="answer-box" className={answerBoxClassName}>
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
                        {pauseButton}
                        {/* <div onClick={handlePause} id="pause-button" className={pauseButtonClassName}>Pause</div> */}
                        <h3 id="timer">Time: {min < 10 ? `0${min}` : min}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
                        {/* <h3 id="timer">Time:{min}:{seconds}</h3> */}
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