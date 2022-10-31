import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { searchQuizzes } from "../../store/quizzes";
import Navigation from "../Navigation";
import Footer from "../Navigation/Footer";
import { Link } from "react-router-dom";
import './SearchResults.css'

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
    const numQuizzes = quizzes.length
    let resultsText = numQuizzes === 1 ? "result" : "results"
    let author;
    let category;

    return (
            <div className="page-wrapper">
                <Navigation />
                <div className="search-results-container">
                    <div className="search-results-heading">
                        <h4>Quizzes</h4>
                        <p>{numQuizzes} {resultsText} for "{query}"</p>
                    </div>
                    <div className="search-results">
                        <ul className="results-list">
                            {quizzes.map(quiz => {
                                author = quiz.author;
                                category = quiz.category
                                return (
                                    <li className="results-list-item" key={quiz.id}>
                                        <Link className="result-title" to={`/quizzes/${quiz.id}`}>{quiz.title}</Link>
                                        <p className="result-description">{quiz.description}</p>
                                        <p className="result-author-category">by <Link className="result-info" to={`/users/${author.id}`}>{author.username}</Link> in <Link className="result-info" to={`/categories/${category.id}`}>{category.name}</Link></p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
   
    )

}

export default SearchResults