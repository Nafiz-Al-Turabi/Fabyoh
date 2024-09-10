import delivery1 from './../../assets/images/fabyoh/delivery1.webp'
import delivery2 from './../../assets/images/fabyoh/delivery2.webp'
import delivery3 from './../../assets/images/fabyoh/delivery3.webp'
import promot from './../../assets/images/fabyoh/promot.webp'


const Delivary = () => {
    return (
        <div>
            <div className='border-y py-8'>
                <div className='font-josefin max-w-[1306px] mx-auto px-4 lg:px-10'>
                    <div className='flex flex-col md:flex-row justify-between gap-6 sm:gap-0'>
                        <div className='flex items-center gap-5'>
                            <div className='bg-[#2b2b2b] h-24 w-24 flex justify-center items-center rounded-full'>
                                <img src={delivery1} alt="" />
                            </div>
                            <div>
                                <h1 className='text-xl'>Easy Returns</h1>
                                <p className='text-sm'>14 days easy return policy</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div className='bg-[#2b2b2b] h-24 w-24 flex justify-center items-center rounded-full'>
                                <img src={delivery2} alt="" />
                            </div>
                            <div>
                                <h1 className='text-xl'>Free Delivery</h1>
                                <p className='text-sm'>Promised 4 - 7 days delivery</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div className='bg-[#2b2b2b] h-24 w-24 flex justify-center items-center rounded-full'>
                                <img src={delivery3} alt="" />
                            </div>
                            <div>
                                <h1 className='text-xl'>Secure Payments</h1>
                                <p className='text-sm'>Make payments securely <br /> via stripe</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a href=''>
                <img src={promot} alt="" className='object-cover w-full mt-8' />
            </a>
        </div>
    );
};

export default Delivary;