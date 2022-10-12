import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './QuizForm.css'

const QuizForm = () => {
    const {quizId} = useParams();
    // const quiz = 
    const [quizName, setQuizName] = useState("")

    return (
        <div id='quiz-form-container'>

            <form className='quiz-create-form'>
                <label>Quiz Name
                    <input type="text"
                    //  onChange={() }
                    />

                </label>

            </form>

        </div>
    )

}

export default QuizForm