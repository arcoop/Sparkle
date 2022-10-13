import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { createQuiz } from '../../store/quizzes';
import './QuizCreateForm.css'

const QuizForm = ({props}) => {
    const [quizName, setQuizName] = useState("")
    const [quizType, setQuizType] = useState("Classic")
    const quizTypes = ["Classic", "Clickable", "Grid", "Map", "Picture Box", "Picture Click", "Slideshow"]
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false)
    const [id, setId] = useState(null)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const quiz = {title: quizName, quizType: quizType}
        return dispatch(createQuiz(quiz))
            .then(async data => {
                console.log(data)
                // console.log(typeof parseInt(Object.keys(data)[0]))
                setId(parseInt(Object.keys(data)[0]))
                // console.log(id)
                // history.push(`/create/edit/${id}`)
                setRedirect(true)
            })
    }

        if (redirect) return <Redirect to={`/create/edit/${id}`} />
    
    return (
        <div id='quiz-form-container'>

            <form className='quiz-create-form' onSubmit={handleSubmit}>
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
                                    <option key={type} value={type}>{type}</option>
                                )
                            })}
                        </select>

                    </div>
                </label>

                <button type='submit'>Create Quiz</button>

            </form>

        </div>
    )

}

export default QuizForm