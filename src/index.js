import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import { persistor, store } from './app/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';


// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#c33332', // Change this to the desired primary color
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);