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

const CommentTile = ({comment, setNumLikes}) => {
    const dispatch = useDispatch();
    
    const userId = comment.commenterId
    
    useEffect(() => {
        dispatch(fetchUser(userId))
    }, [])
  
    const sessionUser = useSelector(state => state.session.user) || {}
    const commenter = useSelector(getUser(userId))
    //const [numPoints, setNumPoints] = useState(comment.points)
    const commenterUsername = commenter ? commenter.username : ""
    const [upVote, setUpVote] = useState("vote")
    const [downVote, setDownVote] = useState("vote")
    // const [showMenu, setShowMenu] = useState(false)
    const [editing, setEditing] = useState(false)
    const [likedByUser, setLikedByUser] = useState(0)
    const [commentNumLikes, setCommentNumLikes] = useState(comment.numLikes)

    // likes.forEach(like => {
    //     if (like.likerId === sessionUser.id) {
    //         setLikedByUser(like.type === true ? 1 : -1)
    //     } else {
    //         setLikedByUser(0)
    //     }
    // })

    // const openMenu = () => {
    //     if (!showMenu) setShowMenu(true)
    // }

    // const signedInMenu = (
    //     <ul className="comment-menu">
    //         <li className="comment-menu-list-item">
    //             <button id="comment-edit-button" className="comment-menu-button">
    //                 <i class="fa-regular fa-pen-to-square"></i>
    //                 <p>Edit</p>
    //             </button>
    //         </li>
    //         <li className="comment-menu-list-item">
    //             <button onClick={() => dispatch(deleteComment(comment.id))} className="comment-menu-button" id="delete-button">
    //                 <i class="fa-regular fa-trash-can"></i>
    //                 <p>Delete</p>
    //             </button>
    //         </li>
    //         <li className="comment-menu-list-item"> <button className="comment-menu-button" id="hide-button">Hide</button></li>
    //     </ul>
    // )

    // const signedOutMenu = (
    //     <ul className="comment-menu">
    //         <li className="comment-menu-list-item">
    //             <button className="comment-menu-button" id="hide-button">Hide</button>
    //         </li>
    //     </ul>
    // )

    // const menu = sessionUser.id === comment.commenterId ? signedInMenu : signedOutMenu

    const pointsText = comment.numLikes === 1 ? 'point' : 'points'

    // useEffect(() => {
    //     dispatch(updateComment({...comment, points: numPoints}))
    // }, [numPoints])

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
        // if (elapsedTime < 1) {
        //     elapsedTime /
        // } 
    
        
        // const day = fullDate.getDate();
        // const year = fullDate.getFullYear();
        return `${finalTimeDiff} ${timeText} ago`
    }

    // const formatPostTime = () => {
    //     new Date(comment.updatedAt) 
    // }

    // useEffect(() => {
    //     const closeMenu = () => {
    //         setShowMenu(false)
    //     }
    //     if (showMenu) {
    //         document.addEventListener("click", closeMenu)
    //     }
    //     return () => {
    //         document.removeEventListener("click", closeMenu)
    //     }
    // }, [showMenu])

    // const userLiked = () => {
    //     likes.forEach(like => {
    //         if (like.likerId === sessionUser.id) {
    //             setLikedComment(true);
    //             return like;
    //         }
    //     })
    //     setLikedComment(false)
    // }

    const handleVote = (type) => {
        if (type === 1) {
            if (comment.userLiked && comment.userLiked.like_type === true) {
                dispatch(deleteLike(comment.userLiked)).then(() => setNumLikes(true))
            } else if (comment.userLiked && comment.userLiked.like_type === false) {
                comment.userLiked.like_type = true;
                dispatch(updateLike(comment.userLiked)).then(() => setNumLikes(true))
                //setNumLikes(true)
            } else {
                const like = {liker_id: userId, like_type: true, comment_id: comment.id}
                dispatch(createLike(like)).then(() => setNumLikes(true));
                // setNumLikes(true)
            }
        } else if (type === -1) {
            if (comment.userLiked && comment.userLiked.like_type === false) {
                dispatch(deleteLike(comment.userLiked)).then(() => setNumLikes(true))
            } else if (comment.userLiked && comment.userLiked.like_type) {
                comment.userLiked.like_type = false;
                dispatch(updateLike(comment.userLiked)).then(() => setNumLikes(true))
            } else {
                const like = {liker_id: userId, like_type: false, comment_id: comment.id}
                dispatch(createLike(like))
                setNumLikes(true)
            }
        }
    }

    // const MenuReturn = () => {
    //     if (showMenu) {
    //         return (
    //             <div id="comment-menu">
    //                 <button className="comment-extras-button"><i className="fa-solid fa-ellipsis"></i></button>
    //                 {menu}
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div id="comment-menu">
    //                 <button onClick={openMenu} className="comment-extras-button"><i className="fa-solid fa-ellipsis"></i></button>
    //             </div>
    //         )
    //     }
    // }
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

    let upButtonClass = comment.userLiked.likeType ? "selected up" : "vote"
    let downButtonClass = comment.userLiked.likeType === false ? "selected down" : "vote"

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
                        <div className="comment-time">{formatTime(comment.createdAt)}</div>
                    </div>
                    <div className="comment-body">{commentBody}</div>
                    <div className="comment-points">
                        <button onClick={() => handleVote(1)} className={upButtonClass}><i className="fa-regular fa-thumbs-up"></i></button>
                        <button onClick={() => handleVote(-1)} className={downButtonClass}><i className="fa-regular fa-thumbs-down"></i></button>
                        <p className="num-points">{comment.numLikes} {pointsText}</p>
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