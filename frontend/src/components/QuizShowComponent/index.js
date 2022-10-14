import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchQuiz, getQuiz } from "../../store/quizzes";
import './QuizShow.css'

const QuizShow = () => {
    const dispatch = useDispatch();
    const {quizId} = useParams();
    useEffect(() => {
        dispatch(fetchQuiz(quizId))
    }, [quizId])

    const quiz = useSelector(getQuiz(quizId))



}