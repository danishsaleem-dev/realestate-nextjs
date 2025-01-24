import React from 'react'
import Image from 'next/image'
import { BiCalendar, BiMessage } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';

type Props = {
    blog: {
        id: number;
        date: string;
        comment: string;
        title: string;
        shortDescription: string;
        image: string;
    }
}

const BlogCard = ({ blog }: Props) => {
  return (
    <div className='bg-white overflow-hidden rounded-lg cursor-pointer shadow-lg'>
                <div className='relative w-full h-52'>
                    <Image src={blog.image} alt={blog.title} layout='fill' objectFit='cover' className='w-full object-cover ration rounded-t-lg' />
                </div>
                <div className='p-5'>
                    <div className='flex items-center justify-between mt-2 mb-3 w-full'>
                        <div className='flex items-center space-x-2'>
                            <BiCalendar className='text-rose-600' />
                            <p className='text-xs text-gray-700'>{blog.date}</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <BiMessage className='text-rose-600' />
                            <p className='text-xs text-gray-700'>{blog.comment}</p>
                        </div>
                    </div>
                    
                    <h3 className='pt-2 pb-2 font-bold text-lg text-gray-700 hover:underline'>{blog.title}</h3>
                    <p className='text-sm text-gray-700'>{blog.shortDescription}</p>
                    <div className='flex items-center mt-4 space-x-2 hover:text-rose-600 cursor-pointer'>
                        <span className='text-sm font-bold'>Read More</span>
                        <BsArrowRight />
                    </div>
                </div>
            </div>
  )
}

export default BlogCard