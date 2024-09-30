import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import promot from './../../assets/images/fabyoh/offer2.jpg';
// import promot from './../../assets/images/slider/image7.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import axiosInstance from '../../Axios/axiosInstance';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';

const TodaysDeal = () => {
    const [deals, setDeals] = useState([]);
    const { loading } = useContext(AuthContext)
    // Slick slider settings with proper breakpoints for responsiveness
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 3 cards on large screens
        slidesToScroll: 1,
        arrows: false, // Option to hide/show arrows
        responsive: [
            {
                breakpoint: 1280, // Desktop & large tablets
                settings: {
                    slidesToShow: 2, // Show 2 cards
                },
            },
            {
                breakpoint: 1024, // Tablets
                settings: {
                    slidesToShow: 2, // Show 2 cards
                },
            },
            {
                breakpoint: 768, // Mobile devices
                settings: {
                    slidesToShow: 1, // Show 1 card
                },
            },
        ],
    };

    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['userOrders'],
        queryFn: async () => {
            const response = await axiosInstance.get('/products');
            return response.data;
        },
    });

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div className='mt-32 max-w-[1360px] mx-auto px-4'>
                <h1 className='text-2xl uppercase font-josefin font-bold mb-8'>
                    Today's Deal
                </h1>
                <Slider {...settings}>
                    {data.slice(0, 6).map((deal) => (
                        <Link to={`/productDetails/${deal._id}`} key={deal._id} className='pl-4'>
                            <div className='bg-[#F3EFFE] rounded-lg overflow-hidden p-3'>
                                <img
                                    src={deal.imageMain}
                                    alt={deal.title}
                                    className='object-cover w-full h-64 md:h-96 rounded-t-lg'
                                />
                                <div className='text-center p-bg py-4 text-white font-josefin rounded-b-lg'>
                                    <h1 className='text-xl font-bold uppercase'>{deal.title}</h1>
                                    <p className='text-base'>{deal.discount}%</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Slider>
            </div>
            <a href=''>
                <img src={promot} alt="" className='object-cover w-full mt-16' />
            </a>
        </div>
    );
};

export default TodaysDeal;
