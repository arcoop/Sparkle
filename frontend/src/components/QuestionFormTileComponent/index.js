import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createQuestion } from "../../store/questions";

const QuestionsFormTile = ({quiz, num}) => {

    const {quizId} = useParams()
    const [body, setBody] = useState("")
    const [answer, setAnswer] = useState("")

    const dispatch = useDispatch()

    let question;

    function saveQuestion(e) {
        console.log("save-question")
        e.preventDefault()
        question = {body: body, answer: answer, quizId: quizId}
        console.log("Creating question")
        dispatch(createQuestion(question))
    }

    // const handleChange = debounce(() => saveQuestion())

    return (
            <tr className="questions-table-row">
                <td className="question-number">{num}</td>
                <td className="question-body">
                        <input type="text" 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
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
                    <button onClick={saveQuestion}>save question</button>
                </td>
            </tr>
    )

}

export default QuestionsFormTile;