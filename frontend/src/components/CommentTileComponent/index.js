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
    
    const userId = comment.commenterId
    
    useEffect(() => {
        dispatch(fetchUser(userId))
        //dispatch(fetchLikes(comment))
    }, [])
  
    const commenter = useSelector(state => state.users[userId])
    const sessionUser = useSelector(state => state.session.user) || {}
    
    const commentLikes = useSelector(state => Object.values(state.likes))
    
    //const [numPoints, setNumPoints] = useState(comment.points)
    const commenterUsername = commenter ? commenter.username : ""
    // const [showMenu, setShowMenu] = useState(false)
    const [editing, setEditing] = useState(false)
    const [numLikes, setNumLikes] = useState(commentLikes.length)


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

    const pointsText = numLikes === 1 ? 'point' : 'points'

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

    let commentLike;
    const userLiked = () => {
        let commentLike = commentLikes.filter(like => like.likerId === sessionUser.id)
        console.log(commentLike[0])
        return commentLike[0]
    }

    const handleVote = type => {
        if (!userLiked()) {
            console.log("not user liked")
            const like = {likerId: sessionUser.id, likeType: type, commentId: comment.id}
            dispatch(createLike(like)).then(() => setNumLikes(numLikes + 1))
        } else if (userLiked() && userLiked().likeType !== type) {
            console.log("user already liked but different type")
            userLiked().likeType = type;
            dispatch(updateLike(userLiked())).then(() => setNumLikes(type ? numLikes + 1 : numLikes - 1))
        } else if (userLiked() && userLiked().likeType === type) {
            console.log("user liked same type")
            dispatch(deleteLike(userLiked())).then(() => setNumLikes(numLikes - 1))
        }
    }

    // const handleVote = (type) => {
    //     if (type === 1) {
    //         if (userLiked() && userLiked().likeType) {
    //             console.log("user liked in handle vote")
    //             console.log(userLiked())
    //             dispatch(deleteLike(userLiked()))
    //         } else if (userLiked() && !userLiked().likeType) {
    //             userLiked().like_type = true;
    //             dispatch(updateLike(userLiked()))
    //         } else {
    //             const like = {liker_id: userId, like_type: true, comment_id: comment.id}
    //             dispatch(createLike(like))
    //             // setNumLikes(true)
    //         }
    //     } else if (type === -1) {
    //         if (userLiked() && userLiked().like_type === false) {
    //             dispatch(deleteLike(userLiked()))
    //         } else if (userLiked() && userLiked().likeType) {
    //             userLiked().likeType = false;
    //             dispatch(updateLike(userLiked()))
    //         } else {
    //             const like = {liker_id: userId, like_type: false, comment_id: comment.id}
    //             dispatch(createLike(like))
    //         }
    //     }
    // }

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

   // let upButtonClass = comment.userLiked.likeType ? "selected up" : "vote"
   // let downButtonClass = comment.userLiked.likeType === false ? "selected down" : "vote"

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
                        <button onClick={() => handleVote(true)} className={"vote"}><i className="fa-regular fa-thumbs-up"></i></button>
                        <button onClick={() => handleVote(false)} className={"vote"}><i className="fa-regular fa-thumbs-down"></i></button>
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