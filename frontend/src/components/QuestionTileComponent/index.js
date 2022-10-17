import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuiz } from "../../store/quizzes";

const QuestionTile = ({quizId, question}) => {
    const [inputVal, setInputVal] = useState("")

    const dispatch = useDispatch();

    const quiz = useSelector(getQuiz(quizId))

    return (
        <div> 
            <div id="question">{question.body}</div>
        </div>
    )

}

export default QuestionTile;