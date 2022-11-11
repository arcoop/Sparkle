import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchNumQuizzesAuthored, fetchQuiz, getQuiz } from "../../store/quizzes";
import { fetchUser, getUser } from "../../store/users";
import './QuizShow.css'
import CommentsCreate from "../CommentsCreateFormComponent";
import QuestionIndex from "../QuestionIndexComponent";
import { Link } from "react-router-dom";
import CommentsIndex from "../CommentsIndexComponent";
import ExtrasButton from "./ExtrasButton";
import { fetchNumQuizTakesByUser, fetchQuizTakesbyQuiz } from "../../store/quizTakes";
import { fetchComments } from "../../store/comments";
import { fetchQuestions } from "../../store/questions";
import Navigation from "../Navigation";
import Footer from "../Navigation/Footer";

const QuizShow = () => {
    const dispatch = useDispatch();
    const {quizId} = useParams();
    const [numUserQuizTakes, setNumUserQuizTakes] = useState();
    const [numQuizzesAuthored, setNumQuizzesAuthored] = useState()

    useEffect(() => {
        dispatch(fetchQuiz(quizId))
        dispatch(fetchComments(quizId))
        dispatch(fetchQuizTakesbyQuiz(quizId))
        dispatch(fetchQuestions(quizId))
    }, [quizId])
    
    const sessionUser = useSelector(state => state.session.user) || {}
    
    const quiz = useSelector(state => state.quizzes[quizId]) || {title: "", categoryId: 1};
    
    const image = quiz.iconUrl ? <img className="quiz-icon" src={quiz.iconUrl} alt="" /> : <img className="quiz-icon" src="https://cdn.writermag.com/2019/03/question-marks.jpg" alt="" />
    
    let categoryId = quiz.id ? quiz.category.categoryId : 1
    let categoryName = quiz.id ? quiz.category.categoryName : ""

    const quizComments = useSelector(state => Object.values(state.comments))
    
    // let category = useSelector(state => state.categories[categoryId]) || ""
    
    document.title = `${quiz.title}` || 'Sparkle'

    let takes = quiz.id ? quiz.takes : []
    let numTakes = takes.length;
    let plays = numTakes === 1 ? "play" : "plays"

    let commentsArr = quiz.id ? quiz.comments : [];
    let numComments = commentsArr.length;
    let comments = numComments === 1? "comment" : "comments"


    let username = quiz.id ? quiz.author.authorUsername : "loading"
    let userId = quiz.id ? quiz.author.authorId : []


    useEffect(() => {
        const getNumUserQuizTakes = async () => {
            setNumUserQuizTakes(await dispatch(fetchNumQuizTakesByUser(userId)))
        }
        const getNumQuizzesAuthored = async () => {
            setNumQuizzesAuthored(await dispatch(fetchNumQuizzesAuthored(userId)))
        }
        getNumUserQuizTakes()
        getNumQuizzesAuthored()
    }, [userId])

    const extrasbutton = sessionUser.id === quiz.authorId ? <ExtrasButton quiz={quiz} /> : ""

    return ( quiz.id &&
        <div className="page-wrapper">
            <Navigation />
            <div id="quiz-show-page-container">
                <div id="quiz-show-page">
                    <div id="left-side">
                        <div id="top-row">
                            <p className="quiz-category"><Link to={`/categories/${categoryId}`}>{categoryName}</Link></p>
                        </div>
                        <div id="top-level-info">
                            {image}
                            <div id="title-description">
                                <h1 className="quiz-title">{quiz.title}</h1>
                                <h2 className="quiz-description">{quiz.description}</h2>
                            </div>
                        </div>
                        <div id="mid-level-info">
                            <h3 className="mid-line" id="by-line">
                                By <Link id="quiz-show-username-link" to={`/users/${userId}`}>{username}</Link>
                            </h3>
                            {extrasbutton}
                            <h3 className="mid-line" id="num-plays">{numTakes} {plays}</h3>
                            <Link id="comments-link" className="mid-line" to="#comments">
                                <i id="comments-icon" className="fa-regular fa-message">
                                    <h3 id="num-comments">{numComments}</h3>
                                </i>
                            </Link>
                        </div>
                        <div id="more-info">
                            <div id="more-info-header">
                                <h4>More Info</h4>
                            </div>
                            <div id="quiz-type">
                                <p>{quiz.quizType}</p>
                            </div>
                        </div>
                        <QuestionIndex quiz={quiz}/>
                        <div id="#comments">
                            <CommentsIndex quizComments={quizComments} quizId={quizId}/>
                        </div>
                        <div id="post-comment-section">
                            <CommentsCreate />
                        </div>
                    </div>
                    <div id="right-side">
                        <div id="quiz-creator-spotlight" className="index-page-div">
                                <h3 className='right-div-quizzes-heading'>Quiz Creator Spotlight</h3>
                                <div className='right-div-quizzes-list'>
                                    <div id="user-spotlight-top-div">
                                        <div className="username-and-icon">
                                            <div className="creaor-spotlight-icon"></div>
                                            <Link to={`/users/${userId}`} className="creator-spotlight-username">{username}</Link>
                                        </div>
                                        <div></div>
                                    </div>
                                    <div id="user-spotlight-middle-div">
                                        <div id="user-spotlight-quizzes-created">
                                            <p className="mid-div-heading-text" id="quizzes-created-text">Quizzes Created</p>
                                            <div className="mid-div-text">{numQuizzesAuthored}</div>
                                        </div>
                                        <div id="user-spotlight-quizzes-played">
                                            <p className="mid-div-heading-text">Quizzes Played</p>
                                            <div className="mid-div-text">{numUserQuizTakes}</div>
                                        </div>
                                    </div>
                                    <div id="user-spotlight-bottom-div">
                                        <Link className="user-spotlight-bottom-div-link" to={`/users/${userId}`}>Creator Profile</Link>
                                        <i id="user-profile-arrow" className="fa-solid fa-angle-right"></i>
                                    </div>
                                </div>
                        </div>
                     </div>
                </div>
            </div>
            <Footer />
        </div>
    )
            

}

export default QuizShow;