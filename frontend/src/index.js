import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session'
import * as quizActions from './store/quizzes'
import { ModalProvider } from './context/Modal';
import * as userActions from './store/users'

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.quizActions = quizActions;
  window.userActions = userActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  )
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

if (sessionStorage.getItem("currentUser") === null || sessionStorage.getItem("X-CSRF-Token") === null) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}
