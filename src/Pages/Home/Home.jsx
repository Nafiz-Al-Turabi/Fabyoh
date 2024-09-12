import React, { useEffect } from 'react';
import Banner from '../../Components/Banner/Banner';
import OfferTwo from '../../Components/OfferTwo/OfferTwo';
import FindStyle from '../../Components/FindStyle/FindStyle';
import FeaturedProducts from '../../Components/FeaturedProducts/FeaturedProducts';
import JoinNow from '../../Components/JoinNow/JoinNow';
import Delivary from '../../Components/Delivary/Delivary';
import TodaysDeal from '../../Components/Today\'sDeal/TodaysDeal';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className=''>
            <Banner />
            <OfferTwo />
            <FindStyle />
            <FeaturedProducts />
            <Delivary />
            <TodaysDeal />
            <JoinNow />
        </div>
    );
};

export default Home;