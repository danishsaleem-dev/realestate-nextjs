"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import FindRealtor from '@/components/Home/FindRealtor/FindRealtor';

const FindAnAgentPage = () => {
  const searchParams = useSearchParams();
  const userFlow = searchParams?.get('userFlow');
  
  // Type assertion to ensure userFlow is one of the expected values
  const validUserFlow = ['buyer', 'seller', 'both'].includes(userFlow as string) 
    ? userFlow as 'buyer' | 'seller' | 'both' 
    : null;
  
  return (
    <FindRealtor initialUserType={validUserFlow} />  
  );
};

export default FindAnAgentPage;