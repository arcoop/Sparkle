import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchQuizzes, fetchQuizzesByCat, getQuizzes } from "../../store/quizzes"
import QuizTile from "../QuizTileComponent"

const QuizByCategory = () => {
    const {categoryId} = useParams()
    // console.log(categoryId)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchQuizzesByCat(categoryId))
    }, [])

    const quizzes = useSelector(getQuizzes)
    console.log(quizzes)

    return ( 
        <div>
            {quizzes.map(quiz => {
                return (
                    <QuizTile quiz={quiz}/>
                )
            })} 

        </div>
    )

}

export default QuizByCategory;