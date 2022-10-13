import './QuizEditForm.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getQuiz } from '../../store/quizzes'

const QuizEditForm = () => {
    const {quizId} = useParams()
    const quiz = useSelector(getQuiz(quizId))


    
    return (
        <p>hi from quiz edit form</p>
    )
}
export default QuizEditForm;