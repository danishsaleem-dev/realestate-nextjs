"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Banner from './Banner/Banner'
import ItemBody from './ItemBody/ItemBody'
import { fetchPropertyListings } from '@/data/data'

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

const Item: React.FC = () => {
  const params = useParams();
  const propertyId = params?.id as string || '';
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const listings = await fetchPropertyListings();
        const foundProperty = listings.find(p => p.id === propertyId);
        
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        setError('Failed to load property details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading property details...</div>;
  }

  if (error || !property) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Property not found'}</div>;
  }

  return (
    <div className='overflow-hidden bg-white'>
      <Banner property={property} />
      <ItemBody property={property} />
    </div>
  )
}

export default Item