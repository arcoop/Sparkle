import './QuizCarousel.css'
import QuizTile from '../QuizTileComponent'
import { useState } from 'react'

const QuizCarousel = ({quizzes}) => {

    const [position, setPosition] = useState(0)

    const arrayA = quizzes.slice(0,6)
    const arrayB = quizzes.slice(5,10)

    const carouselArr = [arrayA, arrayB]

    const handleClick = () => {
        console.log("clicked")
    }

    return (
        <div className='carousel-container'>
            <button className='arrow-button left' onClick={handleClick}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className='carousel'>
                {arrayA.map(quiz => {
                    return (
                        <QuizTile quiz={quiz} type="small"/>
                    )
                })}
            </div>
            <div></div>
            <button className='arrow-button right' onClick={handleClick}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>

    )
}
export default QuizCarousel;