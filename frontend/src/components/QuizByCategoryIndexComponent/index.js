import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchQuizzes, fetchQuizzesByCat, getQuizzes } from "../../store/quizzes"
import QuizTile from "../QuizTileComponent"

const QuizByCategory = () => {
    const {name} = useParams()
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchQuizzesByCat(name))
    }, [])

    const quizzes = useSelector(state => Object.values(state.quizzes))

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