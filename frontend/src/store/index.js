import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import quizReducer from "./quizzes";
import sessionReducer from "./session";
import userReducer from "./users";

const rootReducer = combineReducers({
    session: sessionReducer,
    quizzes: quizReducer,
    users: userReducer
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