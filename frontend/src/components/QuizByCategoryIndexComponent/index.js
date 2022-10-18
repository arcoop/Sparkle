import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchQuizzesByCat, getQuizzes } from "../../store/quizzes"
import QuizTile from "../QuizTileComponent"

const QuizByCategory = () => {
    const {categoryId} = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchQuizzesByCat(categoryId))
    }, [])

    const quizzes = useSelector(getQuizzes)

    return ( 
        <div>
            {quizzes.map(quiz => {
                return (
                    <QuizTile key={quiz} quiz={quiz}/>
                )
            })} 

        </div>
    )

}

export default QuizByCategory;