import './QuizEditForm.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuiz, getQuiz, setQuiz, updateQuiz } from '../../store/quizzes'
import { useEffect, useRef, useState } from 'react'

const QuizEditForm = () => {
    const {quizId} = useParams()
    console.log(quizId)

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
    const [category, setCategory] = useState("no category chosen")
    
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
        }

    }

    const preview = quizIconUrl ? <img src={quizIconUrl} alt=""/> : <></>;

    const [tabClass, setTabClass] = useState('tab-form')

    const handleClick = (tab) => {
        if (tab === "presentation") {
            setPresentationTabClassName("display-none")
            setEditTabClassName('tab-form')
            setEditButton("active")
            setPresentationButton("tablinks")
        } else if (tab === 'quiz-edit') {
            setEditTabClassName("display-none")
            setPresentationTabClassName('tab-form')
            setPresentationButton("active")
            setEditButton("tablinks")
        }
    }

    const [editTabClassName, setEditTabClassName] = useState('tab-form')
    const [presentationTabClassName, setPresentationTabClassName] = useState('display-none')
    const [editButton, setEditButton] = useState("active")
    const [presentationButton, setPresentationButton] = useState("tablinks")

    return (
        <div id='edit-management-form'> 
            <h1 id='quiz-name-heading'>{quiz.title}</h1>
            <div className='tab'>
                <button onClick={() => handleClick('presentation')} id='quiz-edit-tab-button' className={editButton}>Quiz Edit</button>
                <button onClick={() => handleClick('quiz-edit')} id="presentation-tab-button" className={presentationButton}>Presentation</button>
            </div>

            <div id='quiz-edit-tab' className={editTabClassName}>
                <form className='form' onSubmit={handleSubmit}>

                    <div className='main-inputs'>
                       
                        <table id='quiz-edit-table'>
                            <tbody id='quiz-edit-table-body'> 
                                <tr>
                                    <td className="table-heading">Quiz Type</td>
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
                                <tr><td className="table-heading">Quiz Name</td>
                                    <td>
                                        <input type="text"
                                        value={quizName}
                                        onChange={e => setQuizName(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr> <td className='table-heading'>Description</td>
                                    <td>
                                        <input type="text"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr> <td className='table-heading'>Permalink</td>
                                    <td>
                                        <input type="text"
                                        value={permalink}
                                        onChange={e => setPermalink(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr> <td className="table-heading">Quiz Timer</td>
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
                                <tr> <td className="table-heading">Answer type</td>
                                    <td>
                                        <input type="text"
                                        value={answerType}
                                        onChange={e => setAnswerType(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr> <td className="table-heading">Hint Heading</td>
                                <td>
                                    <input type="text"
                                        value={hintHeading}
                                        onChange={e => setHintHeading(e.target.value)}
                                        />
                                </td>
                                </tr>
                                <tr> <td className="table-heading">Answer Heading</td>
                                <td>
                                    <input type="text"
                                        value={answerHeading}
                                        onChange={e => setAnswerHeading(e.target.value)}
                                        />
                                </td>
                                </tr>
                                <tr> <td className="table-heading">Extra Heading</td>
                                <td>
                                    <input type="text"
                                        value={extraHeading}
                                        onChange={e => setExtraHeading(e.target.value)}
                                        />
                                </td>
                                </tr>
                                <tr> <td className="table-heading">Category</td>
                                    <td>
                                        <select name="dropdown" id="category-select-options" onChange={e => setCategory(e.target.value)}>
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
                    <label className='input-label'>Quiz Icon
                        <input type="file" onChange={handleFile}/>
                    </label>
                    {preview}
                    <button className="submit-button" id='save-changes' type='submit'>Save Changes</button>
                </form>
            </div>


        </div>
    )
}
export default QuizEditForm;