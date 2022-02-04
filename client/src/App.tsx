import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

import './style/App.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



//components
import Login from './views/pages/Login/Login';
import CreateQuestion from './views/pages/CreateQuestion/CreateQuestion';
import About from './views/pages/About/About';
import Notifications from './views/pages/Notifications/Notifications';
import { theme } from './style/Theme';
import Questions from './views/pages/Questions/Questions';
import Question from './views/pages/Question/Question';



function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path='/questions'>
                <Questions />
              </Route>
              <Route path='/question/:questionId'>
                <Question />
              </Route>
              <Route path='/fail'>
                <Fail />
              </Route>
              <Route path='/create_question'>
                <CreateQuestion />
              </Route>
              <Route path="/notifications">
                <Notifications />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  
  );
}


export default App;


function Fail(){
  return(
    <h1>Login failed</h1>
  )
}

