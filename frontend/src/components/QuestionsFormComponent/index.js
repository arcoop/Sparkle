import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createQuestion } from "../../store/questions";
import './QuestionsForm.css'
import QuestionsFormTile from "../QuestionFormTileComponent";

const QuestionsForm = ({quiz}) => {
    const [num, setNum] = useState(0)
    const [body, setBody] = useState("")
    const [answer, setAnswer] = useState("")
    const [inputNum, setInputNum] = useState()

    
    const dispatch = useDispatch();
    
    const addRow = (e) => {
        e.preventDefault()
        setNum(num + 1)
    }
    let rows = [] 
    for (let i = 0; i <= num; i++) {
        rows.push(<QuestionsFormTile key={i} quiz={quiz} num={i+1} />)
    }
    console.log(rows)

    return (
        <div>
            <form>
                <table id="questions-table">
                    <tbody id="questions-table-body">
                        <tr className="questions-table-row">
                            <th className="question-number-heading">#</th>
                            <th className="question-body-heading">Question</th>
                            <th className="question-answer-heading">Answer</th>
                            <th className="extra-div" width="100px"></th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            </form>
            <div className="num-rows">
                <button id="add-row" onClick={addRow}>Add</button>
                <input 
                    type="text" 
                    className="row-input"
                    onChange={e => setInputNum(e.target.value)} 
                />
                <p>Row(s)</p>
            </div>
        </div>
    )

}

export default QuestionsForm;