"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const HomeEstimatorBanner = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    addresses: Array<{address: string, city: string, region: string}>;
  }>({
    addresses: []
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock function to get suggestions - in a real app, this would call an API
  const getSuggestions = (term: string) => {
    if (!term || term.length < 2) {
      setSuggestions({ addresses: [] });
      return;
    }
    
    // Mock data - in a real app, this would come from an API
    const mockAddresses = [
      { address: `123 ${term.charAt(0).toUpperCase() + term.slice(1)} Street`, city: 'Toronto', region: 'ON' },
      { address: `456 ${term.charAt(0).toUpperCase() + term.slice(1)} Avenue`, city: 'Vancouver', region: 'BC' },
      { address: `789 ${term.charAt(0).toUpperCase() + term.slice(1)} Boulevard`, city: 'Montreal', region: 'QC' },
      { address: `101 ${term.charAt(0).toUpperCase() + term.slice(1)} Road`, city: 'Calgary', region: 'AB' },
      { address: `202 ${term.charAt(0).toUpperCase() + term.slice(1)} Lane`, city: 'Ottawa', region: 'ON' },
    ];
    
    setSuggestions({
      addresses: mockAddresses
    });
  };
  
  // Handle input change for address
  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    getSuggestions(value);
    setShowSuggestions(true);
  };
  
  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    
    // Navigate to results page or next step
    // router.push(`/home-value-estimator/results?address=${encodeURIComponent(suggestion)}`);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to results page or next step
      // router.push(`/home-value-estimator/results?address=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex-col flex justify-center items-center pt-28 md:pt-[10vw] pb-[4vw] bg-[url('/images/banner2.webp')] bg-cover bg-center relative mx-auto">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="flex flex-col items-center justify-center text-white w-[90%] sm:w-[70%] lg:w-[60%] relative z-10">
        <span className='text-white text-lg mb-4 bg-secondary rounded-full px-10 py-2'>Home Value Estimator</span>
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
           What is My Home Worth?
        </h1>
        <p className="text-lg md:text-xl text-center mb-8">
          Get an instant home value estimate and get in the know about your most precious asset.
        </p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleAddressInputChange}
              onClick={(e) => {
                e.stopPropagation();
                if (searchTerm.length > 1) {
                  setShowSuggestions(true);
                }
              }}
              placeholder="Enter your property address"
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-lg"
            >
              <FaSearch />
            </button>
            
            {/* Address Suggestions Dropdown */}
            {showSuggestions && (searchTerm.length > 1) && (
              <div 
                ref={dropdownRef}
                className="bg-white z-50 w-full shadow absolute text-gray-800 overflow-y-auto max-h-80 rounded-b-lg border border-gray-200 border-t-0 mt-1"
              >
                {/* Addresses Section */}
                {suggestions.addresses.length > 0 ? (
                  <div className="flex flex-wrap">
                    <div className="block flex-grow">
                      <div className="flex items-center bg-gray-100 text-gray-600 px-4 py-2">
                        <FaMapMarkerAlt className="h-4 w-4" />
                        <h5 className="font-bold text-sm pl-2">Addresses</h5>
                      </div>
                      <ul className="overflow-hidden">
                        {suggestions.addresses.map((item, index) => (
                          <li 
                            key={`address-${index}`}
                            className="bg-white hover:bg-blue-50 transition-colors duration-200 border-t border-gray-100 first:border-t-0"
                          >
                            <button 
                              type="button"
                              className="w-full h-full text-left px-4"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSuggestionSelect(`${item.address}, ${item.city}, ${item.region}`);
                              }}
                            >
                              <span className="inline-block py-3 text-sm">
                                <span>
                                  {item.address.split(new RegExp(`(${searchTerm})`, 'i')).map((part, i) => 
                                    part.toLowerCase() === searchTerm.toLowerCase() 
                                      ? <strong key={i}>{part}</strong> 
                                      : part
                                  )}
                                </span>
                                <span className="inline-block ml-1 text-xs text-gray-500">{item.city}, {item.region}</span>
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No addresses found. Try a different search term.
                  </div>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeEstimatorBanner;