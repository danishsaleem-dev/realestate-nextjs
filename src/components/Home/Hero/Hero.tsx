import SearchBox from '@/components/Helper/SearchBox'
import React from 'react'

const Hero = () => {
  return (
    <div className='w-full pt-[4vw] md:pt-[12vh] h-screen bg-[#0f0715] overflow-hidden relative bg-[url("/images/hero.jpg")] bg-fixed bg-cover bg-center'>
        {/* Overlay */}
        <div className='absolute inset-0 bg-black bg-opacity-50'></div>

        {/* Content */}
        <div className='flex flex-col items-center justify-center text-white w-[95%] sm:w-[80%] h-full mx-auto relative'>
            <h1 data-aos="fade-up" className='uppercase text-center text-opacity-80 text-base font-medium sm:text-lg'>
                The Best Way To
            </h1>
            <h1 className='uppercase text-center text-7xl font-semibold'>
                Find Your Dream Home    
            </h1>
            <p className='text-center text-sm sm:text-base md:text-lg mt-4 text-gray-200'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div data-aos="zoom-in" data-aos-delay="450" className='mt-12 w-full '>
                <SearchBox />
            </div>
        </div>
    </div>
  )
}

export default Hero