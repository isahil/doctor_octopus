import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode> // This is causing the terminal to render twice
  <>
    <div className="app-header">
        <h1>Doctor Octopus</h1>
    </div>
    <div className="body">
      <App />
    </div>
  </>
  // </React.StrictMode>
);
