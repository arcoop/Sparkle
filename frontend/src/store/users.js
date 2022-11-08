import csrfFetch from "./csrf";

const SET_USERS = 'users/setUsers'
const SET_USER = 'users/setUser'

export const setUsers = users => ({
    type: SET_USERS,
    payload: users
})

export const setUser = user => ({
    type: SET_USER,
    payload: user
})

export const getUsers = state => {
    return state.users ? Object.values(state.users) : []
}

export const getUser = userId => state => {
    return state.users[userId] ? state.users[userId] : null
}

export const fetchUsers = () => async dispatch => {
    const res = await csrfFetch('/api/users')
    if (res.ok) {
        const data = await res.json()
        dispatch(setUsers(data)) 
        return data
    }
}

export const searchUsers = query => async dispatch => {
    const res = await csrfFetch(`/api/search/users/?s=${query}`)
    const data = await res.json()
    dispatch(setUsers(data))
}

export const fetchUser = userId => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(setUser(data.user))
        return data.user
    }
}

const usersReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_USERS:
            return {...action.payload}
        case SET_USER:
            return {...state, [action.payload.id]: action.payload}
        default:
            return state 
    }
}

export default usersReducer