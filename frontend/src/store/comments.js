import csrfFetch from "./csrf"
import { receiveLikes } from "./likes"

export const SET_COMMENTS = 'comments/setComments'
export const SET_COMMENT = 'comments/setComment'
export const REMOVE_COMMENT = 'comments/removeComment'

export const setComments = (payload) => ({
    type: SET_COMMENTS,
    payload
})

export const setComment = comment => ({
    type: SET_COMMENT,
    payload: comment
})

export const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    payload: commentId
})

export const getComments = state => {
    return Object.values(state.comments) || []
}

export const fetchComments = quizId => async dispatch => {
    const res = await csrfFetch(`/api/quizzes/${quizId}/comments`)
    const data = await res.json()
    const newData = {...data}
    delete newData[data.likes]
    dispatch(setComments(data))
}

export const createComment = (comment) => async dispatch => {
    const res = await csrfFetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify(comment)
    })
    const data = await res.json()
    dispatch(setComment(data))
}

export const updateComment = comment => async dispatch => {
    const res = await csrfFetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        body: JSON.stringify(comment)
    })

    const data = await res.json()
    dispatch(setComment(data))
}

export const deleteComment = commentId => async dispatch => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })
    dispatch(removeComment(commentId))
    return res
}

const commentsReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_COMMENTS:
            return {...action.payload.comments}
        case SET_COMMENT:
            return {...action.payload}
        case REMOVE_COMMENT:
            const nextState = {...state}
            delete nextState[action.payload]
            return nextState
        default:
            return state
    }
}

export default commentsReducer;