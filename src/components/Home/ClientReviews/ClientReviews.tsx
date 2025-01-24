import SectionHeading from '@/components/Helper/SectionHeading'
import React from 'react'
import ReviewSlider from './ReviewSlider';

const ClientReviews = () => {
  return (
    <div className='pt-16 pb-16 bg-[#fef7f6]'>
        <div className='w-[80%] mx-auto'>
            <SectionHeading heading='Our Clients Reviews' />
            <div className='mt-10 md:mt-20'>
                <ReviewSlider />
            </div>
        </div>   
    </div>
  )
}

export default ClientReviews