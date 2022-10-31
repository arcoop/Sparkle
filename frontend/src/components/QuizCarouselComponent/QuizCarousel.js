import './QuizCarousel.css'
import QuizTile from '../QuizTileComponent'

const QuizCarousel = ({quizzes}) => {

    const numIndeces = quizzes.length / 6

    return (
        <div className='carousel-container'>
            {quizzes.map((quiz, idx) => {
                return (
                    <div >Quiz</div>
                )
            })}
        </div>
    )
}
export default QuizCarousel;