import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation';
import QuizCreation from './components/QuizCreateComponent';
import QuizForm from './components/QuizCreateFormComponent';
import QuizEditForm from './components/QuizEditFormComponent';
import QuizIndex from './components/QuizIndexComponent';
import QuizShow from './components/QuizShowComponent';
import UserShow from './components/UserShowComponent';
import Footer from './components/Navigation/Footer';
import QuizByCategory from './components/QuizByCategoryIndexComponent';
import CategoriesIndex from './components/CategoryIndexComponent';
import {CategoryIndexPage} from './components/CategoryIndexComponent'

function App() {
  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          <Navigation />
          <QuizIndex />
          <Footer />
        </Route>
        <Route exact path={"/quizzes"}>
          <Navigation/>
          <QuizIndex />
          <Footer />
        </Route>

        <Route path={"/users/:id"}>
          <UserShow />
          <Footer />
        </Route>

        <Route exact path={"/create"}>
          <Navigation />
          <QuizCreation />
          <Footer />
        </Route>

        <Route path="/create/new">
          <QuizForm />
          <Footer/>
        </Route>

        <Route path="/create/edit/:quizId">
          <Navigation />
          <QuizEditForm/>
          <Footer/>
        </Route>

        <Route path="/quizzes/:quizId">
          <Navigation />
          <QuizShow />
          <Footer />
        </Route>

        <Route exact path='/categories'>
          <Navigation />
          <CategoryIndexPage />
          <Footer />
        </Route>

        <Route exact path="/categories/:categoryId/">
          <Navigation />
          <QuizByCategory />
          <Footer />
        </Route>

        <Route>
          <h1>path not found</h1>
        </Route>
        
      </Switch>

    </>
  );
}

export default App;
