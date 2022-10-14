import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation';
import QuizCreation from './components/QuizCreateComponent';
import QuizForm from './components/QuizCreateFormComponent';
import QuizEditForm from './components/QuizEditFormComponent';
import QuizShow from './components/QuizShowComponent';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path={"/users/:id"}></Route>

        <Route exact path={"/create"}>
          <QuizCreation />
        </Route>

        <Route path={"/create/new"}>
          <QuizForm />
        </Route>

        <Route path={"/create/edit/:quizId"}>
          <QuizEditForm/>
        </Route>

        <Route path={"/quizzes/:quizId"}>
          <QuizShow />
        </Route>

      </Switch>

    </>
  );
}

export default App;
