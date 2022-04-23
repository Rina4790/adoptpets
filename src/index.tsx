import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProdiver } from './context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <ThemeProdiver>
    <App />
  </ThemeProdiver>,
  document.getElementById('root')
);

reportWebVitals();
