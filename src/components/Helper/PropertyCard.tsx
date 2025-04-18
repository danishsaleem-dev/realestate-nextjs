import Image from 'next/image';
import React, { useState } from 'react';
import { FaBed, FaBath, FaRulerCombined, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { PropertyListing } from '@/data/types';

interface PropertyCardProps {
  property: PropertyListing;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [imgError, setImgError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Format price with commas and handle currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.listPrice);

  // Get all images or use fallback
  const images = imgError || !property.images.allImages || property.images.allImages.length === 0 
    ? ['/images/p1.jpg', '/images/p2.jpg', '/images/p3.jpg'] 
    : property.images.allImages;

  // Current image to display
  const currentImage = images[currentImageIndex];

  // Create a property name from property type and location
  const propertyName = `${property.details.propertyType} in ${property.address.city || 'Unknown Location'}`;

  // Handle image navigation
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Link href={`/property/${property.mlsNumber}`} className="block">
      <div className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer'>
        <div className='relative h-64 w-full'>
          <Image 
            src={currentImage} 
            alt={propertyName}
            fill
            className='object-cover'
            onError={() => setImgError(true)}
            unoptimized={!currentImage.startsWith('/')}
          />
          
          {/* Image navigation controls */}
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <button 
              onClick={prevImage} 
              className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={nextImage} 
              className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          </div>
          
          {/* Image counter */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {currentImageIndex + 1}/{images.length}
          </div>
          
          <div className='absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-md'>
            {property.details.propertyType}
          </div>
          <div className='absolute bottom-4 right-4 bg-white text-primary px-3 py-1 rounded-md font-bold'>
            {formattedPrice}
          </div>
        </div>
        <div className='p-4'>
          <h3 className='text-xl mb-2 truncate'>{propertyName}</h3>
          <p className='text-gray-600 mb-4 truncate'>{property.address.location}</p>
          <div className='flex justify-between text-gray-700'>
            <div className='flex items-center'>
              <FaBed className='mr-2' />
              <span>{property.details.numBedrooms}</span>
            </div>
            <div className='flex items-center'>
              <FaBath className='mr-2' />
              <span>{property.details.numBathrooms}</span>
            </div>
            <div className='flex items-center'>
              <FaRulerCombined className='mr-2' />
              <span>{property.details.sqft} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;