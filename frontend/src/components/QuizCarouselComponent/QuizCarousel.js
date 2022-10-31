import './QuizCarousel.css'
import QuizTile from '../QuizTileComponent'
import { useState } from 'react'

const QuizCarousel = ({quizzes}) => {

    const [arr, setArr] = useState(0)

    const arrayA = quizzes.slice(0,6)
    const arrayB = quizzes.slice(6)


    const carouselA = [arrayA, arrayB, arrayA]
    const carouselB = [arrayB, arrayA, arrayB]

    const handleLeftClick = () => {
        arr === 0 ? setArr(1) : setArr(0)
    }

    const handleRightClick = () => {
        arr === 0 ? setArr(1) : setArr(0)
    }

    let carouselContent = arr === 0 ? carouselA : carouselB
    console.log(carouselContent)

    return (
        <div className='carousel-container'>
            <button onClick={handleLeftClick}>left</button>
            <div className='carousel-content'>
                {carouselContent.map(arr => {
                    return (
                        <div className="carousel-array">
                        {arr.map(quiz => {
                            return (
                                <QuizTile key={quiz.id} quiz={quiz} type="small" />
                            )
                        })}
                        </div>
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

            <button>right</button>
        </div>
    )
}
export default QuizCarousel;