import SectionHeading from '@/components/Helper/SectionHeading'
import React from 'react'
import CitySlider2 from './CitySlider2';

const CityProperties = () => {
  return (
    <div className='pt-16 pb-16 bg-white'>
        <div className='w-[95%] mx-auto'>
            <SectionHeading heading='Our Location For You' subheading='Explore Cities' description=''/>
            <div className='mt-7 md:mt-20'>
                <CitySlider2 />
            </div>
        </div>   
    </div>
  )
}

export default CityProperties