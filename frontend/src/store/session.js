import csrfFetch from "./csrf"
// POJO action creators:

export const SET_CURRENT_USER = 'session/setCurrentUser'
export const REMOVE_CURRENT_USER = 'session/removeCurrentUser'

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: user
})

export const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
})

export const signup = (user) => async dispatch => {
    const {username, email, password} = user
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username, email, password
        })
    })

    const data = await res.json()
    storeCurrentUser(data.user)
    dispatch(setCurrentUser(data.user))
    return res
}

export const login = (user) => async dispatch => {
    const {credential, password} = user
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential, password
        })
    });
    const data = await res.json()
    dispatch(setCurrentUser(data.user))
    return res;
}

export const logout = () => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    })
    storeCurrentUser(null)
    dispatch(removeCurrentUser())
    return res;
}

const storeCSRFToken = response => {
    const token = response.headers.get("X-CSRF-Token")
    if (token) sessionStorage.setItem("X-CSRF-Token", token)
}

export const restoreSession = () => async dispatch => {
    console.log('restoring')
    const res = await csrfFetch("api/session")
    storeCSRFToken(res)
    const data = await res.json()
    console.log(data.user)
    storeCurrentUser(data.user)
    dispatch(setCurrentUser(data.user))
    return res;
}

const storeCurrentUser = user => {
    if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user))
    } else sessionStorage.removeItem("currentUser")
}

const initialState = {user: JSON.parse(sessionStorage.getItem("currentUser"))}

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            }
        case REMOVE_CURRENT_USER:
            return {...state, user: null}
        default:
            return state
    }
}

export default sessionReducer;