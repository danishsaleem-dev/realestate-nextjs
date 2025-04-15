"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaHome, FaDollarSign, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

type UserType = 'buyer' | 'seller' | 'both' | null;
type Step = 'userType' | 'location' | 'propertyType' | 'budget' | 'mortgage' | 'final';

interface FindRealtorProps {
  initialUserType?: UserType;
}

const FindRealtor: React.FC<FindRealtorProps> = ({ initialUserType = null }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [currentStep, setCurrentStep] = useState<Step>(initialUserType ? 'location' : 'userType');
  const [formData, setFormData] = useState({
    location: '',
    propertyType: '',
    budget: '',
    mortgage: false
  });
  
  // Add the missing state variables for location suggestions
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    cities: Array<{name: string, region: string}>;
    neighborhoods: Array<{name: string, city: string, region: string}>;
  }>({
    cities: [],
    neighborhoods: []
  });

  // Initialize from URL if available
  useEffect(() => {
    if (initialUserType && currentStep === 'userType') {
      setUserType(initialUserType);
      setCurrentStep('location');
    }
  }, [initialUserType, currentStep]);

  // Add the missing functions for location suggestions
  // Mock function to get suggestions - in a real app, this would call an API
  const getSuggestions = (term: string) => {
    if (!term || term.length < 2) {
      setSuggestions({ cities: [], neighborhoods: [] });
      return;
    }
    
    // Mock data - in a real app, this would come from an API
    const mockCities = [
      { name: `${term.charAt(0).toUpperCase() + term.slice(1)}ville`, region: 'ON' },
      { name: `Old ${term.charAt(0).toUpperCase() + term.slice(1)}`, region: 'ON' },
      { name: `${term.charAt(0).toUpperCase() + term.slice(1)} City`, region: 'BC' },
    ];
    
    const mockNeighborhoods = [
      { name: `North ${term.charAt(0).toUpperCase() + term.slice(1)}`, city: 'Old Toronto', region: 'ON' },
      { name: `${term.charAt(0).toUpperCase() + term.slice(1)} Heights`, city: 'Vancouver', region: 'BC' },
      { name: `${term.charAt(0).toUpperCase() + term.slice(1)} Village`, city: 'Montreal', region: 'QC' },
      { name: `University of ${term.charAt(0).toUpperCase() + term.slice(1)}`, city: 'Old Toronto', region: 'ON' },
      { name: `${term.charAt(0).toUpperCase() + term.slice(1)} Park`, city: 'Calgary', region: 'AB' },
    ];
    
    setSuggestions({
      cities: mockCities,
      neighborhoods: mockNeighborhoods
    });
  };
  
  // Handle input change for location
  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    setFormData(prev => ({ ...prev, location: value }));
    getSuggestions(value);
    setShowSuggestions(true);
  };
  
  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setFormData(prev => ({ ...prev, location: suggestion }));
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle user type selection
  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setCurrentStep('location');
    
    // Update URL with query parameter
    if (type) {
      router.push(`/find-an-agent?userFlow=${type}`, { scroll: false });
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // Handle next step
  const handleNextStep = () => {
    switch (currentStep) {
      case 'location':
        setCurrentStep('propertyType');
        break;
      case 'propertyType':
        setCurrentStep('budget');
        break;
      case 'budget':
        setCurrentStep('mortgage');
        break;
      case 'mortgage':
        setCurrentStep('final');
        break;
      default:
        break;
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    switch (currentStep) {
      case 'location':
        setCurrentStep('userType');
        break;
      case 'propertyType':
        setCurrentStep('location');
        break;
      case 'budget':
        setCurrentStep('propertyType');
        break;
      case 'mortgage':
        setCurrentStep('budget');
        break;
      case 'final':
        setCurrentStep('mortgage');
        break;
      default:
        break;
    }
  };

  // Handle sign up/login
  const handleSignUp = () => {
    router.push('/auth/signup');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  };

  // Render user type selection
  const renderUserTypeStep = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center"
    >
      <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8 text-gray-800">
        Find the Right REALTOR® for you
      </motion.h2>
      <motion.p variants={itemVariants} className="text-lg mb-10 text-gray-600">
        I am...
      </motion.p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleUserTypeSelect('buyer')}
          className="bg-primary text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-lg hover:bg-primary-dark transition-all"
        >
          A BUYER
        </motion.button>
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleUserTypeSelect('seller')}
          className="bg-secondary text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-lg hover:bg-secondary-dark transition-all"
        >
          A SELLER
        </motion.button>
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleUserTypeSelect('both')}
          className="bg-gray-700 text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-800 transition-all"
        >
          BOTH
        </motion.button>
      </div>
    </motion.div>
  );

  // Render location step
  const renderLocationStep = () => (
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
            type="text"
            name="location"
            value={searchTerm}
            onChange={handleLocationInputChange}
            onClick={(e) => {
              e.stopPropagation();
              if (searchTerm.length > 1) {
                setShowSuggestions(true);
              }
            }}
            placeholder="Enter city, neighborhood, or postal code"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          
          {/* Address Suggestions Dropdown */}
          {showSuggestions && (searchTerm.length > 1) && (
            <div className="bg-white z-50 w-full shadow absolute text-gray-800 overflow-y-auto max-h-80 rounded-b-lg border border-gray-200 border-t-0">
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
                              e.stopPropagation();
                              handleSuggestionSelect(`${city.name}, ${city.region}`);
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
                              e.stopPropagation();
                              handleSuggestionSelect(`${neighborhood.name}, ${neighborhood.city}, ${neighborhood.region}`);
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
          disabled={!formData.location}
          className={`px-6 py-2 rounded-lg text-white transition-all ${
            formData.location ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );

  // Render property type step
  const renderPropertyTypeStep = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-2xl mx-auto"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6 text-gray-800">
        What type of property are you looking for?
      </motion.h2>
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {['Detached', 'Semi-detached', 'Townhouse', 'Condominium'].map((type) => (
          <div 
            key={type}
            onClick={() => setFormData({...formData, propertyType: type})}
            className={`border ${
              formData.propertyType === type ? 'border-primary bg-primary bg-opacity-10' : 'border-gray-300'
            } rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-all`}
          >
            <FaHome className="mx-auto mb-2 text-2xl text-gray-600" />
            <p>{type}</p>
            {formData.propertyType === type && (
              <div className="mt-2 flex justify-center">
                <FaCheck className="text-primary" />
              </div>
            )}
          </div>
        ))}
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
          disabled={!formData.propertyType}
          className={`px-6 py-2 rounded-lg text-white transition-all ${
            formData.propertyType ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );

  // Render budget step
  const renderBudgetStep = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-2xl mx-auto"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6 text-gray-800">
        What is your budget?
      </motion.h2>
      <motion.div variants={itemVariants} className="mb-8">
        <div className="relative">
          <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
          >
            <option value="">Select your budget</option>
            <option value="Under $300,000">Under $300,000</option>
            <option value="$300,000 - $500,000">$300,000 - $500,000</option>
            <option value="$500,000 - $750,000">$500,000 - $750,000</option>
            <option value="$750,000 - $1,000,000">$750,000 - $1,000,000</option>
            <option value="$1,000,000 - $1,500,000">$1,000,000 - $1,500,000</option>
            <option value="$1,500,000 - $2,000,000">$1,500,000 - $2,000,000</option>
            <option value="$2,000,000+">$2,000,000+</option>
          </select>
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
          disabled={!formData.budget}
          className={`px-6 py-2 rounded-lg text-white transition-all ${
            formData.budget ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );

  // Render mortgage step
  const renderMortgageStep = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-2xl mx-auto"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6 text-gray-800">
        Are you pre-approved for a mortgage?
      </motion.h2>
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center space-x-8">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="mortgage"
              checked={formData.mortgage === true}
              onChange={() => setFormData({...formData, mortgage: true})}
              className="form-radio h-5 w-5 text-primary"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="mortgage"
              checked={formData.mortgage === false}
              onChange={() => setFormData({...formData, mortgage: false})}
              className="form-radio h-5 w-5 text-primary"
            />
            <span>No</span>
          </label>
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
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );

  // Render final step
  const renderFinalStep = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-2xl mx-auto text-center"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <FaCheck className="text-green-500 text-3xl" />
        </div>
      </motion.div>
      <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-4 text-gray-800">
        We've found top {formData.location} agents for you!
      </motion.h2>
      <motion.p variants={itemVariants} className="text-gray-600 mb-8">
        Log in or sign up to get connected with agents who specialize in {formData.propertyType.toLowerCase()} properties in your budget range.
      </motion.p>
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleLogin}
          className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all"
        >
          Log In
        </button>
        <button
          onClick={handleSignUp}
          className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-all"
        >
          Sign Up
        </button>
      </motion.div>
    </motion.div>
  );

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 'userType':
        return renderUserTypeStep();
      case 'location':
        return renderLocationStep();
      case 'propertyType':
        return renderPropertyTypeStep();
      case 'budget':
        return renderBudgetStep();
      case 'mortgage':
        return renderMortgageStep();
      case 'final':
        return renderFinalStep();
      default:
        return null;
    }
  };

  // Progress bar calculation
  const calculateProgress = () => {
    const steps = ['userType', 'location', 'propertyType', 'budget', 'mortgage', 'final'];
    const currentIndex = steps.indexOf(currentStep);
    return ((currentIndex) / (steps.length - 1)) * 100;
  };

  return (
    <div className="md:h-screen py-24 bg-gray-50 flex items-center">
      <div className="w-[90%] max-w-4xl mx-auto">
        {currentStep !== 'userType' && (
          <div className="mb-10">
            <div className="h-2 w-full bg-gray-200 rounded-full">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
        )}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FindRealtor;