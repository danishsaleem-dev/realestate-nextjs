import React from 'react'
import Form from './Form'
import Overview from './Overview'
import Features from './Features'
import Location from './Location'
import Demographics from './Demographics'
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
  }
  
  interface ItemBodyProps {
    property: Property;
  }

const ItemBody: React.FC<ItemBodyProps> = ({ property }) => {
  return (
    <div className='mx-auto w-[90%] flex flex-col md:flex-row justify-between items-start my-5 md:my-20 relative'>
        <div className='md:w-[65%] flex flex-col gap-5'>
            <div className='border-b border-gray-200 py-8'>
                <h2 className='text-black font-medium text-3xl mb-2'>Description</h2>
                <p className='text-gray-500 font-light'>{property.description}</p>
            </div>
            <div className='border-b border-gray-200 py-8'>
                <h2 className='text-black font-medium text-3xl mb-2'>Overview</h2>
                <Overview property={property} />
            </div>
            <div className='border-b border-gray-200 py-8'>
                <h2 className='text-black font-medium text-3xl mb-4'>Video</h2>
                <iframe
                className="w-full h-96 rounded-2xl"
                src="https://www.youtube.com/embed/u31qwQUeGuM?controls=0&autoplay=1&mute=1"
                loading="lazy"
                ></iframe>
            </div>
            <div className='border-b border-gray-200 py-8'>
                <h2 className='text-black font-medium text-3xl mb-6'>Amenities and features</h2>
                <Features />
            </div>
            <div className='border-b border-gray-200 py-8'>
                <h2 className='text-black font-medium text-3xl mb-6'>Map location</h2>
                <Location property={property}  />
            </div>
            {/* <div className='border-b border-gray-200 py-8'>
                <h2 className='text-black font-medium text-3xl mb-6'>Explore Property</h2>
                <Property360 />
            </div> */}
            
            <div className='border-b border-gray-200 py-8'>
                <h2 className='text-black font-medium text-3xl mb-6'>Demographics</h2>
                <Demographics />
            </div>
        </div>
        <div className='md:w-[30%] border border-gray-200 rounded-2xl p-8 sticky top-5'>
            <h2 className='text-black font-medium text-3xl mb-5'>Contact Sellers</h2>
            <Form />
            <div className='flex flex-col gap-4 mt-10 p-5 border border-gray-200 rounded-2xl bg-secondary text-white'>
                <span className='text-white text-2xl capitalize font-semibold'>Here for your questions</span>
                <button className='btn btn-primary bg-white hover:bg-primary hover:text-white text-black'>Get in touch</button>
                <span className='text-white'>or call us at <a href="tel:(123) 456-7890">(123) 456-7890</a></span>
            </div>
        </div>
    </div>
  )
}

export default ItemBody