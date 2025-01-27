import Image from 'next/image'
import React from 'react'
import { BiLinkExternal } from 'react-icons/bi';
import { BsHeart, BsPlusSquare } from 'react-icons/bs';
import { FaBath, FaBed, FaSquare } from 'react-icons/fa';

import { HiLocationMarker } from 'react-icons/hi';
import { MdElectricBolt } from 'react-icons/md';

type Props = {
    property: {
        id: number;
        propertyName: string;
        location: string;
        bedrooms: number;
        bathrooms: number;
        size: number;
        price: number;
        imageUrl: string;
    }
}

const PropertyCard = ({property}: Props) => {
  return (
    <div className='bg-white overflow-hidden group rounded-2xl cursor-pointer shadow-lg'>
            <div className='relative w-full h-72 overflow-hidden'>
                <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10'></div>
                <Image src={property.imageUrl} alt={property.propertyName} layout='fill' objectFit='cover' className='w-full object-cover group-hover:scale-110 transition-all duration-300 ration rounded-t-lg' />
                <h3 className='text-sm px-6 absolute bottom-2 text-white flex items-center z-20'><HiLocationMarker className='mr-2'/> {property.location}</h3>
                <div className='flex items-center text-sm font-medium px-3 absolute top-4 left-4 py-1.5 bg-primary text-white rounded-full z-20'>
                    <MdElectricBolt className='mr-1' />
                    <span>Featured</span>
                </div>
            </div>
            <div className='p-5'>
                <h3 className='font-medium text-left text-lg text-black group-hover:text-primary'>{property.propertyName}</h3>
                <div className='flex items-center justify-between mt-2 w-full lg:w-[70%]'>
                    <div className='flex items-center space-x-2'>
                        <FaBed className='text-gray-500' />
                        <p className='text-sm text-gray-500'>Beds: <span className='text-black'>{property.bedrooms}</span></p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <FaBath className='textgray-text-gray-5000' />
                        <p className='text-sm text-gray-500'>Baths: <span className='text-black'>{property.bathrooms}</span></p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <FaSquare className='tegray-text-gray-500600' />
                        <p className='text-sm text-gray-500'>Sqft: <span className='text-black'>{property.size}</span></p>
                    </div>
                </div>
                <div className='h-[1.2px] mt-4 mb-4 bg-gray-500 opacity-15'></div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-between space-x-2'>
                        <span className='text-sm font-medium text-gray-500'>For Rent</span>
                        <div className='flex items-center space-x-2 text-gray-500'>
                            <BiLinkExternal />
                            <BsPlusSquare />
                            <BsHeart />
                        </div>
                    </div>
                    <h4 className='text-lg text-black'>${property.price}</h4>
                </div>
            </div>
        </div>
  )
}

export default PropertyCard