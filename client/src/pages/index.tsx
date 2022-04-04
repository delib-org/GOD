import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { getUserThunkReducer } from 'redux/reducers/userReducer';
import { getQuestionsThunk } from 'redux/reducers/questionsReducers';
import About from './About';
import Questions from './Questions';
import Question from './Question';
import CreateQuestion from './CreateQuestion';
import Notifications from './Notifications';
import Login from './Login';
import AddSolution from './Question/AddSolution';
import CreateQuestionSuccess from "./CreateQuestion/CreateQuestionSuccess";

function Fail() {
  return (
    <h1>Login failed</h1>
  );
}

function AppRoutes() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserThunkReducer());
    dispatch(getQuestionsThunk());
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/questions">
          <Questions />
        </Route>
        <Route path="/question/:questionId/add-solution">
          <AddSolution />
        </Route>
        <Route path="/question/:questionId">
          <Question />
        </Route>
        <Route path="/fail">
          <Fail />
        </Route>
        <Route exact path="/create_question/success">
          <CreateQuestionSuccess />
        </Route>
        <Route path="/create_question">
          <CreateQuestion />
        </Route>
        <Route path="/notifications">
          <Notifications />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRoutes;
