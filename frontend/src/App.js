import React from 'react';
import { Route, Switch } from 'react-router-dom'
import SignUpFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/signup">
          <SignUpFormPage />
        </Route>
        <Route path={"/users/:id"}></Route>
      </Switch>
    </>
  );
}

export default App;
