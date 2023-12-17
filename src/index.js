import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
// STYLES
import './css/index.css';
import './css/login.css'
import "./css/Main.css"
import "./css/Resumen.css"
import "./css/Portero_Info.css"
import "./css/Porteros.css"
import "./css/Microciclos.css"
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>   
        <Router>
            <App />
        </Router>
    </>
);

