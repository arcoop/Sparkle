import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuiz } from "../../store/quizzes";
import './QuestionTile.css'

const QuestionTile = ({quizId, question, setScore, inputVal, setInputVal, setRevealedAnswer, setShouldClear}) => {
    const dispatch = useDispatch();
    // const [shouldClear, setShouldClear] = useState(false)

    // const quiz = useSelector(getQuiz(quizId))

    useEffect(() => {
        if (inputVal === question.answer) {
            setScore(prevScore => prevScore + 1)
            setRevealedAnswer(question.answer)
            setShouldClear(true)
            setInputVal("")
            
        }
    }, [inputVal])



    return (
        <div id="question-container"> 
            <p className="question-body">{question.body}</p>
        </div>
    )

}

export default QuestionTile;