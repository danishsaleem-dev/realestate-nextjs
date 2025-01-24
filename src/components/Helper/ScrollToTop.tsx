"use client"
import React, { useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const ScrollToTop = () => {

    const [isVisible, setIsVisible] = React.useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) setIsVisible(true)
            else setIsVisible(false)
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

  return (
    <div className='fixed bottom-4 animate-pulse right-2'>
        {isVisible && <button onClick={scrollToTop} className='bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center'>
            <FaArrowUp />
            </button>
        }
    </div>
  )
}

export default ScrollToTop