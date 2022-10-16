import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchComments, getComments, updateComment } from "../../store/comments"
import { Link } from "react-router-dom"
import { fetchUser, getUser } from "../../store/users"
import './CommentTile.css'

const CommentTile = ({comment}) => {
    const dispatch = useDispatch()

    const userId = comment.commenterId
    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [])
    
    const sessionUser = useSelector(state => state.session.user)
    const commenter = useSelector(getUser(userId))
    const [numPoints, setNumPoints] = useState(comment.points)
    const commenterUsername = commenter ? commenter.username : ""

    let pointsText;
    if (numPoints === 1) {
        pointsText = 'point'
    } else pointsText = 'points'

    const commentButtonMenu = () => {
        let button1;
        let button2;
        let button3 = "Report"
        if (sessionUser === commenter) {
            button1 = "Edit"
            button2 = "Delete"
        } else {
            button1 = ""
            button2 = ""
        }
        return (
            <div>
                <button>{button1}</button>
                <button>{button2}</button>
                <button>{button3}</button>
            </div>
        )
    }

    const handleVote = (type) => {
        setNumPoints( type === "up" ? numPoints + 1 : numPoints -1)
        comment.points = numPoints
        comment.body = comment.body
        dispatch(updateComment(comment))
    }

    return (
        <div className="comment-tile">
            <div className="comment-left-section">
                <div className="comment-icon-section"> 
                    <div className="icon-top">
                        <div className="icon-link">
                            <Link className="link-user-profile" to={`/users/${userId}`}>
                                <i id="commenter-user-icon" className="fa-regular fa-user"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="icon-bottom"></div> 
                </div>
                <div className="comment-body-section">
                    <div className="comment-top-level-info">
                        <Link className="commenter-username" to={`/users/${userId}`}>{commenterUsername}</Link>
                        <div className="comment-time">10 minutes ago</div>
                    </div>
                    <div className="comment-body">{comment.body}</div>
                    <div className="comment-points">
                        <button onClick={() => handleVote("up")} className="vote"><i className="fa-regular fa-thumbs-up"></i></button>
                        <button onClick={() => handleVote("down")} className="vote"><i className="fa-regular fa-thumbs-down"></i></button>
                        <p className="num-points">{numPoints} {pointsText}</p>
                    </div>
                </div>
            </div>

            <div className="side-comment-tile">
                <button><i className="fa-solid fa-ellipsis"></i></button>
            </div>
        </div>
    )

}

export default CommentTile;