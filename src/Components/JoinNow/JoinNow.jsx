import React from 'react';

const JoinNow = () => {
    return (
        <div className='font-josefin container '>
            <div className='flex flex-col justify-center'>
                <h1 className='text-[26px] text-center uppercase font-josefin font-bold mx-4 xl:mx-0 font-josefin'>Join The Club</h1>
                <p className='my-4 text-center'>Join & Get 15% Off On Your First Order, be the first one to know our exciting deals and offers</p>
                <div>
                    <form className=''>
                        <input type="email" className='w-2/5 p-5 border rounded focus:outline-[#9578ed] ' placeholder='Enter you email' />
                        <button className='p-btn w-2/5 p-5 block'>
                            Join now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JoinNow;