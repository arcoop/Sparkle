import { useState } from 'react'
import { useDispatch } from 'react-redux';
// import { Redirect, useHistory } from 'react-router-dom'
import { createQuiz } from '../../store/quizzes';
import './QuizCreateForm.css'
// import { useHistory } from "react-router-dom/cjs/react-router-dom"


const QuizForm = ({props}) => {
    const [quizName, setQuizName] = useState("")
    const [quizType, setQuizType] = useState("Classic")
    const quizTypes = ["Classic", "Clickable", "Grid", "Map", "Picture Box", "Picture Click", "Slideshow"]
    const dispatch = useDispatch();
    // const [redirect, setRedirect] = useState(false)
    // const navigate = useNavigate()
    // const history = useHistory();
    // redirect state defaults to false

    // useEffect(() => {
    //     <Redirect to={"/"}/>
    // }, [redirect])
    console.log(props)

    const handleSubmit = (e) => {
        e.preventDefault()
        const quiz = {title: quizName, quizType: quizType}
        return dispatch(createQuiz(quiz))
            .then(async data => {
                console.log(data)
                const id = Object.values(data)[0].id
                console.log(id)
                // history.push(`/create/edit/${id}`)
                // setRedirect(true)
            })
        }
        // return <Redirect to={`/create/edit/${id}`} />
        

        //redirect if redirect is true

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