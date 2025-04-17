"use client";

import React from 'react';
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
  // Create a ref for the input element
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // Track if a valid location has been selected
  const [isValidLocation, setIsValidLocation] = React.useState(false);
  
  // Function to check if a location is in the suggestions list
  const checkIfLocationIsValid = React.useCallback((location: string): boolean => {
    if (!location) return false;
    
    // Check if the location matches any city in suggestions
    const cityMatch = suggestions.cities.some(city => 
      `${city.name}, ${city.region}` === location
    );
    
    // Check if the location matches any neighborhood in suggestions
    const neighborhoodMatch = suggestions.neighborhoods.some(neighborhood => 
      `${neighborhood.name}, ${neighborhood.city}, ${neighborhood.region}` === location
    );
    
    return cityMatch || neighborhoodMatch;
  }, [suggestions]);
  
  // Update the input value when searchTerm or formData.location changes
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchTerm || formData.location;
    }
    
    // Check if the current location is in the suggestions list
    const isLocationValid = checkIfLocationIsValid(searchTerm || formData.location);
    setIsValidLocation(isLocationValid);
  }, [searchTerm, formData.location, suggestions, checkIfLocationIsValid]);

  // Modified suggestion select handler
  const onSuggestionSelect = (suggestion: string) => {
    // Call the parent handler
    handleSuggestionSelect(suggestion);
    
    // Directly update the input value as a fallback
    if (inputRef.current) {
      inputRef.current.value = suggestion;
    }
    
    // Mark as valid location since it was selected from dropdown
    setIsValidLocation(true);
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
          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
          <input
            ref={inputRef}
            type="text"
            name="location"
            defaultValue={searchTerm || formData.location}
            onChange={handleLocationInputChange}
            onClick={(e) => {
              e.stopPropagation();
              if ((searchTerm || formData.location).length > 1) {
                // Show suggestions if there's text
              }
            }}
            placeholder="Enter city, neighborhood, or postal code"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          
          {/* Address Suggestions Dropdown */}
          {showSuggestions && (searchTerm.length > 1 || formData.location.length > 1) && (
            <div 
              className="bg-white z-50 w-full shadow absolute text-gray-800 overflow-y-auto max-h-80 rounded-b-lg border border-gray-200 border-t-0"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside dropdown from closing it
            >
              {/* Cities Section */}
              {suggestions.cities.length > 0 && (
                <div className="flex flex-wrap">
                  <div className="block flex-grow">
                    <div className="flex items-center bg-gray-100 text-gray-600 px-4 py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <h5 className="font-bold text-sm pl-2">City</h5>
                    </div>
                    <ul className="overflow-hidden">
                      {suggestions.cities.map((city, index) => (
                        <li 
                          key={`city-${index}`}
                          className="bg-white hover:bg-blue-50 transition-colors duration-200 border-t border-gray-100 first:border-t-0"
                        >
                          <button 
                            className="w-full h-full text-left px-4"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onSuggestionSelect(`${city.name}, ${city.region}`);
                            }}
                          >
                            <span className="inline-block py-2 text-sm">
                              <span>
                                {city.name.split(new RegExp(`(${searchTerm})`, 'i')).map((part, i) => 
                                  part.toLowerCase() === searchTerm.toLowerCase() 
                                    ? <strong key={i}>{part}</strong> 
                                    : part
                                )}
                              </span>
                              <span className="inline-block ml-1 text-xs text-gray-500">{city.region}</span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Neighborhoods Section */}
              {suggestions.neighborhoods.length > 0 && (
                <div className="flex flex-wrap">
                  <div className="block flex-grow">
                    <div className="flex items-center bg-gray-100 text-gray-600 px-4 py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <h5 className="font-bold text-sm pl-2">Neighborhoods</h5>
                    </div>
                    <ul className="overflow-hidden">
                      {suggestions.neighborhoods.map((neighborhood, index) => (
                        <li 
                          key={`neighborhood-${index}`}
                          className="bg-white hover:bg-blue-50 transition-colors duration-200 border-t border-gray-100 first:border-t-0"
                        >
                          <button 
                            className="w-full h-full text-left px-4"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onSuggestionSelect(`${neighborhood.name}, ${neighborhood.city}, ${neighborhood.region}`);
                            }}
                          >
                            <span className="inline-block py-2 text-sm">
                              <span>
                                {neighborhood.name.split(new RegExp(`(${searchTerm})`, 'i')).map((part, i) => 
                                  part.toLowerCase() === searchTerm.toLowerCase() 
                                    ? <strong key={i}>{part}</strong> 
                                    : part
                                )}
                              </span>
                              <span className="inline-block ml-1 text-xs text-gray-500">{neighborhood.city}, {neighborhood.region}</span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* No results message */}
              {suggestions.cities.length === 0 && suggestions.neighborhoods.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No locations found. Try a different search term.
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
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
          disabled={!isValidLocation} // Only enable if a valid location is selected
          className={`px-6 py-2 rounded-lg text-white transition-all ${
            isValidLocation ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LocationStep;