import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { disconnectSocket, initiateSocket } from 'utils/socket';
import { theme } from 'style/Theme';
import AppRoutes from './pages';

import 'style/App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  useEffect(() => {
    initiateSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
