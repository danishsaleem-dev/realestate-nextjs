import React from 'react';
import { FaFilter } from 'react-icons/fa';
import { BiReset } from 'react-icons/bi';

interface FiltersProps {
  filters: {
    minPrice: number;
    maxPrice: number;
    bedrooms: number;
    bathrooms: number;
    propertyType: string;
  };
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resetFilters: () => void;
}

const ListingFilters: React.FC<FiltersProps> = ({ 
  filters, 
  handleFilterChange, 
  resetFilters 
}) => {
  return (
    <div className=" p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-black flex items-center">
          <FaFilter className="mr-2" /> Filter Properties
        </h2>
        <button 
          onClick={resetFilters}
          className="flex items-center text-primary hover:text-secondary transition-colors"
        >
          <BiReset className="mr-1" /> Reset Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
          <input
            type="range"
            name="minPrice"
            min="0"
            max="1000000"
            step="10000"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-sm text-gray-600 mt-1">
            ${filters.minPrice.toLocaleString()}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
          <input
            type="range"
            name="maxPrice"
            min="100000"
            max="1000000"
            step="10000"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-sm text-gray-600 mt-1">
            ${filters.maxPrice.toLocaleString()}
          </div>
        </div>
        
        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="0">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
        
        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
          <select
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="0">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
        
        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="all">All Types</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ListingFilters;