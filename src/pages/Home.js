import React, { useState } from 'react';
import axios from 'axios';
import Categor from '../components/categor';
import Metricsfromec2 from '../components/Metricsfromec2';


const Home = () => {


  return (
    
    <div className='font-sans w-full   items-center justify-center text-white p-8 '>

      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  w-full flex-row gap-4 '>
        <div className='flex sm:col-span-2 md:col-span-2 lg:col-span-1 col-span-1 w-full   flex-col  gap-4'>
          <Metricsfromec2 />

        </div>
        <div className='w-full sm:col-span-2 col-span-1'>
        <Categor/> 

        </div>


      </div>
      
      <div className='flex flex-row just flex-wrap'>
      </div>

     


    </div>
  )
}

export default Home
