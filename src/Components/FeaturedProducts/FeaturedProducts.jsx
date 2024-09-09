import React from 'react';
import FeaturedProductCard from '../Cards/FeaturedProductCard/FeaturedProductCard';


const FeaturedProducts = () => {
    return (
        <div className='max-w-[1360px] mx-auto my-40'>
            <h1 className='text-[26px] text-center mb-8 uppercase font-josefin font-bold mx-4 xl:mx-0 font-josefin'>Featured Products</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 mx-4 xl:mx-0'>
                <FeaturedProductCard />
                <FeaturedProductCard />
                <FeaturedProductCard />
                <FeaturedProductCard />
                <FeaturedProductCard />
                <FeaturedProductCard />
                <FeaturedProductCard />
                <FeaturedProductCard />
            </div>
        </div>
    );
};

export default FeaturedProducts;