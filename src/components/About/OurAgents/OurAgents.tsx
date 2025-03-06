import React from 'react'
import SectionHeading from '@/components/Helper/SectionHeading'
import { agents } from '@/data/data';
import AgentCard from './AgentCard';

const OurAgents = () => {
  return (
    <div className='pt-16 pb-16 bg-white'>
        <div className='w-[80%] mx-auto'>
            <SectionHeading heading='Meet Our Agents' subheading='Our Team' description='' />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mt-10 md:mt-20 gap-8 items-center'>
                {agents.map((agent, i) => (
                    
                        <div key={agent.id} data-aos="zoom-in" data-aos-delay={`${i * 30}`} data-aos-anchor-placement="top-center" className='flex flex-col items-center space-y-2'>
                            <AgentCard agent={agent} />
                        </div>
                     
                ))}
            </div>
        </div>   
    </div>
  )
}

export default OurAgents