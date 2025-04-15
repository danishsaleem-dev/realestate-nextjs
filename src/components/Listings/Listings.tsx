"use client";

import React, { useState, useEffect } from 'react';
import { fetchPropertyListings } from '@/data/data';
import { FaMapMarkerAlt, FaList } from 'react-icons/fa';
import ListingGrid from './ListingGrid';
import ListingFilters from './ListingFilters';


interface PropertyListing {
  id: string;
  propertyName: string;
  description: string;
  class: string;
  type: string;
  price: number;
  address: {
    area: string | null;
    city: string | null;
    country: string | null;
    district: string | null;
    majorIntersection: string | null;
    neighborhood: string | null;
    streetDirection: string | null;
    streetName: string | null;
    streetNumber: string | null;
    streetSuffix: string | null;
    unitNumber: string | null;
    zip: string | null;
    state: string | null;
    communityCode: string | null;
    streetDirectionPrefix: string | null;
    addressKey: string | null;
    location: string;
  };
  map: {
    latitude: number | null;
    longitude: number | null;
    point: string | null;
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    size: number;
    landSize: number | string;
  };
  images: {
    imageUrl: string;
    allImages: string[];
  };
}

const Listings = () => {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000000,
    bedrooms: 0,
    bathrooms: 0,
    propertyType: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchPropertyListings();
        setProperties(data);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  // Function to build map URL with all property markers
  const getMapUrl = () => {
    const baseUrl = 'https://www.google.com/maps/embed/v1/view?key=AIzaSyB0KWOeJWvvAoo5pbLcqYTnqhCv1mp3X5U';
    
    // If a property is selected, center on that property
    if (selectedProperty && selectedProperty.map.latitude && selectedProperty.map.longitude) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyB0KWOeJWvvAoo5pbLcqYTnqhCv1mp3X5U&center=${selectedProperty.map.latitude},${selectedProperty.map.longitude}&q=${selectedProperty.map.latitude},${selectedProperty.map.longitude}&zoom=15`;
    }
    
    // If we have properties with coordinates, center the map on the first one
    const propertiesWithCoords = properties.filter(p => p.map.latitude && p.map.longitude);
    if (propertiesWithCoords.length > 0) {
      const firstProperty = propertiesWithCoords[0];
      return `${baseUrl}&center=${firstProperty.map.latitude},${firstProperty.map.longitude}&zoom=10`;
    }
    
    // Default view if no properties have coordinates
    return `${baseUrl}&center=40.7128,-74.0060&zoom=10`;
  };

  // Filter properties based on current filters
  const filteredProperties = properties.filter(property => {
    return (
      property.price >= filters.minPrice &&
      property.price <= filters.maxPrice &&
      property.details.bedrooms >= filters.bedrooms &&
      property.details.bathrooms >= filters.bathrooms &&
      (filters.propertyType === 'all' || property.type.toLowerCase().includes(filters.propertyType.toLowerCase()))
    );
  });

  // Handle property card click
  const handlePropertyClick = (property: PropertyListing) => {
    setSelectedProperty(property);
  };

  // Toggle filter panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Update filters
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: name === 'propertyType' ? value : Number(value)
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-24 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Property Listings</h1>
        <div className="flex space-x-4">
          
          <div className="flex border rounded-md overflow-hidden">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-secondary text-white' : 'bg-white text-gray-700'}`}
            >
              <FaList />
            </button>
            <button 
              onClick={() => setViewMode('split')}
              className={`px-3 py-2 ${viewMode === 'split' ? 'bg-secondary text-white' : 'bg-white text-gray-700'}`}
            >
              <div className="flex gap-1">
                <FaList className="w-3" />
                <FaMapMarkerAlt className="w-3" />
              </div>
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`px-3 py-2 ${viewMode === 'map' ? 'bg-secondary text-white' : 'bg-white text-gray-700'}`}
            >
              <FaMapMarkerAlt />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <ListingFilters 
        filters={filters}
        showFilters={showFilters}
        toggleFilters={toggleFilters}
        handleFilterChange={handleFilterChange}
      />

      <div className={`flex ${viewMode === 'map' ? 'flex-col' : viewMode === 'list' ? 'flex-col' : 'flex-col md:flex-row'} gap-6`}>
        {/* Property Listings */}
        {(viewMode === 'list' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'md:w-1/2' : 'w-full'} overflow-y-auto`} style={{ maxHeight: viewMode === 'split' ? 'calc(100vh - 200px)' : 'auto' }}>
            <div className="grid grid-cols-1 gap-6">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div 
                    key={property.id}
                    className={`cursor-pointer transition-all ${selectedProperty?.id === property.id ? 'ring-2 ring-secondary' : ''}`}
                    onClick={() => handlePropertyClick(property)}
                  >
                    <ListingGrid property={property} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500 text-lg">No properties match your current filters.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Map View */}
        {(viewMode === 'map' || viewMode === 'split') && (
          <div className={`${viewMode === 'split' ? 'md:w-1/2' : 'w-full'} bg-gray-100 rounded-lg overflow-hidden`} style={{ height: viewMode === 'split' ? 'calc(100vh - 200px)' : '70vh' }}>
            <iframe
              className="w-full h-full"
              src={getMapUrl()}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings