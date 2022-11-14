import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuizzesByCat } from "../../store/quizzes";
import Navigation from "../Navigation";
import Footer from "../Navigation/Footer";
import QuizByCategory from "../QuizByCategoryIndexComponent";
import './CategoryShow.css'
import QuizTile from "../QuizTileComponent";
import { Link } from "react-router-dom";

const CategoryShow = () => {
    const {name} = useParams()
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(1)
    
    useEffect(() => {
        document.title = `${name.slice(0,1).toUpperCase()}${name.slice(1)} Quizzes`
        dispatch(fetchQuizzesByCat(name))
    }, [name])

    const quizzes = useSelector(state => Object.values(state.quizzes))
    const sortedQuizzesByDate = quizzes.slice().sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)
    const sortedQuizzesByAlphabet = quizzes.slice().sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)

    const quizListAll = <>
     {sortedQuizzesByAlphabet.map((quiz, idx) => {
            return (
                <div key={quiz.id*idx} id="category-show-left-col">
                    <div id="cat-show-quiz-tile-left">
                        <QuizTile quiz={quiz} type={"medium-cat-show"}/>
                    </div>
                    <div id="cat-show-quiz-info-right">
                        <Link to={`/quizzes/${quiz.id}`} className="cat-show-quiz-title">{quiz.title}</Link>
                        <div className="cat-show-quiz-desc">{quiz.description}</div>
                    </div>
                </div>
            )
        })}
    </>

    const quizListNewest = <>
    {sortedQuizzesByDate.map((quiz, idx) => {
            return (
                <div key={quiz.id*idx} id="category-show-left-col">
                    <div id="cat-show-quiz-tile-left">
                        <QuizTile quiz={quiz} type={"medium-cat-show"}/>
                    </div>
                    <div id="cat-show-quiz-info-right">
                        <Link to={`/quizzes/${quiz.id}`} className="cat-show-quiz-title">{quiz.title}</Link>
                        <div className="cat-show-quiz-desc">{quiz.description}</div>
                    </div>
                </div>
            )
        })}
    </>

    
    return (
        <div className="page-wrapper">
            <Navigation />
            <div id="category-show-content-container">
                <div id="category-show-top-div"></div>
                <div id="category-show-header">
                    <div id="category-show-header-left">
                        <h1 className="category-show-title">{name} quizzes</h1>
                    </div>
                </div>
                <div id="category-show-tabs">
                    <div onClick={() => setActiveIndex(0)} id="category-tab-1" className={activeIndex === 0 ? 'category-show-tab active-show-tab' : 'category-show-tab'}>all {name} quizzes</div>
                    <div onClick={() => setActiveIndex(1)} id="category-tab-2" className={activeIndex === 1 ? 'category-show-tab active-show-tab' : 'category-show-tab'}>Newest</div>
                </div>
                <div id="category-show-all-quizzes">
                        {activeIndex === 0 ? quizListAll : quizListNewest}
                    <div id="category-show-right-col"></div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CategoryShow;