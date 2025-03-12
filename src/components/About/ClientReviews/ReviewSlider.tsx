"use client"
import React, { memo } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import ReviewCard from './ReviewCard'
import { userReviewData } from '@/data/data'

interface ResponsiveType {
  superLargeDesktop: {
    breakpoint: { max: number; min: number };
    items: number;
  };
  desktop: {
    breakpoint: { max: number; min: number };
    items: number;
    slidesToslide: number;
  };
  tablet: {
    breakpoint: { max: number; min: number };
    items: number;
    slidesToslide: number;
  };
  mobile: {
    breakpoint: { max: number; min: number };
    items: number;
    slidesToslide: number;
  };
}

const responsive: ResponsiveType = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 4,
    slidesToslide: 1
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 2,
    slidesToslide: 1
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToslide: 1
  }
};

const ReviewSlider: React.FC = memo(() => {
  return (
    <Carousel 
      responsive={responsive as Record<string, any>}
      arrows={true} 
      autoPlay={true} 
      autoPlaySpeed={3000} 
      infinite={true}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      keyBoardControl={true}
      customTransition="transform 300ms ease-in-out"
      transitionDuration={300}
    >
      {userReviewData.map((userReview) => (
        <div key={userReview.id} className="px-2">
          <ReviewCard userReview={userReview} />
        </div>
      ))}
    </Carousel>
  )
})

ReviewSlider.displayName = 'ReviewSlider';

export default ReviewSlider