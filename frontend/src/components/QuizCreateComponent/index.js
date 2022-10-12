// title          :string           not null
// #  quiz_type      :string           not null
// #  description    :text             not null
// #  quiz_timer     :integer          not null
// #  permalink      :string
// #  answer_type    :string           not null
// #  hint_heading   :string
// #  answer_heading :string
// #  extra_heading  :string
// #  category       :string           not null

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './QuizCreate.css'

const QuizCreation = () => {

    const sessionUser = useSelector(state => state.session.user)

    if (sessionUser) {
        return (
            <div id='main-div'>
               <div id="top-box"></div>
               <div id="main-content">
                <div id="form-container">
                    <div id="header-container">
                        <div id="top-row">
                            <h1 className="title">Quiz Management Dashboard</h1>
                            <div id="features">
                                <div id="extras">
                                    <button id="extras-button">Extras</button>
                                </div>
                            </div>
                        </div>
    
                        <div id='button-box'>
                            <Link to={'/create/new'}>
                                <button id='create-quiz-button'>Create a Sporlce Quiz</button>
                            </Link>
                        </div>
                    </div>
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