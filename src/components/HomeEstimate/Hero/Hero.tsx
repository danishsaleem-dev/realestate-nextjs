"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaSearch, FaBed, FaBath, FaRuler } from 'react-icons/fa';

const HomeEstimatorBanner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    properties: Array<{
      id: string;
      address: string;
      city: string;
      region: string;
      bedrooms: number;
      bathrooms: number;
      sqft: number;
      propertyType: string;
      yearBuilt: number;
    }>;
    totalCount: number;
  }>({
    properties: [],
    totalCount: 0
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to get property suggestions from API
  const getPropertySuggestions = async (term: string) => {
    if (!term || term.length < 2) {
      setSuggestions({ properties: [], totalCount: 0 });
      return;
    }
    
    try {
      // Fetch from your data source - replace with the correct import and function call
      // For example, if you have a data.ts file with property listings:
      const { fetchPropertyListings } = await import('@/data/data');
      const allProperties = await fetchPropertyListings();
      
      // Filter properties based on search term
      const filteredProperties = allProperties.filter(property => {
        const addressString = `${property.address.streetNumber || ''} ${property.address.streetName || ''} ${property.address.city || ''} ${property.address.state || ''}`.toLowerCase();
        return addressString.includes(term.toLowerCase());
      });
      
      // Map to the expected format
      const formattedProperties = filteredProperties.map(property => ({
        id: property.id,
        address: `${property.address.streetNumber || ''} ${property.address.streetName || ''} ${property.address.streetSuffix || ''}`,
        city: property.address.city || '',
        region: property.address.state || '',
        bedrooms: property.details.bedrooms,
        bathrooms: property.details.bathrooms,
        sqft: typeof property.details.size === 'number' ? property.details.size : 0,
        propertyType: property.type || '',
        yearBuilt: 2000 // If you don't have this data, provide a default or omit
      }));
      
      setSuggestions({
        properties: formattedProperties.slice(0, 5), // Limit to 5 results for dropdown
        totalCount: filteredProperties.length
      });
    } catch (error) {
      console.error('Error fetching property suggestions:', error);
      setSuggestions({ properties: [], totalCount: 0 });
    }
  };
  
  // Use a proper debounce function
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      getPropertySuggestions(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  // Handle input change for address
  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    
    // Clear any existing timeout
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }
    
    // Set a new timeout to avoid too many API calls
    window.searchTimeout = setTimeout(() => {
      getPropertySuggestions(value);
    }, 300);
    
    setShowSuggestions(true);
  };
  
  // Handle suggestion selection
  const handleSuggestionSelect = (property: { address: string, city: string, region: string }) => {
    setSearchTerm(`${property.address}, ${property.city}, ${property.region}`);
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
            
            {/* Property Suggestions Dropdown */}
            {showSuggestions && (searchTerm.length > 1) && (
              <div 
                ref={dropdownRef}
                className="bg-white z-50 w-full shadow absolute text-gray-800 overflow-y-auto max-h-80 rounded-b-lg border border-gray-200 border-t-0 mt-1"
              >
                {/* Properties Section */}
                {suggestions.properties.length > 0 ? (
                  <div className="flex flex-wrap">
                    <div className="block flex-grow">
                      <div className="flex items-center justify-between bg-gray-100 text-gray-600 px-4 py-2">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="h-4 w-4" />
                          <h5 className="font-bold text-sm pl-2">Properties</h5>
                        </div>
                        <span className="text-xs font-medium text-gray-500">({suggestions.totalCount.toLocaleString()})</span>
                      </div>
                      <ul className="overflow-hidden">
                        {suggestions.properties.map((property) => (
                          <li 
                            key={`property-${property.id}`}
                            className="bg-white hover:bg-blue-50 transition-colors duration-200 border-t border-gray-100 first:border-t-0"
                          >
                            <button 
                              type="button"
                              className="w-full h-full text-left px-4 py-3"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSuggestionSelect({
                                  address: property.address,
                                  city: property.city,
                                  region: property.region
                                });
                              }}
                            >
                              <div className="flex flex-col">
                                <div className="font-medium">
                                  {property.address.split(new RegExp(`(${searchTerm})`, 'i')).map((part, i) => 
                                    part.toLowerCase() === searchTerm.toLowerCase() 
                                      ? <strong key={i}>{part}</strong> 
                                      : part
                                  )}
                                  <span className="inline-block ml-1 text-xs text-gray-500">{property.city}, {property.region}</span>
                                </div>
                                <div className="flex items-center mt-1 text-xs text-gray-600">
                                  <div className="flex items-center mr-3">
                                    <FaBed className="mr-1" />
                                    <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
                                  </div>
                                  <div className="flex items-center mr-3">
                                    <FaBath className="mr-1" />
                                    <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <FaRuler className="mr-1" />
                                    <span>{property.sqft.toLocaleString()} sqft</span>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {property.propertyType} • Built in {property.yearBuilt}
                                </div>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No properties found. Try a different search term.
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