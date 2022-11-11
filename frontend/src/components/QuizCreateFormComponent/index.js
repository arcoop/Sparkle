import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { createQuiz, searchQuizzes } from '../../store/quizzes';
import './QuizCreateForm.css'
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

const QuizForm = () => {

    useEffect(() => {
        document.title = "Create a new quiz"
    })
    
    const dispatch = useDispatch();
    const [quizName, setQuizName] = useState("")
    const [quizType, setQuizType] = useState("Classic")
    const quizTypes = ["Classic"]
    //future quiz types
    // "Clickable", "Grid", "Map", "Picture Box", "Picture Click", "Slideshow"]
    const [redirect, setRedirect] = useState(false)
    const [id, setId] = useState(null)
    const [errors, setErrors] = useState([])
    const [quizDescription, setQuizDescription] = useState("")
    // const [quizCategory, setQuizCategory] = useState(1)
    useEffect(() => {
        dispatch(searchQuizzes(quizName))
    }, [quizName])

    const quizzes = useSelector(state => Object.values(state.quizzes))

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        
        formData.append('quiz[title]', quizName);
        formData.append('quiz[quiz_type]', quizType);
        formData.append('quiz[description]', quizDescription)
        formData.append('quiz[category_id]', 1);

        dispatch(createQuiz(formData))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                }
            })
            .then(async data => {
                setId((Object.keys(data)[0]))
                setRedirect(true)
                // setQuizIcon(null)
                // setQuizIconUrl(null)
                // fileRef.current.value=null;
            })
    }

    if (redirect) return <Redirect to={`/create/edit/${id}`} />

    // const preview = quizIconUrl ? <img src={quizIconUrl} alt=""/> : <></>;

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
                                <div id='similar-quizzes'>
                                    <ul>
                                        {quizName.length > 1 && quizzes.map(quiz => {
                                            return (
                                                <li key={quiz.id}><Link to={`/quizzes/${quiz.id}`}>{quiz.title}</Link></li>
                                            )
                                        })}
                                    </ul>
                                </div>
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
                            {/* <label className='input-label'>Quiz Icon */}
                                {/* <input type="file" onChange={handleFile}/>
                            </label>
                            {preview} */}
                            <button className='submit-button' id="create-quiz" type='submit'>Create Quiz</button>
                        </form>
                    </div>

                    {/* <div id='quiz-form-container-right-col'>
                        <div id="items">
                            <div>
                                <h2>Quizzes Remaining</h2>
                            </div>
                            <div>
                                <h2>Need Help?</h2>
                            </div>
                        </div>

                    </div> */}
                </div>
            </div>
        </div>
    )

}

export default QuizForm