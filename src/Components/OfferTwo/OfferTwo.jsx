import Marquee from 'react-fast-marquee';

const OfferTwo = () => {
    return (
        <Marquee
            className='bg-[#8c6cf2] text-white mt-3'
            pauseOnHover={false}
            gradient={false}
            speed={50}
            direction = "right"
        >
            <div className="flex py-7">
                <h1 className='text-4xl font-bold font-josefin mr-32'>
                    Buy 2 Hoodies & Get 1 For free
                </h1>
                <h1 className='text-4xl font-bold font-josefin mr-32'>
                    Buy 2 Hoodies & Get 1 For free
                </h1>
                <h1 className='text-4xl font-bold font-josefin mr-32'>
                    Buy 2 Hoodies & Get 1 For free
                </h1>

            </div>
        </Marquee>
    );
};

export default OfferTwo;