import csrfFetch from "./csrf"

const SET_QUIZ_TAKES = 'quizTakes/setQuizTakes'
const SET_QUIZ_TAKE = 'quizTakes/setQuizTake'

export const setQuizTakes = quizTakes => ({
    type: SET_QUIZ_TAKES,
    payload: quizTakes
})

export const setQuizTake = quizTake => ({
    type: SET_QUIZ_TAKE,
    payload: quizTake
})

export const getQuizTakes = state => {
    return Object.values(state.quizTakes)
}


export const getQuizTake = quizTakeId => state => {
    return state.quizTakes ? state.quizTakes[quizTakeId] : null
}

export const fetchQuizTakes = () => async dispatch => {
    const res = await csrfFetch('/api/quiz_takes')
    const data = await res.json()
    dispatch(setQuizTakes(data))
}

export const fetchQuizTake = quizTakeId => async dispatch => {
    const res = await csrfFetch(`/api/quiz_takes/${quizTakeId}`)
    const data = await res.json()
    dispatch(setQuizTake(data))
}

export const createQuizTake = quizTake => async dispatch => {
    const res = await csrfFetch('/api/quiz_takes', {
        method: 'POST',
        body: JSON.stringify(quizTake)
    })
    const data = await res.json()
    dispatch(setQuizTake(data))
}

const quizTakesReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_QUIZ_TAKE:
            return {...state, ...action.payload}
        case SET_QUIZ_TAKES:
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default quizTakesReducer;