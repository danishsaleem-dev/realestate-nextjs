import SectionHeading from '@/components/Helper/SectionHeading'
import { properties } from '@/data/data'
import React from 'react'
import { useState } from 'react';
import PropertyCard from './PropertyCard'
import { FaArrowRightLong } from 'react-icons/fa6';

const Properties = () => {
    const [filter, setFilter] = useState('All');

  // Filter Properties by Type
  const filteredAppartmentTypeData = filter === 'All' 
    ? properties
    : properties.filter(type => type.type === filter);

    // Get unique types
    const uniqueTypes = ['All', ...new Set(properties.map(property => property.type))];

  return (
    <>
    <div className='pt-16 pb-16 bg-gray-100'>
        <div className='w-[90%] mx-auto text-center'>
            <SectionHeading heading='Discover Our Properties' subheading='Featured Properties' description='' />
            {/* Buttons for filtering */}
            <div className="flex items-center justify-center space-x-4 mt-8 mb-8">
                {uniqueTypes.map((type) => (
                    
                    <button 
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 rounded-full transition duration-300 
                        ${filter === type ? 'bg-primary text-white' : 'bg-white text-black'}`}
                    >
                    {type}
                    </button>
                
                ))}
            </div>

            {/* Display filtered properties */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 mt-10 md:mt-20 gap-10 items-center'>
                {filteredAppartmentTypeData.map((property) => (
                    <div key={property.id}>
                        <PropertyCard property={property} />
                    </div>
                ))}
            </div>
            <button className='btn btn-primary rounded-full text-center mt-10'>View All Properties <FaArrowRightLong /> </button>
        </div>   
    </div>
    </>
  )
}

export default Properties