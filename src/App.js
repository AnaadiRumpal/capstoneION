import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';

import Home from './pages/Home';
import Chat from './components/chat.js'





function App() {

 
  return (

      
      
    <div className="App  bg-black  h-full flex flex-col items-center justify-center w-full">
    <Router>
      <div class = " w-full flex flex-col bg-gradient-to-bl from-blue-950 via-blue-800 to-blue-950 to-50% justify-center items-center">

        <Routes>
          <Route exact path="/" element={<Home />} /> 
          <Route exact path="/chat" element={<Chat />} /> 
        </Routes>
      </div>
    </Router>
  </div>


  );
}

export default App;


