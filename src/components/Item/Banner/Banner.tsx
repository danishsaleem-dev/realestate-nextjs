import React, { useState } from 'react'
import { BiHeart, BiPrinter, BiShare } from 'react-icons/bi';
import { FaBath, FaBed, FaSquare } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import BlurImage from '../../Helper/BlurImage';
import { PropertyListing } from '@/data/types'; // Import the interface from types.ts

interface BannerProps {
    property: PropertyListing;
}

const Banner: React.FC<BannerProps> = ({ property }) => {
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
    
    // Format price with commas and handle currency
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(property.listPrice);

    // Create a property name from property type and location
    const propertyName = `${property.details.propertyType} in ${property.address.city || 'Unknown Location'}`;

    // Handle image error for a specific index
    const handleImageError = (index: number) => {
        setImageErrors(prev => ({
            ...prev,
            [index]: true
        }));
    };

    // Get image source with fallback
    const getImageSrc = (index: number) => {
        if (imageErrors[index]) {
            return `/images/p${(index % 5) + 1}.jpg`;
        }
        
        if (property.images.allImages && property.images.allImages.length > index) {
            return property.images.allImages[index];
        }
        
        return `/images/p${(index % 5) + 1}.jpg`;
    };

    return (
        <>
            <div className='w-[95%] mx-auto flex flex-row gap-4 mt-20'>
                {/* Main large image */}
                <BlurImage 
                    className='w-1/2 rounded-2xl' 
                    src={getImageSrc(0)} 
                    alt={propertyName} 
                    width={1920} 
                    height={1080}
                    onError={() => handleImageError(0)}
                    unoptimized={true}
                />
                
                {/* First column of smaller images */}
                <div className='w-1/4 flex flex-col gap-4'>
                    <BlurImage 
                        className='rounded-2xl' 
                        src={getImageSrc(1)} 
                        alt={propertyName} 
                        width={1920} 
                        height={1080}
                        onError={() => handleImageError(1)}
                        unoptimized={true}
                    />
                    <BlurImage 
                        className='rounded-2xl' 
                        src={getImageSrc(2)} 
                        alt={propertyName} 
                        width={1920} 
                        height={1080}
                        onError={() => handleImageError(2)}
                        unoptimized={true}
                    />
                </div>
                
                {/* Second column of smaller images */}
                <div className='w-1/4 flex flex-col gap-4'>
                    <BlurImage 
                        className='rounded-2xl' 
                        src={getImageSrc(3)} 
                        alt={propertyName} 
                        width={1920} 
                        height={1080}
                        onError={() => handleImageError(3)}
                        unoptimized={true}
                    />
                    <BlurImage 
                        className='rounded-2xl' 
                        src={getImageSrc(4)} 
                        alt={propertyName} 
                        width={1920} 
                        height={1080}
                        onError={() => handleImageError(4)}
                        unoptimized={true}
                    />
                </div>
            </div>
            <div className='w-[95%] mx-auto mb-10 border border-2 rounded-xl p-4 mt-4'>
                <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 py-5 md:py-10'>
                    <h1 className='text-black text-4xl'>{propertyName}</h1>
                    <div className='text-gray-500'>
                        <span className='text-2xl md:text-3xl text-black font-bold'>{formattedPrice}</span>
                    </div>
                </div>
                <div className='flex flex-col gap-4 md:flex-row justify-between md:items-center py-5'>
                    <div className='flex flex-col md:flex-row gap-8 md:w-[80%]'>
                        <div className='flex flex-col gap-2'>
                            <span className='text-lg text-gray-700 font-bold'>Features</span>
                            <div className='flex items-center mt-2 gap-3'>
                                <div className='flex items-center space-x-2'>
                                    <FaBed className='text-gray-500' />
                                    <p className='text-sm text-gray-500'>Beds: <span className='text-black'>{property.details.numBedrooms}</span></p>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <FaBath className='text-gray-500' />
                                    <p className='text-sm text-gray-500'>Baths: <span className='text-black'>{property.details.numBathrooms}</span></p>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <FaSquare className='text-gray-500' />
                                    <p className='text-sm text-gray-500'>Sqft: <span className='text-black'>{property.details.sqft} sqft</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 md:w-1/2'>
                            <span className='text-lg text-gray-700 font-bold'>Location</span>
                            <div className='flex items-center justify-between mt-2 gap-3'>
                                <div className='flex space-x-2'>
                                    <HiLocationMarker className='text-gray-500' />
                                    <p className='text-sm text-gray-500'>
                                    {property.address.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:w-[20%] flex gap-2 justify-end'>
                        <BiHeart className='text-gray-400 hover:text-secondary hover:border-secondary cursor-pointer w-10 h-10 p-2 rounded-lg border transition-all delay-100'/>
                        <BiShare className='text-gray-400 hover:text-secondary hover:border-secondary cursor-pointer w-10 h-10 p-2 rounded-lg border transition-all delay-100'/>
                        <BiPrinter className='text-gray-400 hover:text-secondary hover:border-secondary cursor-pointer w-10 h-10 p-2 rounded-lg border transition-all delay-100'/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner