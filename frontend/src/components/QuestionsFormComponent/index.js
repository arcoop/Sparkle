import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion, fetchQuestions } from "../../store/questions";
import './QuestionsForm.css'
import QuestionsFormTile from "../QuestionFormTileComponent";

const QuestionsForm = ({quiz}) => {

    useEffect(() => {
        dispatch(fetchQuestions(quiz.id))
    }, [quiz.id])

    const questions = useSelector(state => Object.values(state.questions))
    
    const [num, setNum] = useState(0)
    const [body, setBody] = useState("")
    const [answer, setAnswer] = useState("")
    const [inputNum, setInputNum] = useState(0)
    
    const dispatch = useDispatch();
    
    const addRow = (e) => {
        e.preventDefault()
        setNum(prev =>  prev + inputNum)
    }
    
    let rows = [] 
    for (let i = 0; i < num; i++) {
        let number = questions.length;
        rows.push(<QuestionsFormTile key={i} quiz={quiz} num={number + i + 1} />)
    }

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
                        {questions.map((question, idx) => {
                            return (
                               <QuestionsFormTile key={`prevQ${idx}`} quiz={quiz} num={idx + 1} prevQuestion={question} prevAnswer={question.answer}/>
                            )
                        })}
                        {rows}
                    </tbody>
                </table>
            </form>
            <div className="num-rows">
                <button id="add-row" onClick={addRow}>Add</button>
                <input 
                    type="text" 
                    className="row-input"
                    onChange={e => setInputNum(parseInt(e.target.value))} 
                />
                <p>Row(s)</p>
            </div>
        </div>
    )

}

export default QuestionsForm;