import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProdiver } from './context/ThemeContext';

ReactDOM.render(
  <ThemeProdiver>
    <App />
  </ThemeProdiver>,
  document.getElementById('root')
);

reportWebVitals();
