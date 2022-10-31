import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { searchQuizzes } from "../../store/quizzes";
import Navigation from "../Navigation";
import Footer from "../Navigation/Footer";

const SearchResults = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryString = location.search
    const params = new URLSearchParams(queryString)
    const query = params.get("s")

    useEffect(() => {
        dispatch(searchQuizzes(query))
    }, [query])

    const quizzes = useSelector(state => Object.values(state.quizzes))

    return (
        <div className="page-wrapper">
            <Navigation />
            <ul>
                {quizzes.map(quiz => {
                    return (
                        <li key={quiz.id}>{quiz.title} by {quiz.author.username}</li>
                    )
                })}
            </ul>
            <Footer />
        </div>
    )

}

export default SearchResults