import './QuizEditForm.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuiz, getQuiz, setQuiz, updateQuiz } from '../../store/quizzes'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const QuizEditForm = () => {
    const {quizId} = useParams()
    useEffect(() => {
        dispatch(fetchQuiz(quizId))
    }, [quizId])
    
    let quiz = useSelector(getQuiz(quizId)) || {title: "", quizType: ""};
    
    useEffect(() => {
        setQuizName(quiz.title)
        setQuizType(quiz.quizType)
    }, [quiz]);

    const [quizName, setQuizName] = useState(quiz.title)
    const [quizType, setQuizType] = useState(quiz.quizType)
    const quizTypes = ["Classic", "Clickable", "Grid", "Map", "Picture Box", "Picture Click", "Slideshow"]
    const [description, setDescription] = useState(`Can you name the ${quizName}?`)
    const [permalink, setPermalink] = useState(quizName)
    const [timer, setTimer] = useState("10:00")
    const times = []
    for (let i = 10; i < 26; i++) {
        times.push(i)
    }
    const [answerType, setAnswerType] = useState("answer")
    const [hintHeading, setHintHeading] = useState("Hint")
    const [answerHeading, setAnswerHeading] = useState("Answer")
    const [extraHeading, setExtraHeading] = useState("")
    const [category, setCategory] = useState("no category chosen")
    const categories = [
        "no category chosen",
        "Entertainment",
        "Gaming",
        "Geography",
        "History",
        "Holiday",
        "Just For Fun",
        "Language",
        "Literature",
        "Miscellaneous",
        "Movies",
        "Music",
        "Religion",
        "Science",
        "Sports",
        "Television"
    ]
    
    const [sourceURL, setSourceURL] = useState("")
    const [crossLinkURL, setCossLinkURL] = useState("")
    const [moreInfo, setMoreInfo] = useState("")
    
    const dispatch = useDispatch();

    
    const handleSubmit = e => {
        e.preventDefault()
        quiz = {title: quizName, quizType: quizType, description: description, quizTimer: timer, permalink: permalink, answerType: answerType, hintHeading: hintHeading, answerHeading: answerHeading, extraHeading: extraHeading, category: category}
        quiz.id = quizId
        console.log("dispatching")
        return dispatch(updateQuiz(quiz))
    }
    
    return (
        <div id='edit-management-form'> 
            <h1 id='quiz-name-heading'>{quizName}</h1>
            <div className='tab'>
                <button className='tablinks'>Quiz Edit</button>
                <button className='tablinks'>Options</button>
            </div>

            <div id='quiz-edit-tab' className='tab-form'>
                <form className='form' onSubmit={handleSubmit}>

                    {/* <table id='quiz-info'>
                        <tbody>
                            <tr>
                                <td>Quiz Type:</td>
                                <td>
                                    <select name="dropdown" id='type-select-options' onChange={e => setQuizType(e.target.value)}>
                                    {quizTypes.map(type => {
                                        return (
                                            <option key={type} value={type}>{type}</option>
                                        )
                                    })}
                                    </select>
                                </td>

                                <td><Link>How To</Link></td>
                            </tr>

                            <tr>
                                <td>Quiz Name:</td>
                                <td>
                                <input type="text" 
                                value={quizName}
                                onChange={e => setQuizName(e.target.value)}
                            />
                                </td>
                            </tr>


                        </tbody>

    
                    </table> */}

                    <div className='main-inputs'>
                       
                        <table>
                            <tbody>
                                <tr>
                                    <td>Quiz Type</td>
                                    <td>
                                        <select name="dropdown" id='type-select-options' onChange={e => setQuizType(e.target.value)}>
                                            {quizTypes.map(type => {
                                                return (
                                                    <option key={type} value={type}>{type}</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr><td>Quiz Name</td>
                                    <td>
                                        <input type="text"
                                        value={quizName}
                                        onChange={e => setQuizName(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr> <td>Description</td>
                                    <td>
                                        <input type="text"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr> <td>Permalink</td>
                                    <td>
                                        <input type="text"
                                        value={permalink}
                                        onChange={e => setPermalink(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr> <td>Quiz Timer</td>
                                    <td>
                                        <select name="dropdown" id="timer-select-options" onChange={e => setTimer(e.target.value)}>
                                            {times.map(time => {
                                                return (
                                                    <option key={time} value={time}>{`${time}:00`}</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr> <td>Answer type</td>
                                    <td>
                                        <input type="text"
                                        value={answerType}
                                        onChange={e => setAnswerType(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr> <td>Hint Heading</td>
                                <td>
                                    <input type="text"
                                        value={hintHeading}
                                        onChange={e => setHintHeading(e.target.value)}
                                        />
                                </td>
                                </tr>
                                <tr> <td>Answer Heading</td>
                                <td>
                                    <input type="text"
                                        value={answerHeading}
                                        onChange={e => setAnswerHeading(e.target.value)}
                                        />
                                </td>
                                </tr>
                                <tr> <td>Extra Heading</td>
                                <td>
                                    <input type="text"
                                        value={extraHeading}
                                        onChange={e => setExtraHeading(e.target.value)}
                                        />
                                </td>
                                </tr>
                                <tr> <td>Category</td>
                                    <td>
                                        <select name="dropdown" id="category-select-options" onChange={e => setCategory(e.target.value)}>
                                            {categories.map(cat => {
                                                return (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                )
                                            })}
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <button id='save-changes' type='submit'>Save Changes</button>

                    </div>

                    <div className='extras'>
                        <table>
                            <tbody>
                                <tr> <td>Source URL (optional)</td>
                                    <td>
                                        <input type="text"
                                        value={sourceURL}
                                        onChange={e => setSourceURL(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr> <td>Cross Link URL</td>
                                    <td>
                                        <input type="text"
                                        value={crossLinkURL}
                                        onChange={e => setCossLinkURL(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr> <td>More info</td>
                                    <td>
                                        <input type="textarea"
                                        value={moreInfo}
                                        onChange={e => setMoreInfo(e.target.value)}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                    </div>

                  
                </form>
                

                
            </div>
        </div>
    )
}
export default QuizEditForm;