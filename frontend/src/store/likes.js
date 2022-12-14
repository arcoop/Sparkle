import { SET_COMMENTS } from "./comments";
import csrfFetch from "./csrf";

const ADD_LIKE = 'likes/addLikes'
const REMOVE_LIKE = 'likes/removeLikes'
const RECEIVE_LIKES = 'likes/receiveLikes'
// const RECEIVE_LIKE = 'like/receiveLike'

export const addLike = like => ({
    type: ADD_LIKE,
    payload: like
});

export const removeLike = like => ({
    type: REMOVE_LIKE,
    payload: like
});

export const receiveLikes = likes => ({
    type: RECEIVE_LIKES,
    payload: likes
});

export const createLike = like => async dispatch => {
    const res = await csrfFetch('/api/likes', {
        method: 'POST',
        body: JSON.stringify(like)
    })

    const data = await res.json()
    dispatch(addLike(data))
}

export const deleteLike = like => async dispatch => {
    const res = await csrfFetch(`/api/likes/${like.id}`, {
        method: 'DELETE'
    })
    dispatch(removeLike(like))
    return res
}

export const updateLike = like => async dispatch => {
    const res = await csrfFetch(`/api/likes/${like.id}`, {
        method: 'PUT',
        body: JSON.stringify({likeType: like.likeType})
    })
    const data = await res.json()
    dispatch(addLike(data))
}

export const fetchLikes = comment => async dispatch => {
    const res = await csrfFetch(`/api/comments/${comment.id}/likes`)
    const data = await res.json()
    dispatch(receiveLikes(data))
}

const likesReducer = (state = {}, action) => {
    switch(action.type) {
        case ADD_LIKE:
            return {...state, ...action.payload}
        case REMOVE_LIKE:
            const nextState = {...state}
            delete nextState[action.payload.id]
            return nextState
        case RECEIVE_LIKES: 
            return {...action.payload}
        case SET_COMMENTS:
            return {...action.payload.likes}
        default:
            return state
    }
}

export default likesReducer;