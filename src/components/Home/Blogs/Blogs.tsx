import React from 'react'
import SectionHeading from '@/components/Helper/SectionHeading'
import { blogs } from '@/data/data'
import BlogCard from './BlogCard'

const Blogs = () => {
  return (
    <div className='pt-16 pb-16 bg-gray-100'>
        <div className='w-[80%] mx-auto'>
            <SectionHeading heading='Discover Our Properties' />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 mt-7 md:mt-14 gap-10 items-center'>
                {blogs.map((blog, i) => (
                    <div key={blog.id} data-aos="zoom-out" data-aos-delay={`${i * 150}`} data-aos-anchor-placement="top-center">
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>
        </div>   
    </div>
  )
}

export default Blogs