import csrfFetch from "./csrf";

const SET_QUIZZES = 'quizzes/setQuizzes'
const SET_QUIZ = 'quizzes/addQuiz'
const REMOVE_QUIZ = 'quizzes/removeQuiz'

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

export const createQuiz = quiz => async dispatch => {
    const res = await csrfFetch('api/quizzes', {
        method: 'POST',
        body: JSON.stringify(quiz)
    })

    const data = await res.json()
    dispatch(setQuiz(data))
}

export const updateQuiz = quiz => async dispatch => {
    const res = await csrfFetch(`api/quizzes/${quiz.id}`, {
        method: 'PATCH',
        body: JSON.stringify(quiz)
    })

    const data = await res.json()
    dispatch(setQuiz(data))
}

export const fetchQuizzes = () => async dispatch => {
    const res = await csrfFetch('api/quizzes')
    const data = await res.json()
    dispatch(setQuizzes(data))
}

export const fetchQuizzesByCategory = quizCategory => async dispatch => {
    const res = await csrfFetch('api/quizzes')
    const data = await res.json().where(data.category === quizCategory)
    dispatch(setQuizzes(data))
}

export const deleteQuiz = quizId => async dispatch => {
    const res = await csrfFetch('/api/quizzes', {
        method: 'DELETE'
    })
    dispatch(removeQuiz(quizId))
}

const quizReducer = (state = {}, action ) => {
    switch(action.type) {
        case SET_QUIZZES:
            return {...state, ...action.quizzes}
        case SET_QUIZ:
            return {...state, quiz: action.quiz}
        case REMOVE_QUIZ:
            const nextState = {...state}
            delete nextState[action.quizId]
            return nextState
        default:
            return state
    }
}

export default quizReducer;