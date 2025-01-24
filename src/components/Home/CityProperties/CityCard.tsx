import Image from 'next/image'
import React from 'react'

type Props = {
    city: {
        id: number;
        image: string;
        cityName: string;
        numberOfProperties: number;
    }
}

const CityCard = ({ city }: Props) => {
  return (
    <div className='relative rounded-lg overflow-hidden m-2'>
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'></div>
        <Image src={city.image} alt={city.cityName} width={700} height={700} className='rounded-lg w-full h-[450px] object-cover'/>
        <div className='absolute top-8 left-4 right-0 text-white'>
            <h4 className='text-xl font-semibold'>{city.cityName}</h4>
            <p className='text-sm'>{city.numberOfProperties} Properties</p>
        </div>
    </div>
  )
}

export default CityCard