import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchComments, updateComment } from "../../store/comments"
import { Link } from "react-router-dom"
import { fetchUser, getUser } from "../../store/users"
import './CommentTile.css'
import ExtrasButton from "./ExtrasButton"
import CommentsUpdateForm from "../CommentsUpdateFormComponent"
import { deleteComment } from "../../store/comments"
import { createLike, deleteLike, fetchLikes, removeLike, updateLike } from "../../store/likes"

const CommentTile = ({comment}) => {
    const dispatch = useDispatch();
    
    const commenterId = comment.commenter.commenterId
    const commenterName = comment.commenter.commenterUsername
    
    // useEffect(() => {
    //     dispatch(fetchUser(userId))
    // }, [])
    
    // const commenter = useSelector(state => state.users[userId])
    const sessionUser = useSelector(state => state.session.user) || {}
    
    const commentLikes = useSelector(state => Object.values(state.likes))
    const numUpvotes = commentLikes.filter(like => like.commentId === comment.id && like.likeType === true).length
    const numDownvotes = commentLikes.filter(like => like.commentId === comment.id && like.likeType === false).length
    const [numLikes, setNumLikes] = useState(numUpvotes - numDownvotes);
    const [upButtonClass, setUpButtonClass] = useState("vote")
    const [downButtonClass, setDownButtonClass] = useState("vote")
    
    //const [numPoints, setNumPoints] = useState(comment.points)
    // const commenterUsername = commenter ? commenter.username : ""
    // const [showMenu, setShowMenu] = useState(false)
    const [editing, setEditing] = useState(false)
    //const [numLikes, setNumLikes] = useState(commentLikes.length)
  
        
        const formatTime = date => {
            
            const start = new Date(date)
            
            const now = new Date()
            
            let timeText; 
            let finalTimeDiff;
            let elapsedTime = now - start
            elapsedTime /= 1000
            if (Math.round(elapsedTime / 86400) >= 1) {
                finalTimeDiff = Math.round(elapsedTime /= 86400)
                timeText = finalTimeDiff === 1 ? "day" : "days"
            } else if (Math.round(elapsedTime / 3600) >= 1){
                finalTimeDiff = Math.round(elapsedTime /= 3600)
                timeText = finalTimeDiff === 1 ? "hour" : "hours"
            } else {
                finalTimeDiff = Math.round(elapsedTime / 60)
                timeText = finalTimeDiff === 1 ? "minute" : "minutes"
            }
                return `${finalTimeDiff} ${timeText} ago`
            }
                                            
    let commentLike;


    // let count = 0;
    // commentLikes.forEach(like => {
    // if (like.commentId === comment.id) count += 1

    // })

    const userLiked = () => {
        let commentLike = commentLikes.filter(like => like.likerId === sessionUser.id && like.commentId === comment.id)
        return commentLike[0]
    }
    
    const handleVote = type => {
        if (!userLiked()) { // hasn't interacted
            const like = {likerId: sessionUser.id, likeType: type, commentId: comment.id}
            dispatch(createLike(like)).then(() => {
                type ? setNumLikes(c => c + 1) : setNumLikes(c => c - 1)
                type ? setUpButtonClass("vote up") : setDownButtonClass("vote down")
            })
        } else if (userLiked() && userLiked().likeType !== type) { // has interacted, trying to interact opposite
            const like = userLiked();
            like.likeType = type;
            dispatch(updateLike(like)).then(() => {
                type ? setNumLikes(c => c + 2) : setNumLikes(c => c - 2)
                if (type) {
                    setUpButtonClass("vote up")
                    setDownButtonClass("vote")
                } else if (!type) {
                    setDownButtonClass("vote down")
                    setUpButtonClass("vote")
                }
            })
        } else if (userLiked() && userLiked().likeType === type) { // has interacted, trying to undo
            const like = userLiked();
            dispatch(deleteLike(like)).then(() => {
                type === true ? setNumLikes(c => c - 1) : setNumLikes(c => c + 1)
                type ? setUpButtonClass("vote") : setDownButtonClass ("vote")
            })
        }
    }
                                            
    let commentBody;
    if (editing) {
        commentBody = (
            <CommentsUpdateForm comment={comment}/>
            ) 
        } else {
            commentBody = (
            
            comment.body
        )
    }
  
    const pointsText = numLikes === 1 ? 'point' : 'points'


   // let upButtonClass = comment.userLiked.likeType ? "selected up" : "vote"
   // let downButtonClass = comment.userLiked.likeType === false ? "selected down" : "vote"

    return (
        <div className="comment-tile">
            <div className="comment-left-section">
                <div className="comment-icon-section"> 
                    <div className="icon-top">
                        <div className="icon-link">
                            <Link className="link-user-profile" to={`/users/${commenterId}`}>
                                <i id="commenter-user-icon" className="fa-regular fa-user"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="icon-bottom"></div> 
                </div>
                <div className="comment-body-section">
                    <div className="comment-top-level-info">
                        <Link className="commenter-username" to={`/users/${commenterId}`}>{commenterName}</Link>
                        <div className="comment-time">{formatTime(comment.createdAt)}</div>
                    </div>
                    <div className="comment-body">{commentBody}</div>
                    <div className="comment-points">
                        <button onClick={() => handleVote(true)} className={upButtonClass}><i className="fa-regular fa-thumbs-up"></i></button>
                        <button onClick={() => handleVote(false)} className={downButtonClass}><i className="fa-regular fa-thumbs-down"></i></button>
                        <p className="num-points">{numLikes} {pointsText}</p>
                    </div>
                </div>
            </div>

            <div className="side-comment-tile">
                <ExtrasButton stateChanger={setEditing} comment={comment}/>
            </div>
        </div>
    )

}

export default CommentTile;