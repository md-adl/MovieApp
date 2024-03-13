import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './styles/tailwind.css';
import { MovieProvider } from './context/MovieContext';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <MovieProvider>
       <App />
    </MovieProvider>
    </Router>
    
    
  </React.StrictMode>
);


