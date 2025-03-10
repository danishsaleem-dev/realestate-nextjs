import React from 'react'
import Form from './Form'
import Overview from './Overview'
import Features from './Features'
import Location from './Location'
import Demographics from './Demographics'


const ItemBody = () => {
  return (
    <div className='mx-auto w-[90%] flex flex-col md:flex-row justify-between items-start my-5 md:my-20 relative'>
        <div className='md:w-[65%] flex flex-col gap-5'>
            <div className='border-b border-gray-200 py-8'>
                <h2 className='text-black font-medium text-3xl mb-2'>Description</h2>
                <p className='text-gray-500 font-light'>Located around an hour away from Paris, between the Perche and the Iton valley, in a beautiful wooded park bordered by a charming stream, this country property immediately seduces with its bucolic and soothing environment. An ideal choice for sports and leisure enthusiasts who will be able to take advantage of its swimming pool (11m x 5m), tennis court, gym and sauna.</p>
            </div>
            <div className='border-b border-gray-200 py-8'>
                <h2 className='text-black font-medium text-3xl mb-2'>Overview</h2>
                <Overview />
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
                <Location />
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