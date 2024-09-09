import React from 'react';
import Marquee from "react-fast-marquee";

const Offer = () => {
    return (
        <Marquee
            className='bg-[#8c6cf2] text-white py-2 z-0'
            pauseOnHover={true}
            gradient={false}
            speed={50}
        >
            <div className="flex space-x-20 lg:space-x-72">
                <h1 className='text-lg font-bold font-josefin'>
                    30% OFF - <span className='text-base font-thin text-gray-300'>Offer</span> Ends Tomorrow - Grab Now
                </h1>
                <h1 className='text-lg font-bold font-josefin'>
                    30% OFF - <span className='text-base font-thin text-gray-300'>Offer</span> Ends Tomorrow - Grab Now
                </h1>
                <h1 className='text-lg font-bold font-josefin'>
                    30% OFF - <span className='text-base font-thin text-gray-300'>Offer</span> Ends Tomorrow - Grab Now
                </h1>

            </div>
        </Marquee>
    );
};

export default Offer;
