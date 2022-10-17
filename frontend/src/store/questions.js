import csrfFetch from "./csrf"

const SET_QUESTIONS = 'questions/setQuestions'
const SET_QUESTION = 'questions/setQuestion'
const REMOVE_QUESTION = 'questions/removeQuestion'

export const setQuestions = questions => ({
    type: SET_QUESTIONS,
    payload: questions
})

export const setQuestion = question => ({
    type: SET_QUESTION,
    payload: question
})

export const removeQuestion = questionId => ({
    type: REMOVE_QUESTION,
    payload: questionId
})

export const getQuestions = state => {
    return state.questions ? Object.values(state.questions) : []
}

export const getQuestion = questionId => state => {
    return state.questions ? state.questions[questionId] : null
}

export const createQuestion = question => async dispatch => {
    const res = await csrfFetch('/api/questions', {
        method: 'POST',
        body: JSON.stringify(question)
    })

    const data = await res.json()
    dispatch(setQuestion(data))
    return data
}

export const updateQuestion = question => async dispatch => {
    const res = await csrfFetch(`/api/questions/${question.id}`, {
        method: 'PUT',
        body: JSON.stringify(question)
    })
    const data = await res.json()
    dispatch(setQuestion(data))
}

export const deleteQuestion = questionId => async dispatch => {
    const res = await csrfFetch(`/api/questions/${questionId}`, {
        method: 'DELETE'
    })
    dispatch(removeQuestion(questionId))
    return res
}

export const fetchQuestions = quizId => async dispatch => {
    const res = await csrfFetch(`/api/quizzes/${quizId}/questions`)
    const data = await res.json()
    dispatch(setQuestions(data))
    return data
}

export const fetchQuestion = (quizId, questionId) => async dispatch => {
    const res = await csrfFetch(`/api/quizzes/${quizId}/questions/${questionId}`)
    const data = await res.json()
    dispatch(setQuestion(data))
    return data
}

const questionsReducer = (state ={}, action) => {
    switch(action.type) {
        case SET_QUESTIONS:
            return {...state, ...action.payload}
        case SET_QUESTION:
            return {...state, ...action.payload}
        case REMOVE_QUESTION:
            const nextState = {...state}
            delete nextState[action.payload]
            return nextState
        default:
            return state
    }

}

export default questionsReducer;