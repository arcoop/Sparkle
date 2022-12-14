import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './QuizCreate.css'
import FormModal from "../AuthFormComponent";
import Navigation from "../Navigation";
import Footer from "../Navigation/Footer";

const QuizCreation = () => {

    useEffect(() => {
        document.title = "Quiz Management Dashboard"
    }, [])

    const sessionUser = useSelector(state => state.session.user) || {}
    if (sessionUser.id) {
        return (
            <div className="page-wrapper">
                <Navigation />
                <div id="quiz-create-page-div">
                        <div id="quiz-create-page-top-row">
                            <h1 className="quiz-create-page-title">Quiz Management Dashboard</h1>
                        </div>
                        <div id='button-box'>
                            <Link to={'/create/new'}>
                                <button className="submit-button" id='create-quiz-button'>Create a Sparkle Quiz</button>
                            </Link>
                        </div>
                </div>
                <Footer />
            </div>
        )
        } else {
            return (
                <div className="page-wrapper">
                    <Navigation />
                    <div className="quiz-create-not-logged-in-page">
                        <div className="quiz-create-not-logged-in">
                            <div className="not-logged-in-create-header">
                                <h1>Create Your Own Quizzes</h1>
                                <h3>Got a spark? Join Sparkle</h3>
                            </div>
                            <div className="not-logged-in-main">
                                <div className="not-logged-in-left">
                                    <ul className="quiz-promo-list">
                                        <li>
                                            <i className="ri-checkbox-circle-line"></i>
                                            <span>Create a quiz on any topic imagineable</span>
                                        </li>
                                        <li>
                                            <i className="ri-checkbox-circle-line"></i>
                                            <span>Share your quiz with friends and the world</span>
                                        </li>
                                    </ul>
                                    <div className="signup-form-modal-button">
                                        <FormModal type={"create-quiz-signup"}></FormModal>
                                        <div className="login-form-modal-button">
                                            <p className="already-sparkling">Already Sparkling?</p>
                                            <FormModal type={"create-quiz-login"}></FormModal>
                                        </div>
                                    </div>
                    
                    
                    
                                </div>
                                <div className="not-logged-in-right">
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
} 

export default QuizCreation;