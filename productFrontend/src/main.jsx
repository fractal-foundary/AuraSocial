import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // remove strictmode in production.
  <React.StrictMode>
    {/* to bind the whole website with authcontext hook to use data. */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

