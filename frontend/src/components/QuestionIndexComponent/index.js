import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuestions, getQuestions } from "../../store/questions";
import QuestionTile from "../QuestionTileComponent/index";
import './QuestionIndex.css'

const QuestionIndex = ({quiz}) => {
    const dispatch = useDispatch()
    const questions = useSelector(getQuestions)

    const {quizId} = useParams()
    const [score, setScore] = useState(0)
    const [inputVal, setInputVal] = useState("")
    const [revealedAnswer, setRevealedAnswer] = useState("")
    const [shouldClear, setShouldClear] = useState(false)

    useEffect(() => {
        dispatch(fetchQuestions(quizId))
    }, [quizId])

   
    const playQuiz = (e) => {
        e.currentTarget.className = "hidden"
        let answerBox = document.getElementById("answer-box")
        answerBox.className = "answer-box"
    }

    // handleInputChange = (e) => {
    //     if (shouldClear) {
    //         setInputVal("")
    //     } else setInputVal(e.target.v)
    // }

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
                                    <QuestionTile 
                                        key={question} 
                                        quizId={quizId} 
                                        question={question} 
                                        setScore={setScore}
                                        inputVal={inputVal}
                                        setInputVal={setInputVal}
                                        setRevealedAnswer={setRevealedAnswer}
                                        setShouldClear={setShouldClear}
                                    />
                                </td>
                                <td>
                                    <div id="revealed-answer"></div>
                                    <div className="hidden">{question.answer}</div>
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