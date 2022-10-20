import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "../../store/users"
import { getUser } from "../../store/users"

const QuizTile = ({quiz}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser(quiz.authorId))
    }, [quiz])

    const categoryId = quiz ? quiz.categoryId : 1

    let category = useSelector(state => state.categories[categoryId])

    const user = useSelector(getUser(quiz.authorId)) || {username: "Loading"}

    return (
        <div>
            <div>Image: {quiz.icon}</div>
            <div>Title: {quiz.title}</div>
            <div>Author: {user.username}</div>
            <div>Description: {quiz.description}</div>
            <div>Category: {category.name}</div>
            <div>Time: {quiz.quizTimer}</div>
        </div>
    ) 
}

export default QuizTile;