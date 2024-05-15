import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@repo/config-vanilla-extract/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
