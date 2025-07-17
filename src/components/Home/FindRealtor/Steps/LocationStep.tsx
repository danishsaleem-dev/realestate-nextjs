"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { FormData } from '../types';
import LocationInput from '@/components/Home/Hero/LocationInput';

interface LocationStepProps {
  userType: string | null;
  searchTerm: string;
  formData: FormData;
  handleLocationInputChange: (location: string) => void;
  handleSuggestionSelect: (suggestion: string) => void;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  itemVariants: Variants;
  containerVariants: Variants;
}

const LocationStep: React.FC<LocationStepProps> = ({
  userType,
  searchTerm,
  formData,
  handleLocationInputChange,
  handleSuggestionSelect,
  handlePrevStep,
  handleNextStep,
  itemVariants,
  containerVariants
}) => {
  // State to track if a location has been selected
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  // State to store coordinates
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  
  // Effect to check if location is already selected (for back navigation)
  useEffect(() => {
    if (formData.location) {
      setIsLocationSelected(true);
    }
  }, [formData.location]);
  
  // Handle location change
  const handleLocationChange = (value: string) => {
    handleLocationInputChange(value);
    setIsLocationSelected(!!value);
  };
  
  // Handle location selection with coordinates
  const handleLocationWithCoordinates = (coords: {lat: number, lng: number} | null) => {
    setCoordinates(coords);
    if (coords) {
      console.log("Selected location coordinates:", coords);
      // You can store these coordinates in formData if needed
    }
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
        <LocationInput
          value={searchTerm || formData.location || ''}
          onChange={handleLocationChange}
          onSelectCoordinates={handleLocationWithCoordinates}
          placeholder="Enter city, neighborhood, or postal code"
          className="w-full"
        />
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