"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import FindRealtor from '@/components/Home/FindRealtor/FindRealtor';

const FindAnAgentPage = () => {
  const searchParams = useSearchParams();
  const userFlow = searchParams?.get('userFlow');
  
  return (
    <FindRealtor initialUserType={userFlow as 'buyer' | 'seller' | 'both' | null} />  
  );
};

export default FindAnAgentPage;