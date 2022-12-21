import csrfFetch from "./csrf";

const SET_QUIZZES = 'quizzes/setQuizzes'
const SET_QUIZ = 'quizzes/setQuiz'
const RECEIVE_QUIZ = `quizzes/receiveQuiz`
const RECEIVE_QUIZZES = `quizzes/receiveQuizzes`
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

export const receiveQuiz = quiz => ({
    type: RECEIVE_QUIZ,
    payload: quiz
})

export const receiveQuizzes = quizzes => ({
    type: RECEIVE_QUIZZES,
    payload: quizzes
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
    console.log("updating quiz", quiz)
    console.log(quiz.id)
    const res = await csrfFetch(`/api/quizzes/${quiz.id}`, {
        method: 'PUT',
        body: quiz
        // body: JSON.stringify(quiz)
    })
    console.log(data)
    const data = await res.json();
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

export const searchQuizzes = query => async dispatch => {
    const res = await csrfFetch(`/api/search/quizzes/?s=${query}`)
    const data = await res.json()
    dispatch(receiveQuizzes(data))
}

export const fetchRandomQuizID = () => async dispatch => {
    const res = await csrfFetch(`/api/random/quizzes`)
    const data = await res.json()
    return data.randomQuiz.id
}

// export const fetchRandomQuiz = () => async dispatch => {
//     const res = await csrfFetch(`/api/random/quizzes`)
//     const data = await res.json()
//     const randomId = (data.randomQuiz.id)
//     return randomId
// }


export const fetchQuiz = quizId => async dispatch => {
    const res = await csrfFetch(`/api/quizzes/${quizId}`)
    const data = await res.json()
    dispatch(receiveQuiz(data))
}

export const deleteQuiz = quizId => async dispatch => {
    const res = await csrfFetch(`/api/quizzes/${quizId}`, {
        method: 'DELETE'
    })
    dispatch(removeQuiz(quizId))
}

export const fetchQuizzesByCat = name => async dispatch => {
    const res = await csrfFetch(`/api/categories/${name}/quizzes`)
    const data = await res.json()
    dispatch(setQuizzesByCategory(data))
}

export const fetchNumQuizzesAuthored = userId => async () => {
    const res = await csrfFetch(`/api/users/${userId}/num_authored/quizzes`)
    const data = await res.json()
    return data.numAuthored
}

const quizzesReducer = (state = {}, action ) => {
    switch(action.type) {
        case SET_QUIZZES:
            return {...state, ...action.payload}
        case SET_QUIZ:
            return {...state, ...action.payload}
        case RECEIVE_QUIZ:
            return {...action.payload}
        case RECEIVE_QUIZZES:
            return {...action.payload}
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