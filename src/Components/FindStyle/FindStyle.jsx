import image1 from './../../assets/images/find style/image1.webp'
import image2 from './../../assets/images/find style/image2.webp'
import image3 from './../../assets/images/find style/image3.webp'

const FindStyle = () => {
    return (
        <div className='max-w-[1360px] mx-auto mt-28 '>
            <h1 className='text-[26px] mb-8 uppercase font-josefin font-bold mx-4 xl:mx-0'>Find Your Style</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 xl:mx-0 '>
                <div className='relative '>
                    <img src={image1} alt="" />
                    <div className='absolute inset-0 font-josefin text-white top-1/3 ml-6'>
                        <h1 className='text-3xl font-bold uppercase mb-4'>Premium <br /> Shirts</h1>
                        <a href="" className='border-b-2 border-[#8cbecf] hover:border-[#dc84ffc0]'>Shop Now</a>
                    </div>
                </div>
                <div className='relative '>
                    <img src={image2} alt="" />
                    <div className='absolute inset-0 font-josefin text-white top-1/3 ml-6'>
                        <h1 className='text-3xl font-bold uppercase mb-4'>Pure <br /> Cotton</h1>
                        <a href="" className='border-b-2 border-[#8cbecf] hover:border-[#dc84ffc0]'>Shop Now</a>
                    </div>
                </div>
                <div className='relative '>
                    <img src={image3} alt="" />
                    <div className='absolute inset-0 font-josefin text-white top-1/3 ml-6'>
                        <h1 className='text-3xl font-bold uppercase mb-4'>Newly  <br /> Launched</h1>
                        <a href="" className='border-b-2 border-[#8cbecf] hover:border-[#dc84ffc0]'>Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindStyle;