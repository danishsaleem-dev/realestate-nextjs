import React from 'react'
import Image from 'next/image'
import { BiEnvelope, BiPhone, BiPhoneCall } from 'react-icons/bi';
import { TfiEmail } from 'react-icons/tfi';

type Props = {
    agent: {
        id: number;
        name: string;
        image: string;
        email: string;
        phone: string;
        role: string;
    }
}

const AgentCard = ({agent}: Props) => {
  return (
    <div className='flex flex-col gap-4 group'>
        <Image src={agent.image} alt={agent.name} width={1000} height={200} className='rounded-2xl' />
        <div className='flex gap-2 justify-between'>
            <div className=''>
                <h3 className='font-medium'>{agent.name}</h3>
                <span className='font-light'>{agent.role}</span>
            </div>
            <div className='flex gap-2 justify-end items-center'>
                <a href={`tel:${agent.phone}`} className="flex items-center justify-center text-primary border border-primary w-8 h-8 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <BiPhone className="w-4 h-4" />
                </a>
                <a href={`mailto:${agent.email}`} className="flex items-center justify-center text-primary border border-primary w-8 h-8 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <BiEnvelope className="w-4 h-4" />
                </a>
            </div>
        </div>
    </div>
  )
}

export default AgentCard