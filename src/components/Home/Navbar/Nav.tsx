"use client";
import { navLinks } from '@/constant/constant';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiPhone } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';
import { HiBars3BottomRight } from 'react-icons/hi2';

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.scrollY > 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    };
    window.addEventListener('scroll', handleResize);
    return () => {
      window.removeEventListener('scroll', handleResize);
    };
  }, []);

  const handleDropdownToggle = (id: number) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`fixed bg-white ${navBg ? ' shadow-[0_4px_18px_0_rgba(0,0,0,0.078)]' : ''} h-[10vh] z-[100] w-full transition-all duration-200`}
    >
      <div className="flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:w-[95%] mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#3162CC] text-white flex items-center justify-center">
            <FaHouse />
          </div>
          <div className="text-black font-bold text-sm sm:text-base md:text-xl">
            Real Estate Project
          </div>
        </div>
        {/* Nav Links */}
        <div className="lg:flex items-center space-x-14 text-black hidden">
          {navLinks.map((link) => (
            <div key={link.id} className="relative">
              {link.subLinks ? (
                <div
                  onMouseEnter={() => handleDropdownToggle(link.id)}
                  onMouseLeave={() => handleDropdownToggle(link.id)}
                  className="cursor-pointer"
                >
                  <p className="text-black text-sm sm:text-base text-base cursor-pointer hover:text-primary transition-all duration-200">
                    {link.label}
                  </p>
                  {openDropdown === link.id && (
                    <ul className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48">
                      {link.subLinks.map((subLink) => (
                        <li key={subLink.id}>
                          <Link
                            href={subLink.url}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            {subLink.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link href={link.url}>
                  <p className="text-black text-sm sm:text-base text-base cursor-pointer hover:text-primary transition-all duration-200">
                    {link.label}
                  </p>
                </Link>
              )}
            </div>
          ))}
        </div>
        {/* Login & Hamburger Menu */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex flex-col items-center  text-black text-sm sm:text-base md:text-lg cursor-pointer hover:text-primary transition-all duration-200">
            <div className='flex items-center'>
              <BiPhone className="w-5 h-5" />
              <p className="hidden sm:block text-xs sm:text-base mx-2">123 456-7890</p>
            </div>
            <span className='text-[10px] leading-3'>Call us 7days/week 9:00 am to 10:00 pm</span>
          </div>
          <div className="flex items-center text-black text-sm sm:text-base md:text-lg cursor-pointer hover:text-primary transition-all duration-200">
            <FaUserCircle className="w-5 h-5" />
            <p className="hidden sm:block text-xs sm:text-base mx-2">Login</p>
          </div>
          <button className={`btn btn-primary sm:text-sm bg-primary hover:text-white`}>
            Submit Property
          </button>
          <HiBars3BottomRight
            onClick={openNav}
            className="text-black w-6 h-6 sm:w-8 sm:h-8 cursor-pointer lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;