import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './QuizCreate.css'

const QuizCreation = () => {

    useEffect(() => {
        document.title = "Quiz Management Dashboard"
    }, [])

    const sessionUser = useSelector(state => state.session.user)
    const PageContent = () => {
        if (sessionUser) {
            return (
                <div id="quiz-create-page-header-container">
                    <div id="quiz-create-page-top-row">
                        <h1 className="quiz-create-page-title">Quiz Management Dashboard</h1>
                        <div id="features">
                            {/* <div id="quiz-create-page-extras">
                                <button className="submit-button" id="create-page-extras-button">Extras</button>
                            </div> */}
                        </div>
                    </div>

                    <div id='button-box'>
                        <Link to={'/create/new'}>
                            <button className="submit-button" id='create-quiz-button'>Create a Sporlce Quiz</button>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div>Not Logged In</div>
            )
        }
    } 

    return (
        <div id='quiz-create-page-div'>
            <div id="top-box"></div>
            <PageContent />
        </div>
    )
}

export default QuizCreation;