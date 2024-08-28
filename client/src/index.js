import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// read the path from URL -> send it to <App />
const pathname = window.location.pathname

root.render(
  <React.StrictMode>
    <App pathname={pathname}/>
  </React.StrictMode>
);


reportWebVitals();
