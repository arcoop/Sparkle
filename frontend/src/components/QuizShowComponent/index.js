import { useEffect, useState } from "react";
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
import { fetchQuizTakesbyQuiz } from "../../store/quizTakes";
import { fetchComments } from "../../store/comments";
import { fetchQuestions } from "../../store/questions";

const QuizShow = () => {
    const dispatch = useDispatch();
    const {quizId} = useParams();

    useEffect(() => {
        dispatch(fetchQuiz(quizId))
        dispatch(fetchComments(quizId))
        dispatch(fetchQuizTakesbyQuiz(quizId))
        dispatch(fetchQuestions(quizId))
    }, [quizId])
    
    const sessionUser = useSelector(state => state.session.user) || {}
    
    const quiz = useSelector(state => state.quizzes[quizId]) || {title: "", categoryId: 1};
    
    const image = quiz.iconUrl ? <img className="quiz-icon" src={quiz.iconUrl} alt="" /> : <img className="quiz-icon" src="https://cdn.writermag.com/2019/03/question-marks.jpg" alt="" />
    
    const categoryId = quiz ? quiz.categoryId : 1

    const quizComments = useSelector(state => Object.values(state.comments))
    
    let category = useSelector(state => state.categories[categoryId]) || ""
    
    document.title = `${quiz.title}` || 'Sparkle'

    let takes = quiz.id ? quiz.takes : []
    let numTakes = takes ? takes.length : 0
    let plays = numTakes === 1 ? "play" : "plays"

    let commentsArr = quiz.id ? quiz.comments : [];
    let numComments = commentsArr ? commentsArr.length : 0;
    let comments = numComments === 1? "comment" : "comments"
    
    //let user = useSelector(() => getUser(quiz.authorId)) || {username:"", email:"", id: null}
    let user = useSelector(state => state.users[quiz.authorId]) || {username:"", email:""}
    // console.log(user)

    const extrasbutton = sessionUser.id === quiz.authorId ? <ExtrasButton author={user} quiz={quiz} /> : ""

    return (
        <div id="quiz-show-page-container">
            <div id="quiz-show-page">
                <div id="left-side">
                    <div id="top-row">
                        <p className="quiz-category"><Link to={`/categories/${category.id}`}>{category.name}</Link></p>
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
                        <CommentsIndex quizComments={quizComments} quizId={quizId}/>
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