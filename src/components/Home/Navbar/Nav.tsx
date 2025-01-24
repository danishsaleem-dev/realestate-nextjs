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
    <div className={`fixed ${navBg ? "bg-gray-800" : ""} h-[10vh] z-[100] w-full transition-all duration-200 `}>
        <div className='flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:w-[80%] mx-auto'>
            {/* Logo */}    
            <div className='flex items-center space-x-2'>
                <div className='md-w-8 md:h-8 w-7 h-7 rounded-full bg-rose-700 text-white flex items-center justify-center flex-col'>
                    <FaHouse/>
                </div>
                <div className='text-white font-bold text-sm sm:text-base md:text-xl'>
                    Real Estate Project
                </div>
            </div>
            {/* Nav Links */}
            <div className='lg:flex items-center space-x-14 text-white hidden'>
            {navLinks.map((link) => (
                <Link key={link.id} href={link.url}>
                    <p className='text-white text-sm sm:text-base md:text-lg mx-2 cursor-pointer hover:text-red-400 transition-all duration-200'>
                        {link.label}
                    </p>
                </Link>
            ))}
            </div>
            {/* Login & Hamburger Menu */}
            <div className='flex items-center space-x-4'>
                <div className='flex items-center text-white text-sm sm:text-base md:text-lg cursor-pointer hover:text-red-400 transition-all duration-200'>
                    <FaUserCircle className='w-5 h-5'/>
                    <p className='font-bold text-xs sm:text-base ml-2'>Login / Register</p>
                </div>
                <HiBars3BottomRight onClick={openNav} className='text-white w-6 h-6 sm:w-8 sm:h-8 cursor-pointer lg:hidden'/>
            </div>
        </div>
    </div>
  )
}

export default Nav