import { useDispatch, useSelector } from 'react-redux';
import './CategoryIndex.css'
import { Link } from 'react-router-dom';
import QuizByCategoryWithProps from '../QuizByCategoryIndexComponent/QuizByCategoryWithProps';
import { useEffect } from 'react';
import { fetchQuizzes } from '../../store/quizzes';


const CategoriesIndex = () => {
    const categories = useSelector(state => Object.values(state.categories))

    return (
        categories.map(category => {
            return (
                <ul key={category.id} id='category-index'>
                    <li className='category-item' key={category[0]}>
                        <Link className='category-link' to={`/categories/${(category.name).toLowerCase()}`}>{category.name}</Link>
                    </li>
                </ul>
            )
        })

    )
}
        
export default CategoriesIndex;
        
export const CategoryIndexPage = () => {
    const dispatch = useDispatch()

    const categories = useSelector(state => Object.values(state.categories)) || []

    useEffect(() => {
        dispatch(fetchQuizzes())
    }, [])
    
    const quizzes = useSelector(state => Object.values(state.quizzes)) || []

    return (
        <div className='categories-page-main-column'>
            <div className='categories-page-header'>
                <h1 className='categories-page-heading'>Sparkle Quiz Categories</h1>
                <p className='categories-page-subtitle'>Discover the most popular quizzes and quiz categories on Sparkle</p>
            </div>
            <div className='cat-index-container'>
                {categories.map(cat => {
                    return (
                        <div key={`${cat.name}${cat.id}`} className='quiz-cat-list'>
                            <div className='quiz-by-cat-list-item'><Link className='quiz-cat-title-link' to={`/categories/${cat.name.toLowerCase()}`}><h1 className='cat-heading'>{cat.name}</h1></Link></div>
                            <ul className='inner-quiz-list'>
                                    {quizzes.map((quiz, idx) => {
                                        if (quiz.category.categoryId == cat.id) {
                                            return (
                                                <li className='quiz-title-list-item' key={`${idx}-${cat.id}-${quiz.id}`}>
                                                    <Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link>
                                                </li>
                                            )
                                        }
                                    })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
