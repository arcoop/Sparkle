import csrfFetch from "./csrf";

const SET_QUIZZES = 'quizzes/setQuizzes'
const SET_QUIZ = 'quizzes/addQuiz'
const REMOVE_QUIZ = 'quizzes/removeQuiz'
const SET_QUIZZES_BY_CATEGORY = 'quizzes/setQuizzesByCategory'

export const setQuizzes = quizzes => ({
    type: SET_QUIZZES,
    payload: quizzes
})

export const setQuiz = quiz => ({
    type: SET_QUIZ,
    payload: quiz
})

export const removeQuiz = quizId => ({
    type: REMOVE_QUIZ,
    payload: quizId
})

export const setQuizzesByCategory = quizzes => ({
    type: SET_QUIZZES_BY_CATEGORY,
    payload: quizzes
})

export const getQuizzes = state => {
    return Object.values(state.quizzes)
}

export const getQuiz = quizId => state => {
    return state.quizzes ? state.quizzes[quizId] : null
}

export const createQuiz = quiz => async dispatch => {
    console.log(JSON.stringify(quiz))
    const res = await csrfFetch('/api/quizzes', {
        method: 'POST',
        // body: JSON.stringify(quiz)
        body: quiz
    })

    const data = await res.json()
    dispatch(setQuiz(data))
    return data
}

export const updateQuiz = quiz => async dispatch => {
    const res = await csrfFetch(`/api/quizzes/${quiz.id}`, {
        method: 'PUT',
        body: JSON.stringify(quiz)
    })
    const data = await res.json()
    dispatch(setQuiz(data))
}

export const fetchQuizzes = () => async dispatch => {
    const res = await csrfFetch('/api/quizzes')
    if (res.ok) {
        const data = await res.json()
        dispatch(setQuizzes(data))
        return data
    }
}

export const fetchQuiz = quizId => async dispatch => {
    const res = await csrfFetch(`/api/quizzes/${quizId}`)
    const data = await res.json()
    dispatch(setQuiz(data))
}

export const deleteQuiz = quizId => async dispatch => {
    const res = await csrfFetch(`/api/quizzes/${quizId}`, {
        method: 'DELETE'
    })
    dispatch(removeQuiz(quizId))
}

export const fetchQuizzesByCat = categoryId => async dispatch => {
    const res = await csrfFetch(`/api/categories/${categoryId}/quizzes`)
    const data = await res.json()
    dispatch(setQuizzesByCategory(data))
}

const quizzesReducer = (state = {}, action ) => {
    switch(action.type) {
        case SET_QUIZZES:
            return {...state, ...action.payload}
        case SET_QUIZ:
            return {...state, ...action.payload}
        case SET_QUIZZES_BY_CATEGORY:
            return {...action.payload}
        case REMOVE_QUIZ:
            const nextState = {...state}
            delete nextState[action.payload]
            return nextState
        default:
            return state
    }
}

export default quizzesReducer;