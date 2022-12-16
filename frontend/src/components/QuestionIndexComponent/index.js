import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuestions, getQuestions } from "../../store/questions";
import { createQuizTake } from "../../store/quizTakes";
import './QuestionIndex.css'
import { Modal } from "../../context/Modal";
import './QuizPaused.css'


const QuestionIndex = () => {
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.user) || 0
    
    const questions = useSelector(getQuestions)

    const {quizId} = useParams()
    const quiz = useSelector(state => state.quizzes[quizId])
    
    const [score, setScore] = useState(0)
    const [min, setMin] = useState(quiz.quizTimer || [])
    const [seconds, setSeconds] = useState(0)
    const [inputVal, setInputVal] = useState("")
    const [usedAnswers, setUsedAnswers] = useState(new Set())
    const [pauseButton, setPauseButton] = useState(<div className="quiz-score-time pause-hidden"><i id="quiz-pause-hidden" className="fa-solid fa-pause"></i></div>)
    const [playOrAnswer, setPlayOrAnswer] = useState("play")
    const [modal, setModal] = useState(<></>)
    const [showModal, setShowModal] = useState(false)
    const [quizTakeCreated, setQuizTakeCreated] = useState(false)
    const [started, setStarted] = useState(false)
    const maxScore = (quiz.maxScore === 1 ? questions.length : quiz.maxScore)
    
    useEffect(() => {
        dispatch(fetchQuestions(quizId))
    }, [quizId])
    
    useEffect(() => {
        if (started && !quizTakeCreated && (score === maxScore || (min === 0 && seconds === 0))) {
            const quizTake = {takerId: sessionUser ? sessionUser.id : null, quizId: quizId, score: score, time: `${min}:${seconds}` }
            clearInterval()
            if (sessionUser) {
                setQuizTakeCreated(true)
                dispatch(createQuizTake(quizTake))
            }
        }
    }, [score, min, seconds])

    useEffect(() => {
        questions.forEach(q => {
            if (Object.values(q)[2].toLowerCase() === inputVal.toLowerCase() && !usedAnswers.has(q.id)) {
                setScore(score + 1)
                setInputVal("")
                let answer = document.getElementById(Object.values(q)[0])
                answer.className = "revealed-answer"
                setUsedAnswers(prev => prev.add(q.id))
            }
        })
    }, [inputVal])


    const playQuiz = (tempMin, tempSeconds, resume = false) => {
        setPlayOrAnswer("answer")
        if (!started) setStarted(true)
        if (resume) {
            setMin(prevMin => tempMin === 0 ? 0 : prevMin)
        } else {
            setMin(prevMin => tempMin === 0 ? 0 : prevMin - 1)
        }
        setSeconds(prevSecs => prevSecs === 0 ? 59 : prevSecs)  
         
        const timer = () => {
                const handleResume = () =>{
                    setShowModal(false)
                    playQuiz(tempMin, tempSeconds, true)
                }
                const handlePause = () => {
    
                    setModal(  <Modal onClose = {() => setShowModal(false)} type={"quizPaused"}>
                        <div className='quiz-paused-modal-content'>
                            <div onClick={handleResume} id='resume-button' className='submit-button'>Resume</div>
                            <div className='quiz-paused-info'>
                                <div className='quiz-paused-text'>Quiz Paused</div>
                                <div className='paused-quiz-title-descript'>
                                    <div>{quiz.title}</div>
                                    <div>{quiz.description}</div>
                                </div>
                                <div className='paused-time-remaining'>{tempMin < 10 ? `0${tempMin}` : tempMin}:{tempSeconds < 10 ? `0${tempSeconds}` : tempSeconds} Remaining</div>
                            </div>
                        </div>            
    
                </Modal>)
                  
                    setShowModal(true)
                    clearInterval(secondsInterval)
                    clearInterval(minuteInterval)
                }  
                
                setPauseButton(<div onClick={handlePause} className="quiz-score-time pause"><i id="quiz-pause" className="fa-solid fa-pause"></i></div>)
    
                const secondsInterval = setInterval(() => {
                    if (tempSeconds === 0 && tempMin === 0) {
                        clearInterval(secondsInterval)
                    } else {
                        tempSeconds = tempSeconds === 0 ? 59 : tempSeconds - 1
                        setSeconds(prevSecs => prevSecs === 0 ? 59 : prevSecs - 1)
                    }
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

        timer();
    }
    

    const playButton = <div>
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

    if (showModal) {
        return (
            modal
    )
    } else return (
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
                            <h3 className="score-time-info">{score}/{maxScore}</h3>
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
                            <tr key={`question${question.id}`} className="question-table-row">
                                <td className="question-table-question">
                                    <div id="question-container">
                                        <p className="question-body">{question.body}</p>
                                    </div>
                                </td>
                                <td>
                                    <div id="empty-div"></div>
                                    <div id={Object.values(question)[0]} className={usedAnswers.has(question.id) ? "revealed-answer" : "revealed-answer-hidden"}>{question.answer}</div>
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