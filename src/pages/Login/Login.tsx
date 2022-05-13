import React, { FC, useEffect } from 'react';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

import logo from 'img/logo.webp';

// controls
import { isLogged } from 'utils/helpers';

const Login: FC = () => {
  const history = useHistory();

  useEffect(() => {
    // check if logged in

    if (isLogged()) history.push('/questions');
  }, []);
  return (
    <div className="page login">
      <div className="login__wrapper">
        <h1>Global Online Democracy</h1>
        <img src={logo} alt="Global online deomcracy logo" />
        <a href="http://localhost:4000/auth" target="_blank" rel="noreferrer">
          {' '}
          <Button
            variant="outlined"
            style={{
              color: 'white',
              border: '1px solid white',
            }}
          >
            Google Login
          </Button>
        </a>
        <div className="login__delib">
          <h2>A Delib app instance</h2>
          <p>
            Created based on the
            <a href="http://delib.org" target="_blank" rel="noreferrer">Deliberative Democracy Instetiute's</a>
            {' '}
            design & thoeires
          </p>
          <p><a href="https://github.com/delib-org/GOD">Code in GitHub</a></p>
        </div>
      </div>
    </div>
  );
};
export default Login;
