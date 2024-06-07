import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import './styles/shared/general.css';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Contextprovider from './context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Router>
      <Contextprovider>
      <Routes>
        <Route path='/*' element={<App />}/>
      </Routes> 
      </Contextprovider>
    </Router>
    
    
)
