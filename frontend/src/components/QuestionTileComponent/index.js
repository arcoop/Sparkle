import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuiz } from "../../store/quizzes";
import './QuestionTile.css'

const QuestionTile = ({quizId, question, setScore, inputVal, setInputVal}) => {

    useEffect(() => {
        if (inputVal === question.answer) {
            setScore(prevScore => prevScore + 1)
            setInputVal("")
            let answer = document.getElementById(question)
            document.getElementById("revealed-answer").className="hidden"
            answer.className=("revealed-answer")
            
        }
    }, [inputVal])



    // return (
    //     <div id="question-container"> 
    //         <p className="question-body">{question.body}</p>
    //     </div>
    // )

}

export default QuestionTile;