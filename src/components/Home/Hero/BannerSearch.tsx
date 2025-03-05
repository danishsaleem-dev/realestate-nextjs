import { useState } from 'react';
import React from 'react'
import BuyForm from './BuyForm';
import RentForm from './RentForm';
import SellForm from './SellForm';

const BannerSearch = () => {
  const [activeTab, setActiveTab] = useState('rent'); // Default tab

  return (
    <div className="banner-search">
      <div className="tabs">
        <button
          className={activeTab === 'rent' ? 'active' : ''} 
          onClick={() => setActiveTab('rent')}
        >
          Rent
        </button>
        <button
          className={activeTab === 'buy' ? 'active' : ''}
          onClick={() => setActiveTab('buy')}
        >
          Buy
        </button>
        <button
          className={activeTab === 'sell' ? 'active' : ''}
          onClick={() => setActiveTab('sell')}
        >
          Sell
        </button>
      </div>

      <div className="search-form">
        {activeTab === 'rent' && <RentForm />}
        {activeTab === 'buy' && <BuyForm />}
        {activeTab === 'sell' && <SellForm />}
      </div>
    </div>
  );
};

export default BannerSearch;