import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchQuiz, getQuiz } from "../../store/quizzes";
import { fetchUser, getUser } from "../../store/users";
import './QuizShow.css'
import CommentsCreate from "../CommentsCreateFormComponent";
import QuestionIndex from "../QuestionIndexComponent";
import { Link } from "react-router-dom";
import CommentsIndex from "../CommentsIndexComponent";
import ExtrasButton from "./ExtrasButton";
import { fetchQuizTakes } from "../../store/quizTakes";
import { fetchComments } from "../../store/comments";

const QuizShow = () => {
    const dispatch = useDispatch();
    const {quizId} = useParams();
    
    let quiz = useSelector(getQuiz(quizId)) || {title: "", categoryId: 1};
    
    const image = quiz.iconUrl ? <img className="quiz-icon" src={quiz.iconUrl} alt="" /> : <></>
    
    const categoryId = quiz ? quiz.categoryId : 1
    
    let category = useSelector(state => state.categories[categoryId]) || ""
    
    document.title = `${quiz.title}` || 'Sparkle'
    
    useEffect(() => {
        dispatch(fetchQuiz(quizId))
        dispatch(fetchQuizTakes)
    }, [dispatch, quizId])
    

    let takes = quiz.id ? quiz.takes : []
    let numTakes = takes.length;
    let plays = numTakes === 1 ? "play" : "plays"

    let commentsArr = quiz.id ? quiz.comments : [];
    let numComments = commentsArr.length;
    let comments = numComments === 1? "comment" : "comments"
    
    let user = useSelector(getUser(quiz.authorId)) || {username:"", email:"", id: null}
    return (
        <div id="quiz-show-page-container">
            <div id="quiz-show-page">
                <div id="left-side">
                    <div id="top-row">
                        <p className="quiz-category">{category.name}</p>
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
                            By <Link id="quiz-show-username-link" to={`/users/${user.id}`}>{user.username}</Link> 
                        </h3>
                        <ExtrasButton author={user} quiz={quiz} />
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
                    <div id="quiz-div">

                        <div id="quiz-content-container">
                            {/* <div id="quiz-header">
                                <button id="play-quiz" className="submit-button">Play Quiz</button>
                                <div id="right-side-quiz-header">
                                    <h3 id="score">Score</h3>
                                    <h3 id="timer">Time: {quiz.quizTimer}:00</h3>
                                </div>
                            </div> */}
                            
                            <div id="quiz-content">
                                    <QuestionIndex quiz={quiz}/>
                            </div>
                        </div>
                    
                    </div>

                    <div id="#comments">
                        <CommentsIndex quizId={quizId}/>
                    </div>


                    <div id="post-comment-section">
                        <CommentsCreate />
                    </div>
                </div>
                <div id="right-side">
                </div>
                
            </div>
            
        </div>
    )
            

}

export default QuizShow;