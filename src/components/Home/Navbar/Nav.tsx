"use client";
import { navLinks } from '@/constant/constant';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6'
import { HiBars3BottomRight } from 'react-icons/hi2';

type Props = {
    openNav: () => void
}

const Nav = ({ openNav }: Props) => {
    const [navBg, setNavBg] = React.useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.scrollY > 90) setNavBg(true);
            if (window.scrollY < 90) setNavBg(false);
        }
        window.addEventListener('scroll', handleResize);
        return () => {
            window.removeEventListener('scroll', handleResize);
        }
    }, [])

  return (
    <div className={`fixed ${navBg ? "bg-white shadow-[0_4px_18px_0_rgba(0,0,0,0.078)]" : ""} h-[10vh] z-[100] w-full transition-all duration-200 `}>
        <div className='flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:w-[90%] mx-auto'>
            {/* Logo */}    
            <div className='flex items-center space-x-2'>
            <div className='w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#3162CC] text-white flex items-center justify-center'>
                <FaHouse />
            </div>

                <div className='text-black font-bold text-sm sm:text-base md:text-xl'>
                    Real Estate Project
                </div>
            </div>
            {/* Nav Links */}
            <div className='lg:flex items-center space-x-14 text-black hidden'>
            {navLinks.map((link) => (
                <Link key={link.id} href={link.url}>
                    <p className='text-black text-sm sm:text-base text-base cursor-pointer hover:text-primary transition-all duration-200'>
                        {link.label}
                    </p>
                </Link>
            ))}
            </div>
            {/* Login & Hamburger Menu */}
            <div className='flex items-center space-x-4'>
                <div className='flex items-center text-black text-sm sm:text-base md:text-lg cursor-pointer hover:text-primary transition-all duration-200'>
                    <FaUserCircle className='w-5 h-5'/>
                    <p className='hidden sm:block text-xs sm:text-base mx-2'>Login / Register</p>
                </div>
                <button className={`btn btn-primary sm:text-base bg-primary hover:text-white`}>Submit Property</button>
                <HiBars3BottomRight onClick={openNav} className='text-black w-6 h-6 sm:w-8 sm:h-8 cursor-pointer lg:hidden'/>
            </div>
        </div>
    </div>
  )
}

export default Nav