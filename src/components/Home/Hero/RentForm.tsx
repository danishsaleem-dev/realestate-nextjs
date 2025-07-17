import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import { BiCalculator } from 'react-icons/bi';
import LocationInput from './LocationInput';

const RentForm = () => {
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle search logic for Rent
    console.log('Searching for rentals in:', location);
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    console.log('Selected location:', newLocation);
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className='field-box'>
          <LocationInput 
            value={location}
            onChange={handleLocationChange}
            placeholder="Where do you want to rent?" 
          />
        </div>
        
        <button type="submit" className='btn w-full md:w-auto bg-primary text-white border-none'>Search</button>
      </form>
      <div className='flex flex-col md:flex-row gap-2 justify-between bg-primary text-white p-6 rounded-2xl mt-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center'>
            <BiCalculator className='h-7 w-7' /><span className='text-white text-base md:text-xl font-bold'>Find the rental cost of a property, instantly</span>
          </div>
          <p className='font-light text-sm'>Get a free online estimate of a property's rental income in minutes</p>
        </div>
        <button className='btn btn-primary bg-transparent rounded-full border-2 border-white text-white px-10 hover:bg-white hover:text-primary'>Start Rent Checker</button>
      </div>
    </>
  );
};

export default RentForm;