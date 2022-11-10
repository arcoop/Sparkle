import './QuizCarousel.css'
import QuizTile from '../QuizTileComponent'
import { useEffect, useState } from 'react'

const QuizCarousel = ({quizzes}) => {
    const carouselA = quizzes.slice(0,6)
    const carouselB = quizzes.slice(6, 13)

    const [currentCarouselClass, setCurrentCarouselClass] = useState('carousel')
    const [hiddenCarouselClass, setHiddenCarouselClass] = useState('hidden')
    const [carouselIndex, setCarouselIndex] = useState(0)
    const [showingCarousel, setShowingCarousel] = useState(carouselA)
    const [otherCarousel, setOtherCarousel] = useState(carouselB)
    const [carouselPosition, setCarouselPosition] = useState(0)
    const [carouselBClass, setCarouselBClass] = useState("carousel hidden")
    const [carouselAClass, setCarouselAClass] = useState("carousel")
    
    
    const handleLeftClick = () => {
        if (carouselAClass === "carousel right" || carouselAClass === "carousel left" || carouselAClass === "carousel hidden") {
            setCarouselAClass("carousel from-right")
            setShowingCarousel(carouselA)
        } else setCarouselAClass("carousel left")
        if (carouselBClass === "carousel from-right") {
            setCarouselBClass("carousel left")
            setShowingCarousel(carouselA)
            setOtherCarousel(carouselB)
        } else {
            setCarouselBClass("carousel from-right")
            setShowingCarousel(carouselB)
            setOtherCarousel(carouselA)
        }

    }
    

    const handleRightClick = async () => {
        if (carouselAClass === "carousel right" || carouselAClass === "carousel left" || carouselAClass === "carousel hidden") {
            setCarouselAClass("carousel from-left")
            setShowingCarousel(carouselA)
            setOtherCarousel(carouselB)
        } else setCarouselAClass("carousel right")
        if (carouselBClass === "carousel from-left") {
            setCarouselBClass("carousel right")
            setShowingCarousel(carouselA)
            setOtherCarousel(carouselB)
        } else {
            setCarouselBClass("carousel from-left")
            setShowingCarousel(carouselB)
            setOtherCarousel(carouselA)
        }
    }

    return (
        <div className='carousel-container'>
            <button className='arrow-button left' onClick={handleLeftClick}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="carousel-array-container" >
                <div id='carousel-slide2' className={carouselAClass}>
                    {showingCarousel.map(quiz => {
                        return (
                            <QuizTile key={quiz.id} quiz={quiz} type="small" />
                        )
                    })}
                    {/* {carouselPosition === 1 && carouselB.map(quiz => {
                        return (
                            <QuizTile key={quiz.id} quiz={quiz} type="small" />
                        )
                    })} */}
                    
                </div>
                <div id='carousel-slide2' className={carouselBClass}>
                    {otherCarousel.map(quiz => {
                        return (
                            <QuizTile key={quiz.id} quiz={quiz} type="small" />
                        )
                    })}
                    {/* {carouselPosition === 1 && carouselA.map(quiz => {
                        return (
                            <QuizTile key={quiz.id} quiz={quiz} type="small" />
                        )
                    })} */}
                </div>

            </div>
            <button className='arrow-button right' onClick={handleRightClick}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>

    )
}
export default QuizCarousel;