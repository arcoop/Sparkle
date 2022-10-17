import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser, getUsers } from "../../store/users"
import { getUser } from "../../store/users"

const QuizTile = ({quiz}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser(quiz.authorId))
    }, [quiz])

    const user = useSelector(getUser(quiz.authorId)) || {username: "Loading"}

    return (
        <div>QUIZ TILE
            <div>Title: {quiz.title}</div>
            <div>Author: {user.username}</div>
            <div>Description: {quiz.description}</div>
            <div>Category: {quiz.category}</div>
            <div>Time: {quiz.quizTimer}</div>
        </div>
    ) 
}

export default QuizTile;