import React from 'react';

const JoinNow = () => {
    return (
        <div className='font-josefin container mx-auto my-20 px-4'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-[22px] sm:text-[26px] text-center uppercase font-bold mx-4 xl:mx-0'>
                    Join The Club
                </h1>
                <p className='my-4 text-center text-sm sm:text-base'>
                    Join & Get 15% Off On Your First Order, be the first one to know our exciting deals and offers
                </p>
                <div className='w-full max-w-xl'>
                    <div className='flex flex-col items-center'>
                        <input 
                            type="email" 
                            className='w-full p-3 sm:p-4 mb-4 border rounded hover:border-gray-700 focus:outline-[#9578ed]' 
                            placeholder='Enter your email' 
                        />
                        <button 
                            className="p-btn w-full p-2  text-lg sm:text-2xl rounded text-white hover:shadow-xl hover:-translate-y-[1px] active:shadow-none active:translate-y-[1px] transition-all duration-100">
                            Join now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinNow;
