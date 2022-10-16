import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import questionsReducer from "./questions";
import quizzesReducer from "./quizzes";
import sessionReducer from "./session";
import usersReducer from "./users";

const rootReducer = combineReducers({
    session: sessionReducer,
    quizzes: quizzesReducer,
    users: usersReducer,
    questions: questionsReducer
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