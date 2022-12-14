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
import { CategoryIndexPage } from './components/CategoryIndexComponent'
import SearchResults from './components/SearchResultsComponent/SearchResults';
import CategoryShow from './components/CategoryShowComponent/CategoryShow';
import UserEditForm from './components/UserShowComponent/UserEditFormComponent';

function App() {
  return (
    <>
      <Switch>
        <Route exact path={"/"}>
         
          <QuizIndex />
          
        </Route>

        <Route path="/search/">
          <SearchResults />
        </Route>

        <Route exact path={"/quizzes"}>
        
          <QuizIndex />

        </Route>

        <Route path={"/users/:id"}>
          <UserShow />
        </Route>

        <Route exact path={"/create"}>
          <QuizCreation />
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

        <Route exact path="/quizzes/:quizId">
          <QuizShow />
        </Route>

        <Route exact path='/categories'>
          <Navigation />
          <CategoryIndexPage />
          <Footer />
        </Route>

        <Route exact path="/categories/:name/">
          <CategoryShow />
        </Route>

        <Route path="/settings/">
          <UserEditForm />
        </Route>
        
        <Route>
          <h1>path not found</h1>
        </Route>
        
      </Switch>

    </>
  );
}

export default App;
