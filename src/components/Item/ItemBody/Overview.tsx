import React from 'react'
import { BiBath, BiBed, BiHomeAlt, BiLandscape } from 'react-icons/bi'
import { LuSlidersHorizontal } from 'react-icons/lu'
import { PiGarage, PiHammer } from 'react-icons/pi'
import { CiRuler } from 'react-icons/ci'
import { PropertyListing } from '@/data/types' // Import the interface from types.ts

interface OverviewProps {
  property: PropertyListing;
}

const Overview : React.FC<OverviewProps> = ({ property }) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-6'>
        <div className="flex items-center gap-3 p-2 md:p-4 rounded-lg group">
            <BiHomeAlt className='text-gray-700 w-12 h-12 p-3 rounded-lg border group-hover:bg-primary group-hover:text-white' />
            <div>
                <p className="text-sm text-gray-500">MLS Number:</p>
                <p className="text-normal font-base text-black">{property.mlsNumber}</p>
            </div>
        </div>
        <div className="flex items-center gap-3 p-2 md:p-4 rounded-lg group">
            <LuSlidersHorizontal className='text-gray-700 w-12 h-12 p-3 rounded-lg border group-hover:bg-primary group-hover:text-white' />
            <div>
                <p className="text-sm text-gray-500">Type:</p>
                <p className="text-normal font-base text-black">{property.details.propertyType}</p>
            </div>
        </div>
        <div className="flex items-center gap-3 p-2 md:p-4 rounded-lg group">
            <PiGarage className='text-gray-700 w-12 h-12 p-3 rounded-lg border group-hover:bg-primary group-hover:text-white' />
            <div>
                <p className="text-sm text-gray-500">Garages:</p>
                <p className="text-normal font-base text-black">{property.details.numBathroomsPlus || 'N/A'}</p>
            </div>
        </div>
        <div className="flex items-center gap-3 p-2 md:p-4 rounded-lg group">
            <BiBed className='text-gray-700 w-12 h-12 p-3 rounded-lg border group-hover:bg-primary group-hover:text-white' />
            <div>
                <p className="text-sm text-gray-500">Bedrooms:</p>
                <p className="text-normal font-base text-black">{property.details.numBedrooms} Rooms</p>
            </div>
        </div>
        <div className="flex items-center gap-3 p-2 md:p-4 rounded-lg group">
            <BiBath className='text-gray-700 w-12 h-12 p-3 rounded-lg border group-hover:bg-primary group-hover:text-white' />
            <div>
                <p className="text-sm text-gray-500">Bathrooms:</p>
                <p className="text-normal font-base text-black">{property.details.numBathrooms} Rooms</p>
            </div>
        </div>
        <div className="flex items-center gap-3 p-2 md:p-4 rounded-lg group">
            <BiLandscape className='text-gray-700 w-12 h-12 p-3 rounded-lg border group-hover:bg-primary group-hover:text-white' />
            <div>
                <p className="text-sm text-gray-500">Land Size:</p>
                <p className="text-normal font-base text-black">{property.details.sqft || 'N/A'} SqFt</p>
            </div>
        </div>
        <div className="flex items-center gap-3 p-2 md:p-4 rounded-lg group">
            <PiHammer className='text-gray-700 w-12 h-12 p-3 rounded-lg border group-hover:bg-primary group-hover:text-white' />
            <div>
                <p className="text-sm text-gray-500">Year Built:</p>
                <p className="text-normal font-base text-black">{property.details.sqft || 'N/A'}</p>
            </div>
        </div>
        <div className="flex items-center gap-3 p-2 md:p-4 rounded-lg group">
            <CiRuler className='text-gray-700 w-12 h-12 p-3 rounded-lg border group-hover:bg-primary group-hover:text-white' />
            <div>
                <p className="text-sm text-gray-500">Size:</p>
                <p className="text-normal font-base text-black">{property.details.sqft} SqFt</p>
            </div>
        </div>
    </div>
  )
}

export default Overview