import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App'
import { UserDataProvider } from './contexts/userData';
import { Router } from './Router';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserDataProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </UserDataProvider>
    <ToastContainer />
  </React.StrictMode>
)
