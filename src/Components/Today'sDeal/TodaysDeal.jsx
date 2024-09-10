import React from 'react';
import Slider from 'react-slick';
import TodaysDeal1 from './../../assets/images/fabyoh/todaysdeal1.webp';
import TodaysDeal2 from './../../assets/images/fabyoh/todaysdeal2.webp';
import TodaysDeal3 from './../../assets/images/fabyoh/todaysdeal3.webp';
import TodaysDeal4 from './../../assets/images/fabyoh/todaysdeal4.webp';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TodaysDeal = () => {
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

    // Sample deals data
    const deals = [
        {
            id: 1,
            title: "Premium Shirt",
            discount: "20% Off",
            image: TodaysDeal1,
        },
        {
            id: 2,
            title: "Summer Dress",
            discount: "15% Off",
            image: TodaysDeal2,
        },
        {
            id: 3,
            title: "Leather Jacket",
            discount: "25% Off",
            image: TodaysDeal3,
        },
        {
            id: 4,
            title: "Casual Sneakers",
            discount: "30% Off",
            image: TodaysDeal4,
        },
    ];

    return (
        <div className='mt-32 max-w-[1360px] mx-auto px-4'>
            <h1 className='text-2xl uppercase font-josefin font-bold mb-8'>
                Today's Deal
            </h1>
            <Slider {...settings}>
                {deals.map((deal) => (
                    <div key={deal.id} className='pl-4'>
                        <div className='bg-[#F3EFFE] rounded-lg overflow-hidden p-3'>
                            <img
                                src={deal.image}
                                alt={deal.title}
                                className='object-cover w-full h-64 md:h-96 rounded-t-lg'
                            />
                            <div className='text-center bg-purple-500 py-4 text-white font-josefin rounded-b-lg'>
                                <h1 className='text-2xl font-bold uppercase'>{deal.title}</h1>
                                <p className='text-base'>{deal.discount}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TodaysDeal;
