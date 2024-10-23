import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // remove strictmode in production.
  <React.StrictMode>
    {/* <AuthProvider> */}
    <App />
    {/* </AuthProvider> */}
  </React.StrictMode>
);

