import './QuizCarousel.css'
import QuizTile from '../QuizTileComponent'
import { useState } from 'react'

const QuizCarousel = ({quizzes}) => {

    const [arr, setArr] = useState(0)

    const numIndeces = quizzes.length / 6

    const arrayA = quizzes.slice(1,6)
    const arrayB = quizzes.slice(6)

    const carouselA = [arrayA, arrayB, arrayA]
    const carouselB = [arrayB, arrayA, arrayB]

    const handleLeftClick = () => {
        arr === 0 ? setArr(1) : setArr(0)
    }

    const handleRightClick = () => {
        arr === 0 ? setArr(1) : setArr(0)
    }

    return (
        <div className='carousel-container'>
            <button onClick={handleLeftClick}>left</button>
            <div className={arr === 0 ? 'array' : 'array hidden'}>
                {arrayA.map((quiz, idx) => {
                    return (
                        <div >A-Quiz</div>
                    )
                })}
            </div>
            <div className={arr === 0 ? 'array hidden' : 'array'}>
                {arrayB.map((quiz, idx) => {
                    return (
                        <div >B-Quiz</div>
                    )
                })}
            </div>
            <button>right</button>
        </div>
    )
}
export default QuizCarousel;