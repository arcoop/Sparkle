import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import commentsReducer from "./comments";
import likesReducer from "./likes";
import questionsReducer from "./questions";
import quizTakesReducer from "./quizTakes";
import quizzesReducer from "./quizzes";
import sessionReducer from "./session";
import usersReducer from "./users";

const categories = {
  1: {id: 1, name: "Entertainment"},
  2: {id: 2, name: "Gaming"},
  3: {id: 3, name: "Geography"},
  4: {id: 4, name: "History"},
  5: {id: 5, name: "Holiday"},
  6: {id: 6, name: "Just For Fun"},
  7: {id: 7, name: "Language"},
  8: {id: 8, name: "Literature"},
  9: {id: 9, name: "Miscellaneous"},
  10: {id: 10, name: "Movies"},
  11: {id: 11, name: "Music"},
  12: {id: 12, name: "Religious"},
  13: {id: 13, name: "Science"},
  14: {id: 14, name: "Sports"},
  15: {id: 15, name: "Television"},
}


const rootReducer = combineReducers({
    session: sessionReducer,
    quizzes: quizzesReducer,
    users: usersReducer,
    questions: questionsReducer,
    comments: commentsReducer,
    quizTakes: quizTakesReducer,
    likes: likesReducer,
    categories: (state = categories ) => state
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  }

  const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer)
  }

  export default configureStore;