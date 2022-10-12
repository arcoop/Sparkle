import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getQuiz } from '../../store/quizzes';
import { Link } from 'react-router-dom';
import './QuizCreateForm.css'

const QuizForm = () => {
    const [quizName, setQuizName] = useState("")
    const [quizType, setQuizType] = useState("Classic")
    const quizTypes = ["Classic", "Clickable", "Grid", "Map", "Picture Box", "Picture Click", "Slideshow"]

    return (
        <div id='quiz-form-container'>

            <form className='quiz-create-form'>
                <label>Quiz Name
                    <input type="text"
                    onChange={(e) => setQuizName(e.target.value)}
                    />
                </label>

                <label>Quiz Type
                    <div id='backdrop'>
                        <select name="dropdown" id="" onChange={e => setQuizType(e.target.value)}>
                            {quizTypes.map(type => {
                                return (
                                    <option value={type}>{type}</option>
                                )
                            })}
                        </select>
                        <div></div>

                    </div>
                </label>

                <Link to={'create/edit/'}>
                    <button type='submit'>Create Quiz</button>
                </Link>
            </form>

        </div>
    )

}

export default QuizForm