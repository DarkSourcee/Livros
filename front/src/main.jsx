import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App.jsx'
// import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer />
  </StrictMode>,
)
