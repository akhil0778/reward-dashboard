import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import './index.css'; 
import { ThemeProvider } from './context/ThemeContext';


const container = document.getElementById('root');
const root = createRoot(container); 

// Render the app
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);