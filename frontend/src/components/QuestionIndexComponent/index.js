import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuestions, getQuestions } from "../../store/questions";
import { createQuizTake } from "../../store/quizTakes";
import QuestionTile from "../QuestionTileComponent/index";
import './QuestionIndex.css'
import QuizPausedModal from "../QuizPausedModal./QuizPaused";

const QuestionIndex = ({quiz}) => {
    const dispatch = useDispatch()
    const questions = useSelector(getQuestions)
    console.log(quiz)

    const sessionUser = useSelector(state => state.session.user) || {}

    const {quizId} = useParams()
    const [score, setScore] = useState(0)
    const [min, setMin] = useState(quiz.quizTimer || [])
    const [seconds, setSeconds] = useState(0)
    const [inputVal, setInputVal] = useState("")
    const [usedAnswers, setUsedAnswers] = useState([])
    const [time, setTime] = useState(quiz.quizTimer || "")
    const [timerOn, setTimerOn] = useState(false)
    const [answerBoxClassName, setAnswerBoxClassName] = useState("hidden")
    const [playButtonClassName, setPlayButtonClassName] = useState("submit-button")
    const [pauseButton, setPauseButton] = useState(<div className="quiz-score-time pause-hidden"><i id="quiz-pause-hidden" className="fa-solid fa-pause"></i></div>)
    const [playOrAnswer, setPlayOrAnswer] = useState("play")
    const [pausedSecs, setPausedSecs] = useState(0)
    
    const [showModal, setShowModal] = useState(false)


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

    const resumeQuiz = (tempMin, tempSeconds) => {
        setMin(prevMin => tempMin === 0 ? 0 : prevMin)
        setSeconds(prevSecs => prevSecs === 0 ? 59 : prevSecs)
        const timer = () => {

            const handlePause = () => {
                clearInterval(secondsInterval)
                clearInterval(minuteInterval)
            }  
            
            setPauseButton(<div onClick={handlePause} className="quiz-score-time pause"><QuizPausedModal resumeQuiz={resumeQuiz} quiz={quiz} tempMin={tempMin} tempSeconds={tempSeconds} /></div>)

            const secondsInterval = setInterval(() => {
                if (tempSeconds === 0 && tempMin === 0) clearInterval(secondsInterval)
                tempSeconds = tempSeconds === 0 ? 59 : tempSeconds - 1
                setSeconds(prevSecs => prevSecs === 0 ? 59 : prevSecs - 1)
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

    
    const playQuiz = () => {
        setPlayOrAnswer("answer")
        setMin( prevMin => tempMin === 0 ? 0 : prevMin - 1)
        setSeconds(prevSecs => prevSecs === 0 ? 59 : prevSecs)  
        let tempMin = min - 1;
        let tempSeconds = 59
         
        const timer = () => {

            const handlePause = () => {
                clearInterval(secondsInterval)
                clearInterval(minuteInterval)
            }  
            
            setPauseButton(<div onClick={handlePause} className="quiz-score-time pause"><QuizPausedModal resumeQuiz={resumeQuiz} quiz={quiz} tempMin={tempMin} tempSeconds={tempSeconds} /></div>)
            const secondsInterval = setInterval(() => {
                if (tempSeconds === 0 && tempMin === 0) clearInterval(secondsInterval)
                tempSeconds = tempSeconds === 0 ? 59 : tempSeconds - 1
                setSeconds(prevSecs => prevSecs === 0 ? 59 : prevSecs - 1)
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
    

    const playButton = <div>
        {/* <h3 id="enter-an-answer" className="answer-input-text-hidden">Enter answer:</h3> */}
        <button
                onClick={() => playQuiz(min - 1, 59)}
                id="play-quiz"
                className={"submit-button"}>
                <p>Play Quiz</p>
            </button>
    </div>

    const answerBox = <div id="answer-box" className={"answer-box"}>
        <input
            id="answer-input" 
            className="answer-input"
            type="text" 
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
        />
    </div>

    return (
        <div id="quiz-questions-index">
                <div id="quiz-header">
                    <div id="left-side-quiz-header">
                        <h3 id="enter-an-answer" className={playOrAnswer === "play" ? "answer-input-text-hidden" : "answer-input-text"}>Enter answer:</h3>
                        {/* <h3 className="answer-input-text"></h3> */}
                        <div className="play-or-answer">
                            {playOrAnswer === "play" ? playButton : answerBox}
                        </div>
                    </div>
                    <div id="right-side-quiz-header">
                        <div className="quiz-score-time" id="score">
                            <p className="score-time-heading" id="score-heading">Score:</p>
                            <h3 className="score-time-info">{score}/{quiz.maxScore}</h3>
                        </div>
                        {pauseButton}
                        <div className="quiz-score-time" id="timer">
                            <p className="score-time-heading" id="timer-heading">Timer:</p> 
                            <h3 className="score-time-info">{min < 10 ? `0${min}` : min}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
                        </div>
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