import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchQuizzes, fetchQuizzesByCat, getQuizzes } from "../../store/quizzes"
import QuizTile from "../QuizTileComponent"

const QuizByCategoryWithProps = ({category}) => {

    const categoryId = category.id
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchQuizzesByCat(categoryId))
    }, [])

    const quizzes = useSelector(getQuizzes)

    return ( 
        <div>
            {quizzes.map((quiz, idx) => {
                return (
                    <QuizTile key={quiz.id*idx*7} quiz={quiz}/>
                )
            })} 

        </div>
    )

}

export default QuizByCategoryWithProps