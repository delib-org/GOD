import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

// material-ui styles
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled } from '@mui/styles';

const MyButton = styled(Button)({
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
  color: 'grey',
  textTransform: 'capitalize',
  padding: '0',
  margin: '0.5em auto 0',
  fontSize: '0.7em',
  alignItems: 'baseline',
  fontWeight: 400,
  '&:active': {
    color: '#34aef0',
  },
  '&:hover': {
    color: '#34aef0',
  },
  '&:visited': {
    color: '#34aef0',
  },
});

const ButtonAppBar: FC = () => (
  <div className="button-app-bar">
    <NavLink to="/about" className="nav-links" exact>
      <MyButton>
        <PublicIcon style={{ margin: '0 auto' }} />
        {' '}
        About
      </MyButton>
    </NavLink>

    <NavLink to="/questions" className="nav-links">
      <MyButton>
        <HomeIcon style={{ margin: '0 auto' }} />
        {' '}
        Home
      </MyButton>
    </NavLink>

    <NavLink to="/notifications" className="nav-links">
      <MyButton>
        <NotificationsIcon style={{ margin: '0 auto' }} />
        Notifications
      </MyButton>
    </NavLink>
  </div>
);
export default ButtonAppBar;
