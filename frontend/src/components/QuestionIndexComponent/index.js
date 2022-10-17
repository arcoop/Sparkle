import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuestions, getQuestions } from "../../store/questions";
import QuestionTile from "../QuestionTileComponent/index";
import './QuestionIndex.css'

const QuestionIndex = () => {
    const dispatch = useDispatch()
    const {quizId} = useParams()
    const [score, setScore] = useState(0)

    useEffect(() => {
        console.log("fetching questions")
        dispatch(fetchQuestions(quizId))
    }, [quizId])

    const questions = useSelector(getQuestions)

    return (
        <div id="quiz-questions-index">
            {questions.map(question => {
                return (
                    <div>
                        <QuestionTile key={question} quizId={quizId} question={question} />
                        <input type="text"
                        />
                    </div>
                    
                )
            })}

        </div>
    )

}
export default QuestionIndex;