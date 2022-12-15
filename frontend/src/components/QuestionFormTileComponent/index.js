import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createQuestion, deleteQuestion, updateQuestion } from "../../store/questions";
import './QuestionFormTile.css'

const QuestionsFormTile = ({quiz, num, prevQuestion}) => {

    const {quizId} = useParams()
    const [body, setBody] = useState(prevQuestion ? prevQuestion.body : "")
    const [answer, setAnswer] = useState(prevQuestion ? prevQuestion.answer : "")
    const [saveText, setSavedText] = useState("save question")
    const [buttonClass, setButtonClass] = useState("")
    const dispatch = useDispatch();

    let question;

    function saveQuestion(e) {
        e.preventDefault();
        if (body !== "" && answer !== "") {
            question = {body: body, answer: answer, quizId: quizId}
            dispatch(createQuestion(question))
        }
    }

    function editQuestion(e) {
        e.preventDefault();
        if (prevQuestion.body !== body || prevQuestion.answer !== answer) {
            prevQuestion.body = body;
            prevQuestion.answer = answer;
            dispatch(updateQuestion(prevQuestion))
        }
    }

    function getRidOfQuestion(e) {
        e.preventDefault();
        dispatch(deleteQuestion(prevQuestion))
    }

    if (prevQuestion) {
        return (
            <tr className="questions-table-row">
                <td className="question-number">{num}</td>
                <td className="question-body">
                        <input
                        type="text" 
                        className="question-input prev" 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        onBlur={editQuestion}
                        // onClick={() => setFocused(true)}
                        />
                </td>
                <td className="question-answer">
                        <input 
                        type="text" 
                        className="answers-input"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onBlur={editQuestion}
                        // onKeyUp={handleChange}
                        />
                </td>
                <td>
                    <button id="save-q-button" className={buttonClass} onClick={getRidOfQuestion}>delete question
                    </button>
                </td>
        </tr>
        )
    } else return (
            <tr className="questions-table-row">
                <td className="question-number">{num}</td>
                <td className="question-body">
                        <input type="text"
                        className="question-input new"  
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        onBlur={saveQuestion}
                        />
                </td>
                <td className="question-answer">
                        <input type="text" 
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onBlur={saveQuestion}
                        />
                </td>
                <td>
                    <button id="save-q-button" className={buttonClass} onClick={getRidOfQuestion}>{saveText}
                    </button>
                </td>
            </tr>
    )
}

export default QuestionsFormTile;