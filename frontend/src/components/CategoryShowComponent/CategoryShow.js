import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuizzesByCat } from "../../store/quizzes";
import Navigation from "../Navigation";
import Footer from "../Navigation/Footer";
import QuizByCategory from "../QuizByCategoryIndexComponent";
import './CategoryShow.css'

const CategoryShow = () => {
    const {name} = useParams()
    const dispatch = useDispatch();
    console.log(name)
    const [activeIndex, setActiveIndex] = useState(1)
    
    useEffect(() => {
        dispatch(fetchQuizzesByCat(name))
    }, [name])

    const quizzes = useSelector(state => Object.values(state.quizzes))
    console.log(quizzes)

    

    return (
        <div className="page-wrapper">
            <Navigation />
            <div id="category-show-top-div"></div>
            <div id="category-show-header">
                <div id="category-show-header-left">
                    <h1 className="category-show-title">{name} quizzes</h1>
                </div>
            </div>
            <div id="category-show-tabs">
                <div id="category-tab-1" className="category-show-tab">all {name} quizzes</div>
            </div>
            <div id="category-show-all-quizzes">
                <div id="category-show-left-col">

                </div>
                <div id="category-show-right-col"></div>
            </div>
            <Footer />
        </div>
    )
}

export default CategoryShow;