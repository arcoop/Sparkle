import csrfFetch from "./csrf"

const SET_QUIZ_TAKES = 'quizTakes/setQuizTakes'
const SET_QUIZ_TAKE = 'quizTakes/setQuizTake'

export const setQuizTakes = quizTakes => ({
    type: SET_QUIZ_TAKES,
    payload: quizTake
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
    const res = await csrfFetch('api/quiz_takes')
    const data = await res.json()
    dispatch(setQuizTakes(data))
}

export const fetchQuizTake = quizTakeId => async dispatch => {
    const res = await csrfFetch(`api/quiz_takes/${quizTakeId}`)
    const data = await res.json()
    dispatch(setQuizTake(data))
}