import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { searchQuizzes } from "../../store/quizzes";
import Navigation from "../Navigation";
import Footer from "../Navigation/Footer";
import { Link } from "react-router-dom";

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

    let author;
    let category;

    return (
   
            <div>
                <ul>
                    {quizzes.map(quiz => {
                        author = quiz.author;
                        category = quiz.category
                        return (
                            <li key={quiz.id}>
                                <Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link>
                                <p>{quiz.description}</p>
                                <p>by <Link to={`/users/${author.id}`}>{author.username}</Link> in <Link to={`/categories/${category.id}`}>{category.name}</Link></p>
                            </li>
                        )
                    })}
                </ul>
            </div>
   
    )

}

export default SearchResults