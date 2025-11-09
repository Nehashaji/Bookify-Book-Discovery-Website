import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; 
import App from './App';
import { BrowserRouter } from 'react-router-dom'; //wrap App in Router

import 'aos/dist/aos.css';
import AOS from 'aos';

AOS.init({
  duration: 1000, // animation duration
  once: true,     // animation triggers only once
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
