import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createQuestion } from "../../store/questions";
import './QuestionFormTile.css'

const QuestionsFormTile = ({quiz, num, prevQuestion, prevAnswer}) => {

    const {quizId} = useParams()
    const [body, setBody] = useState("")
    const [answer, setAnswer] = useState("")
    const [saveText, setSavedText] = useState("save question")
    const [buttonClass, setButtonClass] = useState("")
    const [focused, setFocused] = useState(false)

    const dispatch = useDispatch()

    let question;

    function saveQuestion(e) {
        e.preventDefault()
        question = {body: body, answer: answer, quizId: quizId}
        dispatch(createQuestion(question))
        setButtonClass("button-saved")
        setSavedText("question saved")
        // let button = document.getElementById("save-q-button")
        // button.className = "button-saved"
    }

    // const handleChange = debounce(() => saveQuestion())
    if (prevQuestion) {
        return (
            <tr className="questions-table-row">
                <td className="question-number">{num}</td>
                <td className="question-body">
                        <input
                        className="question-input" 
                        type="text" 
                        value={prevQuestion}
                        onChange={(e) => setBody(e.target.value)}
                        onClick={() => setFocused(true)}
                        />
                </td>
                <td className="question-answer">
                        <input type="text" 
                        value={prevAnswer}
                        onChange={(e) => setAnswer(e.target.value)}
                        // onKeyUp={handleChange}
                        />
                </td>
                <td>
                    <button id="save-q-button" className={buttonClass} onClick={saveQuestion}>{saveText}
                        {/* <p id="saved-text" className="hidden">saved!</p> */}
                    </button>
                </td>
        </tr>
        )
    } else return (
            <tr className="questions-table-row">
                <td className="question-number">{num}</td>
                <td className="question-body">
                        <input type="text"
                        className="question-input"  
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        onClick={() => setFocused(true)}
                        />
                </td>
                <td className="question-answer">
                        <input type="text" 
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        // onKeyUp={handleChange}
                        />
                </td>
                <td>
                    <button id="save-q-button" className={buttonClass} onClick={saveQuestion}>{saveText}
                        {/* <p id="saved-text" className="hidden">saved!</p> */}
                    </button>
                </td>
            </tr>
    )

}

export default QuestionsFormTile;