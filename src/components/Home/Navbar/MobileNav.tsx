"use client";
import { navLinks } from '@/constant/constant'
import Link from 'next/link';
import React from 'react'
import { CgClose } from 'react-icons/cg';

type Props = {
    showNav: boolean
    closeNav: () => void
}

const MobileNav = ({ closeNav, showNav }: Props) => {
    const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";
  return (
    <div>
        {/* Overlay */}
        <div className={`transform ${navOpen} fixed inset-0 bg-black opacity-70 w-full h-screen transition-all duration-500 z-100`}></div>
        {/* Mobile Nav */}
        <div className={`text-white transform ${navOpen} transition-all duration-500 delay-300 fixed flex justify-center flex-col h-full w-[80%] sm:w-[60%] bg-primary space-y-6 z-[500]`}>
            {navLinks.map((link) => (
                <Link key={link.id} href={link.url}>
                    <p className='text-[20px] ml-12 border-b-[1.5px] pb-1 w-fit border-white sm:text-[30px] font-medium hover:text-yellow-300'>
                        {link.label}
                    </p>
                </Link>
            ))}

            {/* Close Button */}
            <CgClose onClick={closeNav} className='absolute top-[0.7rem] right-[1.4rem] sm:h-8 sm:w-8 text-white w-6 h-6 cursor-pointer'/>
        </div>
        
    </div>
  )
}

export default MobileNav