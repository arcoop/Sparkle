import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser, fetchUsers } from "../../store/users"
import { getUser } from "../../store/users"
import { Link } from "react-router-dom"
import './QuizTile.css'

const QuizTile = ({quiz, type}) => {

    let categoryId = quiz ? quiz.category.categoryId : 1

    let categoryName = quiz ? quiz.category.categoryName : ""

    let category = useSelector(state => state.categories[categoryId])

    category ||= {}

    quiz ||= {}
    let username = quiz ? quiz.author.authorUsername : "Loading username"
    let userId = quiz ? quiz.author.authorId : 1

    const image = quiz.iconUrl ? <img src={quiz.iconUrl} alt="" /> : <img className="quiz-icon" src="https://cdn.writermag.com/2019/03/question-marks.jpg" alt="" />

    const mediumQuizTile = <div className="quiz-tile">
                <Link className="link-to-quiz-show" to={`/quizzes/${quiz.id}`}>
                    <div className={`quiz-icon-tile medium`}>
                        {image}
                        <div className={`quiz-tile-title`}>{quiz.title}</div>
                        <div className="second-div"></div>
                        
                    </div>
                    <div className={`author-category-time`}>
                        <div className="quiz-tile-author">by {username}</div>
                        <div className="quiz-tile-cat">{categoryName}</div>
                        <div className="quiz-tile-time">{quiz.quizTimer}m</div>
                        <div className="hidden-div"></div>
                    </div>
                </Link>
                <div className="quiz-tile-description">{quiz.description}</div>
            </div>

    const mediumQuizTileCategory = <div className="quiz-tile">
                <Link className="link-to-quiz-show" to={`/quizzes/${quiz.id}`}>
                    <div className={`quiz-icon-tile medium`}>
                        {image}
                        <div className={`quiz-tile-title`}>{quiz.title}</div>
                        <div className="second-div"></div>
                        
                    </div>
                    <div className={`author-category-time`}>
                        <div className="quiz-tile-author">by {username}</div>
                        <div className="quiz-tile-cat">{categoryName}</div>
                        <div className="quiz-tile-time">{quiz.quizTimer}m</div>
                        <div className="hidden-div"></div>
                    </div>
                </Link>
                <div className="quiz-tile-description"></div>
            </div>

    
        
    const largeQuizTile = <div className="quiz-tile">
                <Link className="link-to-quiz-show" to={`/quizzes/${quiz.id}`}>
                    <div className={`quiz-icon-tile large`}>
                        {image}
                        <div className="large-quiz-info">
                            <div className={`quiz-tile-title-large`}>{quiz.title}</div>
                            <div className={`author-category-time-large`}>
                                <div className="quiz-tile-author">by {username}</div>
                                <div className="quiz-tile-cat">{categoryName}</div>
                                <div className="quiz-tile-time">{quiz.quizTimer}m</div>
                                <div className="hidden-div"></div>
                            </div>
                        </div>
                        
                    </div>
                </Link>
            </div>
    
    const smallQuizTile = <div className="small-quiz-tile">
                <Link className="small-link-to-quiz-show" to={`/quizzes/${quiz.id}`}>
                    <div className={`small-quiz-icon-tile`}>
                        {image}
                        <div className={`small-quiz-tile-title`}>{quiz.title}</div>
                        <div className="second-div"></div>
                        
                    </div>
                    <div className={`small-author-category-time`}>
                        <div className="quiz-tile-cat">{categoryName}</div>
                        <div className="quiz-tile-time">{quiz.quizTimer}m</div>
                        <div className="hidden-div"></div>
                    </div>
                </Link>
            </div>

    let tile;
    if (type === "small") tile = smallQuizTile
    if (type === "medium") tile = mediumQuizTile
    if (type === "large") tile = largeQuizTile
    if (type === "medium-cat-show") tile = mediumQuizTileCategory

    return (
        <> 
            {tile} 
        </>
    ) 
}

export default QuizTile;