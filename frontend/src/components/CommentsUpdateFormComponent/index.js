import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchComments, updateComment } from "../../store/comments";
import './CommentsUpdateForm.css'

const CommentsUpdateForm = ({comment}) => {
    const dispatch = useDispatch()
    const [commentBody, setCommentBody] = useState(comment.body)

    const handleSubmit = e => {
        comment.body = commentBody
        console.log(comment)
        dispatch(updateComment({...comment, body: commentBody}))
    }
    
    return (
        <form id="comment-update-form" onSubmit={handleSubmit}>
            <textarea
                id="comment-update-body"
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
            />
            <br />
            <button id="comment-update-submit-button" className='submit-button'>Save</button>
        </form>
    )
}

export default CommentsUpdateForm;