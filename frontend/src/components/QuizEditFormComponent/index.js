import './QuizEditForm.css'
import { Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuiz, getQuiz, setQuiz, updateQuiz } from '../../store/quizzes'
import { useEffect, useRef, useState } from 'react'
import QuestionsForm from '../QuestionsFormComponent'
import { Link } from 'react-router-dom'

const QuizEditForm = () => {
    const {quizId} = useParams()

    let quiz = useSelector(getQuiz(quizId)) || {title: "", quizType: "", id: 1};

    useEffect(() => {
        dispatch(fetchQuiz(quizId))
        document.title = `Editing ${quiz.title}`
    }, [quizId])
    
    
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
    const [category, setCategory] = useState(quiz.category)
    const [redirect, setRedirect] = useState(false)
    
    const categories = [
        [0,"no category chosen"],
        [1, "Entertainment"],
        [2, "Gaming"], 
        [3, "Geography"],
        [4, "History"],
        [5, "Holiday"],
        [6, "Just For Fun"],
        [7, "Language"],
        [8, "Literature"],
        [9, "Miscellaneous"],
        [10, "Movies"],
        [11, "Music"],
        [12, "Religion"],
        [13, "Science"],
        [14, "Sports"],
        [15,"Television"]
    ]
    
    const [sourceURL, setSourceURL] = useState("")
    const [crossLinkURL, setCossLinkURL] = useState("")
    const [moreInfo, setMoreInfo] = useState("")
    const [quizIcon, setQuizIcon] = useState(null);
    const [quizIconUrl, setQuizIconUrl] = useState(null)
    const [errors, setErrors] = useState([])
    const fileRef = useRef(null);
    
    const dispatch = useDispatch();

    const handleFile = e => {
        const file = e.currentTarget.files[0];
        if (file) {
            const fileReader = new FileReader();
            console.log(fileReader.result)
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setQuizIcon(file)
                setQuizIconUrl(fileReader.result);
            };
        }
    }

    
    const handleSubmit = e => {
        e.preventDefault()
        setErrors([])
        const formData = new FormData();
        formData.append('quiz[title]', quizName)
        formData.append('quiz[quiz_type]', quizType);
        formData.append('quiz[category_id]', category[0]);
        formData.append('quiz[description]', description);
        formData.append('quiz[quiz_timer]', timer);
        if (quizIcon) formData.append('quiz[icon]', quizIcon)
        if (quizId) {
            formData.append('quiz[id]', quizId)
            dispatch(updateQuiz(formData))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors)
                    }
                })
                .then(async data => {
                    setRedirect(true)
                })
        }

    }

    const preview = quizIconUrl ? <img id='quiz-icon-preview' src={quizIconUrl} alt=""/> : <div id='quiz-icon-preview'></div>;

    const handleClick = (tab) => {
        if (tab === "quiz-edit") {
            setPresentationTabClassName("display-none")
            setQuestionsTabClassName("display-none")
            setEditTabClassName('tab-form')
            setEditButton("active")
            setPresentationButton("tablinks")
            setQuestionsButton("tablinks")
        } else if (tab === 'presentation') {
            setEditTabClassName("display-none")
            setQuestionsTabClassName("display-none")
            setPresentationTabClassName('tab-form')
            setPresentationButton("active")
            setEditButton("tablinks")
            setQuestionsButton("tablinks")
        } else if (tab === "questions") {
            setQuestionsTabClassName("tab-form")
            setPresentationTabClassName("display-none")
            setEditTabClassName("display-none")
            setPresentationButton("tablinks")
            setEditButton("tablinks")
            setQuestionsButton("active")
        }
    }

    const [editTabClassName, setEditTabClassName] = useState('tab-form')
    const [presentationTabClassName, setPresentationTabClassName] = useState('display-none')
    const [editButton, setEditButton] = useState("active")
    const [presentationButton, setPresentationButton] = useState("tablinks")
    const [questionsTabClassName, setQuestionsTabClassName] = useState('display-none')
    const [questionsButton, setQuestionsButton] = useState('tablinks')

    if (redirect) return <Redirect to={`/quizzes/${quizId}`} />

    return (

        <div id='edit-form-container'>
            <div id='edit-management-form'>

                <div id='quiz-edit-top-level-info'>
                    <h1 id='quiz-name-heading'>{quiz.title}</h1>
                    <div id='view-quiz-text'>Quiz Link:
                        <Link id='view-quiz-link' to={`/quizzes/${quizId}`}>
                            <button id='view-quiz-button'>View Quiz</button>
                        </Link>
                    </div>
                </div>
                <div className='tab'>
                    <button onClick={() => handleClick('quiz-edit')} id='quiz-edit-tab-button' className={editButton}>Quiz Edit</button>
                    <button onClick={() => handleClick('presentation')} id="presentation-tab-button" className={presentationButton}>Presentation</button>
                    <button onClick={() => handleClick('questions')} id="presentation-tab-button" className={questionsButton}>Questions</button>
                </div>
                <div id='quiz-edit-tab' className={editTabClassName}>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='main-inputs'>
            
                            <table id='quiz-edit-table'>
                                <tbody id='quiz-edit-table-body'>
                                    <tr className='table-row'>
                                        <td className="row-heading">Quiz Type</td>
                                        <td className='row-info'>
                                            <select className='quiz-edit-input' name="dropdown" id='type-select-options' onChange={e => setQuizType(e.target.value)}>
                                                {quizTypes.map(type => {
                                                    return (
                                                        <option key={type} value={type}>{type}</option>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr className='table-row'><td className="row-heading">Quiz Name</td>
                                        <td className='row-info'>
                                            <input type="text"
                                            className='quiz-edit-input'
                                            value={quizName}
                                            onChange={e => setQuizName(e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                    <tr className='table-row'> 
                                        <td className='row-heading'>Description</td>
                                        <td className='row-info'>
                                            <input type="text"
                                            id='desription-input'
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            />
                                        </td>
                                    </tr>

                                    <tr className='table-row'> <td className="row-heading">Quiz Timer</td>
                                        <td className='row-info'>
                                            <select className='quiz-edit-input' name="dropdown" id="timer-select-options" onChange={e => setTimer(e.target.value)}>
                                                {times.map(time => {
                                                    return (
                                                        <option key={time} value={time}>{`${time}:00`}</option>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                    </tr>
                                    {/* <tr className='table-row'> <td className="table-heading">Answer type</td>
                                        <td>
                                            <input type="text"
                                            value={answerType}
                                            onChange={e => setAnswerType(e.target.value)}
                                            />
                                        </td>
                                    </tr> */}
                                    {/* <tr className='table-row'> <td className="table-heading">Hint Heading</td>
                                    <td>
                                        <input type="text"
                                            value={hintHeading}
                                            onChange={e => setHintHeading(e.target.value)}
                                            />
                                    </td>
                                    </tr> */}
                                    {/* <tr className='table-row'> <td className="table-heading">Answer Heading</td>
                                    <td>
                                        <input type="text"
                                            value={answerHeading}
                                            onChange={e => setAnswerHeading(e.target.value)}
                                            />
                                    </td>
                                    </tr> */}
                                    {/* <tr className='table-row'> 
                                        <td className="row-heading">Extra Heading</td>
                                        <td className='row-info'>
                                            <input type="text"
                                                value={extraHeading}
                                                onChange={e => setExtraHeading(e.target.value)}
                                                />
                                            </td>
                                    </tr> */}
                                    <tr className='table-row'> <td className="row-heading">Category</td>
                                        <td className='row-info'>
                                            <select className='quiz-edit-input' name="dropdown" id="category-select-options" onChange={e => setCategory(e.target.value)}>
                                                {categories.map(cat => {
                                                    return (
                                                        <option key={cat} value={cat}>{cat[1]}</option>
                                                    )
                                                })}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='save'>
                                <button className='submit-button' id='save-changes' type='submit'>Save Changes</button>
                                <p id='save-text'>You must click 'Save Changes' to save your changes</p>
                            </div>
                        </div>
                        {/* <div className='extras'>
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
                        </div> */}
            
                    </form>
            
                </div>
                <div id='presentation-tab' className={presentationTabClassName}>
                    <form className='presentation-tab-form' onSubmit={handleSubmit}>
                        <label id='quiz-icon-div' className='input-label'>
                            <p id='quiz-icon-label'>Quiz Icon</p>
                            <input className='upload-image-button' type="file" onChange={handleFile}/>
                        </label>
                        <div id='image-preview-and-save'>
                            {preview}
                            <button className="submit-button" id='save-changes' type='submit'>Save Changes</button>
                        </div>
                    </form>
                </div>

                <div id='questions-tab' className={questionsTabClassName}>
                    <div className='questions-form'>
                        <QuestionsForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default QuizEditForm;