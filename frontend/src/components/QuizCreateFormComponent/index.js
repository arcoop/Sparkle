import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { createQuiz } from '../../store/quizzes';
import './QuizCreateForm.css'
import Navigation from '../Navigation';

const QuizForm = () => {

    useEffect(() => {
        document.title = "Create a new quiz"
    })

    const [quizName, setQuizName] = useState("")
    const [quizType, setQuizType] = useState("Classic")
    const quizTypes = ["Classic", "Clickable", "Grid", "Map", "Picture Box", "Picture Click", "Slideshow"]
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false)
    const [id, setId] = useState(null)
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const quiz = {title: quizName, quizType: quizType}
        return dispatch(createQuiz(quiz))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                }
            })
            .then(async data => {
                setId(parseInt(Object.keys(data)[0]))
                setRedirect(true)
            })
    }

        if (redirect) return <Redirect to={`/create/edit/${id}`} />
    
    return (
        <div className='page'>
            <Navigation />
                <ul className="errors">
                    {errors.map(error => {
                        return (
                            <li className="error" key={error}>{error}</li>
                            )
                        })}
                </ul>

                
            <div id='page-container'>
                <h1 className='page-title'>Create a New Quiz</h1>
                <div id='form-container'>
                    <div id='quiz-form-container-left-col'>
                        <form className='quiz-create-form' onSubmit={handleSubmit}>
                            <div>
                                <label className='input-label'>Quiz Name
                                    <input id='quiz-name-input' 
                                    type="text"
                                    placeholder='Ideally 1-3 words, e.g. Digits of Pi'
                                    onChange={(e) => setQuizName(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className='input-label'>Similar Quizzes</label>
                                <div id='similar-quizzes'></div>
                            </div>
                            <label className='input-label'>Quiz Type
                                <div className='select-button'>
                                    <select name="dropdown" id="dropdown" onChange={e => setQuizType(e.target.value)}>
                                        {quizTypes.map(type => {
                                            return (
                                                <option className='dropdown-item' key={type} value={type}>{type}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </label>
                            <button className='submit-button' id="create-quiz" type='submit'>Create Quiz</button>
                        </form>
                    </div>

                    <div id='quiz-form-container-right-col'>
                        <div id="items">
                            <div>
                                <h2>Quizzes Remaining</h2>
                            </div>
                            <div>
                                <h2>Need Help?</h2>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default QuizForm