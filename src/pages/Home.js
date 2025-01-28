import React, { useState } from 'react';
import axios from 'axios';
import Categor from '../components/categor';
import Metricsfromec2 from '../components/Metricsfromec2';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  return (
    
    <div className='font-sans w-full   items-center justify-center text-white p-8 '>
      <Navbar />

      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full flex-row gap-4 '>
        <div className='flex sm:col-span-2 md:col-span-2 lg:col-span-1 col-span-1 w-full   flex-col  gap-4'>
          <Metricsfromec2 />

        </div>
        <div className='w-full sm:col-span-2 col-span-1'>
          <Categor/> 

        </div>


      </div>
      <Footer/>
      <button 
        onClick={() => navigate('/chat')}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <i className="fa-solid fa-message text-xl"></i>
      </button>
      
      

     


    </div>
  )
}

export default Home
