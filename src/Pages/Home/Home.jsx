import React from 'react';
import Banner from '../../Components/Banner/Banner';
import OfferTwo from '../../Components/OfferTwo/OfferTwo';
import FindStyle from '../../Components/FindStyle/FindStyle';
import FeaturedProducts from '../../Components/FeaturedProducts/FeaturedProducts';

const Home = () => {
    return (
        <div className=''>
            <Banner />
            <OfferTwo />
            <FindStyle />
            <FeaturedProducts/>
        </div>
    );
};

export default Home;