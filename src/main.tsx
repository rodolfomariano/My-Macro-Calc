import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App'
import { UserDataProvider } from './contexts/userData';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserDataProvider>
      <App />
    </UserDataProvider>
    <ToastContainer />
  </React.StrictMode>
)
