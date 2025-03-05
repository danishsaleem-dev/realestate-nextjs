import SearchBox from '@/components/Helper/SearchBox'
import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='w-full flex-col lg:flex-row flex justify-center items-center pt-[4vw] md:pt-[12vh] h-screen bg-[#DEF2FF] overflow-hidden relative mx-auto'>
        <div className='flex flex-col items-start justify-center text-black w-[90%] sm:w-[55%] lg:w-[55%] relative'>
            <span className='capitalize text-white text-sm font-light bg-primary rounded-full px-4 py-1'>
                The Best Real Estate Service in Canada
            </span>
            <h1 className='capitalize leading-snug font-bold'>
                Find Your Dream House In Canada Now.
            </h1>
            <p className='text-sm sm:text-base md:text-lg mt-4'>
            Find homes in 80+ different countries represented byb 700 leading member brokerages.
            </p>
            <div className='mt-12 w-full '>
                <SearchBox />
            </div>
        </div>
        <div className='flex justify-center items-center w-[35%]'>
            <Image src='/images/banner-img.png' alt='Banner Image' width={500} height={500} />
        </div>
    </div>
  )
}

export default Hero