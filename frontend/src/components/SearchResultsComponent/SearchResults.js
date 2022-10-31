import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { searchQuizzes } from "../../store/quizzes";
import Navigation from "../Navigation";
import Footer from "../Navigation/Footer";
import { Link } from "react-router-dom";
import './SearchResults.css'
import { searchUsers } from "../../store/users";

const SearchResults = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryString = location.search
    console.log(location)
    const params = new URLSearchParams(queryString)
    console.log(params)
    const query = params.get("s")

    useEffect(() => {
        if (location.pathname.includes("quizzes")) {
            dispatch(searchQuizzes(query))
        } else if (location.pathname.includes("users")) {
            dispatch(searchUsers(query))
        }
    }, [location.pathname, query])

    const quizzes = useSelector(state => Object.values(state.quizzes))
    const users = useSelector(state => Object.values(state.users))

    let numResults = location.pathname.includes("quizzes") ? quizzes.length : users.length
    let resultsText = numResults === 1 ? "result" : "results"
    let author;
    let category;

    let results;
    if (location.pathname.includes("quizzes")) {
        results = <ul className="search-results">
            {quizzes.map(quiz => {
                {author = quiz.author;}
                {category = quiz.category;}
                return (
                    <li className="results-list-item" key={quiz.id}>
                    <Link className="result-title" to={`/quizzes/${quiz.id}`}>{quiz.title}</Link>
                    <p className="result-description">{quiz.description}</p>
                    <p className="result-author-category">by <Link className="result-info" to={`/users/${author.id}`}>{author.username}</Link> in <Link className="result-info" to={`/categories/${category.id}`}>{category.name}</Link></p>
                    </li>
                )
            })}
        </ul>
            
    }
    if (location.pathname.includes("users")) {
        results = <ul className="search-results">
        {users.map(user => {
            return (
                <li className="results-list-item" key={user.id}>
                    <Link to={`/users/${user.id}`}>
                        <i className="fa-regular fa-user"></i>
                        {user.username}
                    </Link>
                </li>
            )
        })}
    </ul>
      
    }

    return (
            <div className="page-wrapper">
                <Navigation />
                <div className="search-results-container">
                    <div className="search-results-heading">
                        <Link to={`/search/quizzes/?s=${query}`}>Quizzes</Link>
                        <Link to={`/search/users/?s=${query}`}>Users</Link>
                    </div>
                    <div className="search-results-subheading"></div>
                        <p>{numResults} {resultsText} for "{query}"</p>
                    <div className="search-results">
                        {results}
                        
                    </div>
                </div>
                <Footer />
            </div>
   
    )

}

export default SearchResults