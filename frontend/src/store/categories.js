import csrfFetch from "./csrf";

const SET_CATEGORIES = 'categories/setCategories'
const SET_CATEGORY = 'category/setCategory'

export const setCategories = categories => ({
    type: SET_CATEGORIES,
    payload: categories
})

// export const setCategory = category => ({
//     type: SET_CATEGORY,
//     payload: category
// })

export const fetchCategories = () => async dispatch => {
    const res = await csrfFetch('/api/categories')
    const data = await res.json()
    dispatch(setCategories(data))
}

const categoriesReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_CATEGORIES:
            return {...action.payload}
        default:
            return state
    }
}

export default categoriesReducer;