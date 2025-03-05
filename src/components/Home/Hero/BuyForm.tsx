import React from 'react';
import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const BuyForm = () => {
    const [priceRange, setPriceRange] = useState([0, 1000000]); // [minPrice, maxPrice]
    const handleSliderChange = (value: number | number[]) => {
      if (Array.isArray(value)) {
        setPriceRange(value as [number, number]);
      }
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle search logic for Rent
    };
  
    return (
      <form onSubmit={handleSearch}>
        <div className='field-box'>
          <label>Location</label>
          <input type="text" name="location" placeholder="Enter location" required />
        </div>
        <div className='field-box'>
          <label>Property Type</label>
          <select name="propertyType" required>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
          </select>
        </div>
        <div className='field-box'>
          <label>Price Range</label>
          <div className="slider-container">
            <Slider
              range
              min={0}
              max={1000000}
              defaultValue={[0, 1000000]}
              value={priceRange}
              onChange={handleSliderChange}
            />
            <div className="slider-values">
              <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
        <button type="submit">Search</button>
      </form>
    );
  };
  export default BuyForm;