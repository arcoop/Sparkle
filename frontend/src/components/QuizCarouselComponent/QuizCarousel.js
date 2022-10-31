import './QuizCarousel.css'
import QuizTile from '../QuizTileComponent'
import { useState } from 'react'

const QuizCarousel = ({quizzes}) => {

    const [arr, setArr] = useState(0)

    const arrayA = quizzes.slice(0,6)
    const arrayB = quizzes.slice(6)


    const carouselA = [arrayA, arrayB]
    const carouselB = [arrayB, arrayA, arrayB]

    const handleClick = () => {
        arr === 0 ? setArr(1) : setArr(0)
    }

    const handleRightClick = () => {
        arr === 0 ? setArr(1) : setArr(0)
    }

    return (
        <div className='carousel-container'>
            <button onClick={handleClick}>left</button>
            <div className='carousel-content'>
                {carouselB[arr].map(quiz => {
                    return (
                        <QuizTile key={quiz.id} quiz={quiz} type="small" />
                    )
                })}
            </div>
            {/* <div className={arr === 0 ? 'array' : 'array hidden'}>
                {arrayA.map((quiz) => {
                    return (
                        <div>A-Quiz</div>
                    )
                })}
            </div>
            <div className={arr === 0 ? 'array hidden' : 'array'}>
                {arrayB.map((quiz, idx) => {
                    return (
                        <div >B-Quiz</div>
                    )
                })}
            </div> */}

            <button onClick={handleClick}>right</button>
        </div>
    )
}
export default QuizCarousel;