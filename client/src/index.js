// This is the entry point of the application
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// process.env.SERVER_HOST="localhost";
// process.env.SERVER_PORT="8000";
// export const { SERVER_HOST, SERVER_PORT } = process.env;
// console.log(`Server host: ${SERVER_HOST}`);
// console.log(`Server port: ${SERVER_PORT}`);

window.SERVER_HOST="localhost"
window.SERVER_PORT="8000"
console.log(`Server host: ${window.SERVER_HOST}`);
console.log(`Server port: ${window.SERVER_PORT}`);
export const SERVER_HOST = window.SERVER_HOST
export const SERVER_PORT = window.SERVER_PORT

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode> // This is causing the terminal to render twice
  <>
    <div className="body">
      <App />
    </div>
  </>
  // </React.StrictMode>
);
