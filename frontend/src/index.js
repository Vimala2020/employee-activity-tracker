import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDom.createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter>  
     <App />
     <ToastContainer />   
   
    </BrowserRouter>
)