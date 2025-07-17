"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FormData } from '../types';

interface LocationStepProps {
  userType: string | null;
  searchTerm: string;
  showSuggestions: boolean;
  suggestions: {
    cities: Array<{name: string, region: string}>;
    neighborhoods: Array<{name: string, city: string, region: string}>;
  };
  formData: FormData;
  handleLocationInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSuggestionSelect: (suggestion: string) => void;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  itemVariants: Variants;
  containerVariants: Variants;
}

const LocationStep: React.FC<LocationStepProps> = ({
  userType,
  searchTerm,
  showSuggestions,
  suggestions,
  formData,
  handleLocationInputChange,
  handleSuggestionSelect,
  handlePrevStep,
  handleNextStep,
  itemVariants,
  containerVariants
}) => {
  // Simple state to track if a location has been selected
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  // Local state to track the input value
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || formData.location);
  // Ref for the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Effect to check if location is already selected (for back navigation)
  useEffect(() => {
    if (formData.location) {
      setIsLocationSelected(true);
    }
    
    // Keep local state in sync with props
    setLocalSearchTerm(searchTerm || formData.location);
  }, [formData.location, searchTerm]);
  
  // Handle local input change
  const handleLocalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    handleLocationInputChange(e);
  };
  
  // Simple function to handle suggestion selection
  const selectSuggestion = (suggestion: string) => {
    // Update local state immediately
    setLocalSearchTerm(suggestion);
    setIsLocationSelected(true);
    
    // Call parent handler directly with the suggestion
    handleSuggestionSelect(suggestion);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-2xl mx-auto"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6 text-gray-800">
        Where are you looking to {userType === 'seller' ? 'sell' : 'buy'} property?
      </motion.h2>
      
      <motion.div variants={itemVariants} className="mb-8">
        <div className="relative">
          {/* Location Input */}
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={localSearchTerm}
              onChange={handleLocalInputChange}
              placeholder="Enter city, neighborhood, or postal code"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Suggestions Dropdown - Fixed positioning and z-index */}
          {showSuggestions && localSearchTerm.length > 1 && (
            <div 
              ref={dropdownRef}
              className="absolute z-[100] w-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 max-h-80 overflow-y-auto"
              style={{ top: "calc(100% + 4px)" }}
            >
              {/* Cities */}
              {suggestions.cities.length > 0 && (
                <div>
                  <div className="bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">Cities</div>
                  <ul>
                    {suggestions.cities.map((city, index) => (
                      <li 
                        key={`city-${index}`} 
                        className="border-t border-gray-100 first:border-t-0"
                      >
                        <div
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors cursor-pointer"
                          onClick={() => selectSuggestion(`${city.name}, ${city.region}`)}
                        >
                          <span className="text-gray-800">{city.name}</span>
                          <span className="text-gray-500 text-sm ml-1">{city.region}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Neighborhoods */}
              {suggestions.neighborhoods.length > 0 && (
                <div>
                  <div className="bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">Neighborhoods</div>
                  <ul>
                    {suggestions.neighborhoods.map((neighborhood, index) => (
                      <li 
                        key={`neighborhood-${index}`}
                        className="border-t border-gray-100 first:border-t-0"
                      >
                        <div
                          className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors cursor-pointer"
                          onClick={() => selectSuggestion(`${neighborhood.name}, ${neighborhood.city}, ${neighborhood.region}`)}
                        >
                          <span className="text-gray-800">{neighborhood.name}</span>
                          <span className="text-gray-500 text-sm ml-1">{neighborhood.city}, {neighborhood.region}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* No results */}
              {suggestions.cities.length === 0 && suggestions.neighborhoods.length === 0 && (
                <div className="px-4 py-3 text-center text-gray-500">
                  No locations found. Try a different search term.
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <motion.button
          variants={itemVariants}
          onClick={handlePrevStep}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
        >
          Back
        </motion.button>
        <motion.button
          variants={itemVariants}
          onClick={handleNextStep}
          disabled={!isLocationSelected}
          className={`px-6 py-2 rounded-lg text-white transition-all ${
            isLocationSelected ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LocationStep;