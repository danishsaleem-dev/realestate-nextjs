import React from 'react'

type Props = {
    heading: string,
    subheading: string,
    description: string
}

const SectionHeading = ({heading, subheading, description}: Props) => {
  return (
    <div>
        <span className='text-lg block text-center mb-2 font-semibold text-primary'>{subheading}</span>
        <h2 className='text-4xl text-center font-bold mb-2 text-gray-800'>{heading}</h2>
        <p className='text-sm text-gray-700 text-center mt-4'>{description}</p>
    </div>
  )
}

export default SectionHeading