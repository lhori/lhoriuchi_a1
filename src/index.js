// File         : index.js
// Project      : Frontend Programming Assignment
// Programmer   : Luka Horiuchi
// First Version: 02/24/2023
// Description  : This file contains the functions that setup renderer for the application and sets the route path of the page.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import{ BrowserRouter, Routes, Route } from "react-router-dom"
import Search from './pages/Search/Search';
import Favourites from './pages/Favourites/Favourites';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.title = 'Reddit Search App'; //tab title setting
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/search" element= {<Search/>}/>
        <Route path="/favourites" element= {<Favourites/>}/>
      </Route>
    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
