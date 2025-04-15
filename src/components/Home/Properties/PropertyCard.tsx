import Image from 'next/image';
import React, { useState } from 'react';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import Link from 'next/link';

interface Property {
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
    location: string; // Full formatted address
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

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [imgError, setImgError] = useState(false);
  
  // Format price with commas and handle currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price);

  // Use a fallback image if the URL is invalid or on error
  const imageSrc = imgError ? '/images/p1.jpg' : property.images.imageUrl;

  return (
    <Link href={`/property/${property.id}`} className="block">
      <div className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer'>
        <div className='relative h-64 w-full'>
          <Image 
            src={imageSrc} 
            alt={property.propertyName}
            fill
            className='object-cover'
            onError={() => setImgError(true)}
            unoptimized={!property.images.imageUrl.startsWith('/')}
          />
          <div className='absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-md'>
            {property.type}
          </div>
          <div className='absolute bottom-4 right-4 bg-white text-primary px-3 py-1 rounded-md font-bold'>
            {formattedPrice}
          </div>
        </div>
        <div className='p-4'>
          <h3 className='text-xl font-semibold mb-2 truncate'>{property.propertyName}</h3>
          <p className='text-gray-600 mb-4 truncate'>{property.address.location}</p>
          <div className='flex justify-between text-gray-700'>
            <div className='flex items-center'>
              <FaBed className='mr-2' />
              <span>{property.details.bedrooms} Beds</span>
            </div>
            <div className='flex items-center'>
              <FaBath className='mr-2' />
              <span>{property.details.bathrooms} Baths</span>
            </div>
            <div className='flex items-center'>
              <FaRulerCombined className='mr-2' />
              <span>{property.details.size} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;