import React from 'react';
import Banner from '../../Components/Banner/Banner';
import OfferTwo from '../../Components/OfferTwo/OfferTwo';
import FindStyle from '../../Components/FindStyle/FindStyle';
import FeaturedProducts from '../../Components/FeaturedProducts/FeaturedProducts';
import JoinNow from '../../Components/JoinNow/JoinNow';
import Delivary from '../../Components/Delivary/Delivary';

const Home = () => {
    return (
        <div className=''>
            <Banner />
            <OfferTwo />
            <FindStyle />
            <FeaturedProducts />
            <Delivary/>
            <JoinNow />
        </div>
    );
};

export default Home;