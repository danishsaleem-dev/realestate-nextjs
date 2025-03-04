import React from 'react'

const WhyChooseUs = () => {
  return (
    <div className='flex w-[98%] bg-gray-100 justify-center items-center mx-auto rounded-lg'>
        <div className='w-1/2 h-fit bg-[url("/images/hero.jpg")] bg-fixed bg-cover bg-center'>
        </div>
        <div className='w-1/2 py-12 px-10'>
            <div className='w-[75%]'>
                <span className='text-lg block mb-2 font-semibold text-primary'>Our Benefit</span>
                <h2 className='text-4xl font-bold mb-2 text-gray-800'>Why Choose Us</h2>
                <p className='text-sm text-gray-700 mt-4'>Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.</p>
                <div className='mt-5 rounded-xl p-5 px-8 bg-white'>
                    <h3 className='text-black text-2xl mb-2'>Proven Expertise</h3>
                    <p className='font-light text-black text-sm'>Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.</p>
                </div>
                <div className='mt-5 rounded-xl p-5 px-8 bg-white'>
                    <h3 className='text-black text-2xl mb-2'>Customized Solutions</h3>
                    <p className='font-light text-black text-sm'>We pride ourselves on crafting personalized strategies to match your unique goals, ensuring a seamless real estate journey.</p>
                </div>
                <div className='mt-5 rounded-xl p-5 px-8 bg-white'>
                    <h3 className='text-black text-2xl mb-2'>Transparent Partnerships</h3>
                    <p className='font-light text-black text-sm'>Transparency is key in our client relationships. We prioritize clear communication and ethical practices, fostering trust and reliability throughout.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WhyChooseUs