import React, { useEffect, useState } from 'react';
import FeaturedProductCard from '../Cards/FeaturedProductCard/FeaturedProductCard';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../Axios/axiosInstance';


const FeaturedProducts = () => {
    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axiosInstance.get('/products');
            console.log(response.data);
            return response.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className='max-w-[1360px] mx-auto my-40'>
            <h1 className='text-[26px] text-center mb-8 uppercase font-josefin font-bold mx-4 xl:mx-0 font-josefin'>Featured Products</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 mx-4 xl:mx-0'>
                {
                    data.map(product => <FeaturedProductCard key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

export default FeaturedProducts;