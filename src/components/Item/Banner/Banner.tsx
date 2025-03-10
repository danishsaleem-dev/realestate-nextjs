import React from 'react'
import { BiHeart, BiPrinter, BiShare } from 'react-icons/bi';
import { FaBath, FaBed, FaSquare } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import Image from 'next/image';
import BannerGallery from './BannerGallery';

const Banner = () => {
  return (
    <>
    <div className='w-[85%] mx-auto mt-20 md:mt-32 mb-10'>
        <div className='flex flex-col gap-4 md:flex-row md:justify-between md:items-center border-b border-gray-200 py-5 md:py-10'>
            <h1 className='text-black font-bold text-4xl'>Casa Lomas de Machalí Machas</h1>
            <div className='text-gray-500'>
                <span className='text-2xl md:text-3xl text-black font-bold'>$250,00</span> /month
            </div>
        </div>
        <div className='flex flex-col gap-4 md:flex-row justify-between md:items-center py-5'>
            <div className='flex flex-col md:flex-row gap-8 md:w-[60%]'>
                <div className='flex flex-col gap-2'>
                    <span className='text-lg text-gray-700 font-normal'>Features</span>
                    <div className='flex items-center mt-2 gap-3'>
                        <div className='flex items-center space-x-2'>
                            <FaBed className='text-gray-500' />
                            <p className='text-sm text-gray-500'>Beds: <span className='text-black'>3</span></p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <FaBath className='textgray-text-gray-5000' />
                            <p className='text-sm text-gray-500'>Baths: <span className='text-black'>2</span></p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <FaSquare className='tegray-text-gray-500600' />
                            <p className='text-sm text-gray-500'>Sqft: <span className='text-black'>1150</span></p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 md:w-1/2'>
                    <span className='text-lg text-gray-700 font-normal'>Location</span>
                    <div className='flex items-center justify-between mt-2 gap-3'>
                        <div className='flex space-x-2'>
                            <HiLocationMarker className='text-gray-500' />
                            <p className='text-sm text-gray-500'>
                            145 Brooklyn Ave, Califonia, New York</p>
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
    <div className='w-[95%] mx-auto flex flex-row gap-4'>
        <Image className='w-1/2 rounded-2xl' src='/images/hero.jpg' alt='house' width={1920} height={1080}/>
        <div className='w-1/4 flex flex-col gap-4'>
            <Image className='rounded-2xl' src='/images/hero.jpg' alt='house' width={1920} height={1080} />
            <Image className='rounded-2xl' src='/images/hero.jpg' alt='house' width={1920} height={1080} />
        </div>
        <div className='w-1/4 flex flex-col gap-4'>
            <Image className='rounded-2xl' src='/images/hero.jpg' alt='house' width={1920} height={1080} />
            <Image className=' rounded-2xl' src='/images/hero.jpg' alt='house' width={1920} height={1080} />
        </div>
    </div>
    </>
  )
}

export default Banner