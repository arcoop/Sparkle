import './QuizCarousel.css'
import QuizTile from '../QuizTileComponent'
import { useEffect, useState } from 'react'

const QuizCarousel = ({quizzes}) => {
    const arrayA = quizzes.slice(0,6)
    const arrayB = quizzes.slice(6,11)

    const [currentCarouselClass, setCurrentCarouselClass] = useState('carousel')
    const [hiddenCarouselClass, setHiddenCarouselClass] = useState('hidden')
    const [carouselIndex, setCarouselIndex] = useState(0)

    const carouselArr = [arrayA, arrayB]
    const wholeCarousel = quizzes.slice(0,11)

    let tempCarousel;
    
    let currentCarousel = carouselArr[carouselIndex]

    let hiddenCarousel = carouselIndex === 0 ? carouselArr[1] : carouselArr[0]

    
    const handleLeftClick = () => {

    }

    const handleRightClick = () => {

        setCarouselIndex(carouselIndex === 2 ? 0 : carouselIndex + 1)
       
    }

    console.log(carouselIndex)

    let leftArr;
    if (carouselIndex === 0) leftArr = 'carousel left'
    if (carouselIndex === 1) leftArr = 'carousel center'
    if (carouselIndex === 2) leftArr = 'carousel right'

    let centerArr;
    if (carouselIndex === 0) centerArr = 'carousel center'
    if (carouselIndex === 1) centerArr = 'carousel right'
    if (carouselIndex === 2) centerArr = 'carousel left'

    let rightArr;
    if (carouselIndex === 0) rightArr = 'carousel right'
    if (carouselIndex === 1) rightArr = 'carousel left'
    if (carouselIndex === 2) rightArr = 'carousel center'

    return (
        <div className='carousel-container'>
            <button className='arrow-button left' onClick={handleLeftClick}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="carousel-array-container" >
                <div className={leftArr}>
                    {arrayB.map(quiz => {
                        return (
                            <QuizTile key={quiz.id} quiz={quiz} type="small" />
                        )
                    })}
                </div>
                <div className={centerArr}>
                    {arrayA.map(quiz => {
                        return (
                            <QuizTile key={quiz.id} quiz={quiz} type="small" />
                        )
                    })}
                </div>
                <div className={rightArr}>
                    {arrayB.map(quiz => {
                        return (
                            <QuizTile key={quiz.id} quiz={quiz} type="small"/>
                        )
                    })}
                </div>
            </div>
            <button className='arrow-button right' onClick={handleRightClick}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>

    )
}
export default QuizCarousel;