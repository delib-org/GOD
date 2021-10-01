import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './style/App.scss';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import { handleSecret, handleLogout } from './controlers/user/user';


//components
import Login from './views/pages/Login/Login';
import CreateQuestion from './views/pages/CreateQuestion/CreateQuestion';

import { theme } from './style/Theme';




function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/ready">Ready</Link>
              </li>
              <li>
                <Link to='/create_question'>Create Question</Link>
              </li>

            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path='/create_question'>
              <CreateQuestion />
            </Route>
            <Route path="/ready">
              <Ready />
            </Route>
            <Route path="/fail">
              <Fail />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}


export default App;


function Ready() {
  return (<div>
    <h1>Ready</h1>
    <Button onClick={handleSecret}>Get Secret</Button>
    <Button onClick={handleLogout}>Logout</Button>
  </div>)
}

function Fail() {
  return (<h1>Fail</h1>)
}