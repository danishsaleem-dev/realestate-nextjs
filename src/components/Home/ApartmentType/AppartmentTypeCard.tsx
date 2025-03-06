import Image from 'next/image'
import React from 'react'

type Props = {
    type: {
        id: number;
        icon: string;
        type: string;
        number: number;
    }
}

const AppartmentTypeCard = ({ type }: Props) => {
  return (
    <div className='w-full rounded-lg shadow-xl p-6 hover:scale-110 transition-all duration-300 bg-white'>
        <Image src={type.icon} alt={type.type} width={50} height={50} />
        <div className='mt-8'> 
            <h3 className='text-lg font-bold text-black'>{type.type}</h3>
            <p className='text-sm text-gray-700 mt-2'>{type.number} Properties</p>
        </div>
    </div>
  )
}

export default AppartmentTypeCard