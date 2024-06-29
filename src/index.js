import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="content-container">
      <App />
    </div>
    <footer className="footer--pin">
      <div style={{background: '#202020', padding: '2px 15px'}}>
        <p style={{color: 'white'}}>Project by <a href="https://in.linkedin.com/in/purvang-vasani-24a366137" target='_blank'>Purvang</a> </p>
      </div>
    </footer>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
