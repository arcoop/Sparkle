import { useSelector } from 'react-redux';
import './CategoryIndex.css'
import { Link } from 'react-router-dom';

const CategoriesIndex = () => {
    const categories = useSelector(state => Object.values(state.categories))

    return (
        categories.map(category => {
            return (
                <ul id='category-index'>
                    <li className='category-item' key={category[0]}>
                        <Link className='category-link' to={`/categories/${category.id}`}>{category.name}</Link>
                    </li>
                </ul>
            )
        })

    )
}

export const CategoryIndexPage = () => {
    return (
        <div className='cat-index-container'>
            <CategoriesIndex />
        </div>
    )
}

export default CategoriesIndex;
