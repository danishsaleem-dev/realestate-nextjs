import Image from 'next/image'
import React from 'react'
import { BiLinkExternal } from 'react-icons/bi';
import { BsHeart, BsPlusSquare } from 'react-icons/bs';
import { FaBath, FaBed, FaSquare } from 'react-icons/fa';
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
    <div className='bg-white overflow-hidden group rounded-lg cursor-pointer shadow-lg'>
            <div className='relative w-full h-72'>
                <Image src={property.imageUrl} alt={property.propertyName} layout='fill' objectFit='cover' className='w-full object-cover group-hover:scale-110 transition-all duration-300 ration rounded-t-lg' />
                <h3 className='text-sm font-bold px-6 absolute bottom-4 left-4 py-1.5 bg-black text-white rounded-lg'>${property.price} / mo</h3>
                <div className='flex items-center text-sm font-medium px-6 absolute top-4 left-4 py-1.5 bg-rose-600 text-white rounded-md'>
                    <MdElectricBolt className='mr-1' />
                    <span>Featured</span>
                </div>
            </div>
            <div className='p-5'>
                <h3 className='pt-2 pb-2 font-bold text-lg group-hover:underline'>{property.propertyName}</h3>
                <p className='text-sm text-gray-700'>{property.location}</p>
                <div className='flex items-center justify-between mt-5 w-full lg:w-[80%]'>
                    <div className='flex items-center space-x-2'>
                        <FaBed className='text-rose-600' />
                        <p className='text-xs text-gray-700'>{property.bedrooms} Bedrooms</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <FaBath className='text-rose-600' />
                        <p className='text-xs text-gray-700'>{property.bathrooms} Bathrooms</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <FaSquare className='text-rose-600' />
                        <p className='text-xs text-gray-700'>{property.size} sqrt</p>
                    </div>
                </div>
                <div className='h-[1.2px] mt-4 mb-4 bg-gray-500 opacity-15'></div>
                <div className='flex items-center justify-between'>
                    <span className='text-xs font-medium text-gray-500'>For Rent</span>
                    <div className='flex items-center space-x-4 text-gray-500'>
                        <BiLinkExternal />
                        <BsPlusSquare />
                        <BsHeart />
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PropertyCard