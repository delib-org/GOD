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
import Home from './views/pages/Home/Home';
import CardView from './views/pages/CardView/CardView';
import Discussion from './views/pages/CardView/Discussion/Discussion';
import Notifications from './views/pages/Notifications/Notifications';
import { theme } from './style/Theme';
import ButtonAppBar from './views/components/ButtonAppBar/ButtonAppBar';
import Vote from './views/pages/Vote/Vote';



function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            {/* <nav>
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
            </nav> */}

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <Home />
              </Route>
              <Route path='/vote'>
                <Vote />
              </Route>
              <Route path='/card_view'>
                <CardView />
              </Route>
              <Route path='/discussion'>
                <Discussion />
              </Route>
              <Route path='/create_question'>
                <CreateQuestion />
              </Route>
              <Route path="/notifications">
                <Notifications />
              </Route>
              <Route path="/fail">
                <Fail />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
            <ButtonAppBar />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}


export default App;




function Fail() {
  return (<h1>Fail</h1>)
}