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
    // console.log (Object.keys(Object.values(data)[0]))
    dispatch(setQuizzes(data))
}

export const fetchQuizzesByCategory = () => async dispatch => {
    const res = await csrfFetch('api/quizzes')
    const allData = await res.json()
    const dataArray = Object.values(allData)
     
    console.log(dataArray)
    const data = {}
    dataArray.forEach(item => {data[item.id] = item})
    dispatch(setQuizzes(data))
}

export const deleteQuiz = quizId => async dispatch => {
    const res = await csrfFetch(`/api/quizzes/${quizId}`, {
        method: 'DELETE'
    })
    dispatch(removeQuiz(quizId))
}


const quizReducer = (state = {}, action ) => {
    switch(action.type) {
        case SET_QUIZZES:
            return {...state, ...action.payload}
        case SET_QUIZ:
            return {...state, ...action.payload}
            // const newState = {...state}
            // newState[action.payload.id] = action.payload
            // return newState
        case REMOVE_QUIZ:
            const nextState = {...state}
            delete nextState[action.payload]
            return nextState
        default:
            return state
    }
}

export default quizReducer;