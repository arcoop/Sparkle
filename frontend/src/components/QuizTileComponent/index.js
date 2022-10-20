import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "../../store/users"
import { getUser } from "../../store/users"
import { Link } from "react-router-dom"
import './QuizTile.css'

const QuizTile = ({quiz}) => {
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchUser(quiz.authorId))
    // }, [quiz])

    const categoryId = quiz ? quiz.categoryId : 1

    let category = useSelector(state => state.categories[categoryId])

    const user = useSelector(getUser(quiz.authorId)) || {username: "Loading"}

    // const user = quiz.author

    const image = quiz.iconUrl ? <img src={quiz.iconUrl} alt="" /> : <></>

    return (
        <div className="quiz-tile">
            <Link className="link-to-quiz-show" to={`/quizzes/${quiz.id}`}>
                <div className="quiz-icon-tile">
                    {image}
                    <div className="quiz-tile-title">{quiz.title}</div>
                    <div className="second-div"></div>
                    
                </div>
                <div className="author-category-time">
                    <div className="quiz-tile-author">by {user.username}</div>
                    <div className="quiz-tile-cat">{category.name}</div>
                    <div className="quiz-tile-time">{quiz.quizTimer}m</div>
                    <div className="hidden-div"></div>
                </div>
            </Link>
            <div className="quiz-tile-description">{quiz.description}</div>
            
        </div>
    ) 
}

export default QuizTile;