"use client"
import React from 'react';
import Hero from './Hero/Hero';
import ApartmentType from './ApartmentType/ApartmentType';
import Properties from './Properties/Properties';
import CityProperties from './CityProperties/CityProperties';
import BuildingFeature from './BuildingFeature/BuildingFeature';
import ClientReviews from './ClientReviews/ClientReviews';
import Blogs from './Blogs/Blogs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ConnectWithUs from './ConnectWithUs/ConnectWithUs';
import WhatWeDo from './WhatWeDo/WhatWeDo';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import OurAgents from './OurAgents/OurAgents';

const Home: React.FC = () => {

    React.useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in',
            once: true,
            anchorPlacement: 'top-bottom'
        });
    }, []);



    return (
        <div className='overflow-hidden'>
            <Hero />
            <ApartmentType />
            <Properties />
            <CityProperties />
            <WhatWeDo />
            <WhyChooseUs />
            <BuildingFeature />
            <OurAgents />
            <ConnectWithUs />
            <ClientReviews />
            <Blogs />
        </div>
    );
};

export default Home;