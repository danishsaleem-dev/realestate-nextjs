import React from 'react'
import SectionHeading from '@/components/Helper/SectionHeading'
import { agents } from '@/data/data';
import AgentCard from './AgentCard';
import Link from 'next/link';

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
            
            {/* Find the Right REALTOR® Section */}
            <div className="mt-24 bg-secondary rounded-xl p-10 flex items-center justify-between">
                <div>
                    <span className='text-primary text-base bg-white px-6 py-1 rounded-full'>Agent Finder</span>
                    <h2 className='text-white text-4xl my-4'>Find Your Perfect Match</h2>
                    <p className='text-white text-lg '>Answer a few questions to find the real estate agent who's right for your needs.</p>
                </div>
                <Link href="/find-an-agent" className="inline-block px-8 py-3 bg-primary hover:bg-white text-white hover:text-primary rounded-lg transition-all">
                    Find an Agent
                </Link>
            </div>
        </div>   
    </div>
  )
}

export default OurAgents