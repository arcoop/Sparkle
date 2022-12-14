import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createComment, updateComment } from '../../store/comments';
import './CommentsCreate.css'

const CommentsCreate = () => {
    const dispatch = useDispatch();
    const {quizId} = useParams()
    
    const [body, setBody] = useState("")

    const sessionUser = useSelector(state => state.session.user)
   
    const handleSubmit = e => {
        // e.preventDefault();
        const comment = {body: body, quizId: quizId, commenterId: sessionUser.id}
        dispatch(createComment(comment))
    }

    return (
        <div id='comment-create-div'>
            <div id='create-comment-left-side'>
                    <i id="commenter-user-icon" className="fa-regular fa-user"></i>
            </div>
            <form id='comment-create-form' onSubmit={handleSubmit}>
                <textarea
                    id='comment-create-body'
                    placeholder='Post a new comment...'
                    onChange={(e)=> setBody(e.target.value)} 
                />
                <br />
                <button id="comment-submit-button" className='submit-button'>Post Comment</button>
            </form>
            
        </div>
    )
}

export default CommentsCreate;