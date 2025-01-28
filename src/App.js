import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';



function App() {

 
  return (
    <div class=" bg-black  h-full flex flex-col items-center justify-center w-full">
      <div class = " w-full flex flex-col bg-gradient-to-bl from-blue-950 via-blue-800 to-blue-950 to-50% justify-center items-center">

        <Navbar />
        <Home />

        <Footer/>
      </div>

      
  </div>


  );
}

export default App;
