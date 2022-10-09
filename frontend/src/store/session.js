import csrfFetch from "./csrf"
// POJO action creators:


export const SET_CURRENT_USER = 'session/setCurrentUser'
export const REMOVE_CURRENT_USER = 'session/removeCurrentUser'

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    user
})

export const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
})

export const login = (user) => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    })
    const data = await res.json()
    dispatch(setCurrentUser(data.user))
    return res
}

const sessionReducer = (state = {user: null}, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user:action.user
            }
        case REMOVE_CURRENT_USER:
            return {...state, user: null}
        default:
            return state
    }
}

export default sessionReducer;