import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './QuizCreate.css'

const QuizCreation = () => {

    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) {
        return (
            <div id='quiz-create-page-div'>
                <div id="top-box"></div>
                <div id="quiz-create-page-header-container">
                    <div id="quiz-create-page-top-row">
                        <h1 className="quiz-create-page-title">Quiz Management Dashboard</h1>
                        <div id="features">
                            <div id="quiz-create-page-extras">
                                <button className="submit-button" id="create-page-extras-button">Extras</button>
                            </div>
                        </div>
                    </div>

                    <div id='button-box'>
                        <Link to={'/create/new'}>
                            <button className="submit-button" id='create-quiz-button'>Create a Sporlce Quiz</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    
    } else {
        return (
            <div>
                <p>not logged in</p>
            </div>
        )
    }

}

export default QuizCreation;