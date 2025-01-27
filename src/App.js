import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';



function App() {

 
  return (
    <div class="bg-stone-800 h-full flex flex-col items-center justify-center w-full">
      <Navbar />
      <Home />
      <Footer/>
      
 </div>


  );
}

export default App;
