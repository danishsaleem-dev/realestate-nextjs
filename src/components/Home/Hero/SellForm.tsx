import React from 'react';
import { BiCalculator } from 'react-icons/bi';
import 'rc-slider/assets/index.css';

const SellForm = () => {
    

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle search logic for Rent
    };
  
    return (
      <>
      <form onSubmit={handleSearch}>
        <div className='field-box'>
          <input className='leading-loose' type="text" name="location" placeholder="Where do you want to rent?" required />
        </div>
        <button type="submit">Search</button>
      </form>
      <div className='flex flex-col md:flex-row gap-2 justify-between bg-primary text-white p-6 rounded-2xl mt-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center'>
            <BiCalculator className='h-7 w-7' /><span className='text-white text-base md:text-xl font-bold'>Find out your home&apos;s value, instantly</span>
          </div>
          <p className='font-light text-sm'>Get a free online estimate of your home&apos;s current value in minutes</p>
        </div>
        <button className='btn btn-primary bg-transparent rounded-full border-2 border-white text-white px-10 hover:bg-white hover:text-primary'>Start instant valuation</button>
      </div>
      </>
    );
  };
  export default SellForm;