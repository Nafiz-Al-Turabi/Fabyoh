import React from 'react';
import logo from './../assets/images/logo.webp'
import facebook from './../assets/images/social/facebook.webp'
import instagram from './../assets/images/social/instagram.webp'
import twitter from './../assets/images/social/twitter.webp'
import youtube from './../assets/images/social/youtube.webp'
import visa from './../assets/images/payment/visa.webp'
import americanExpress from './../assets/images/payment/americanExpress.webp'
import discover from './../assets/images/payment/discover.webp'
import paypal from './../assets/images/payment/paypal.webp'
import applepay from './../assets/images/payment/applepay.webp'
import googlepay from './../assets/images/payment/googlepay.webp'


const Footer = () => {
    return (
        <footer className='font-josefin pt-40 '>
            <div className=' lg:max-w-[1305px] mx-auto  '>
                <div className='flex gap-32 py-20 border-y'>
                    <div>
                        <img src={logo} alt="logo" className='w-32' />
                        <p className='max-w-[400px] s-text mt-5'>
                            Fabyoh is a NextJs Based Seo Optimized Readymade eCommerce Script With Advanced Features Built For Small Business Owners And Entrepreneurs
                        </p>
                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold'>Shop Now</h1>
                        <div className='flex flex-col gap-3 mt-5'>
                            <a href="" className='text-xl font-[300]'>Shop All</a>
                            <a href="" className='text-xl font-[300]'>Shirts</a>
                            <a href="" className='text-xl font-[300]'>Tshirts</a>
                            <a href="" className='text-xl font-[300]'>Hoodies</a>
                            <a href="" className='text-xl font-[300]'>Jackets</a>
                            <a href="" className='text-xl font-[300]'>Room</a>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold'>Important Links</h1>
                        <div className='flex flex-col gap-3 mt-5'>
                            <a href="" className='text-xl font-[300]'>Privacy Policy</a>
                            <a href="" className='text-xl font-[300]'>Terms And Conditions</a>
                            <a href="" className='text-xl font-[300]'>Shipping And Returns</a>
                            <a href="" className='text-xl font-[300]'>About Us</a>
                            <a href="" className='text-xl font-[300]'>Help</a>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-2xl font-semibold'>Follow Us On</h1>
                        <div className='flex gap-3 mt-5'>
                            <a href="" className='text-xl font-[300]'>
                                <img src={facebook} alt="social logo" className='w-8' />
                            </a>
                            <a href="" className='text-xl font-[300]'>
                                <img src={instagram} alt="social logo" className='w-8' />
                            </a>
                            <a href="" className='text-xl font-[300]'>
                                <img src={twitter} alt="social logo" className='w-8' />
                            </a>
                            <a href="" className='text-xl font-[300]'>
                                <img src={youtube} alt="social logo" className='w-8' />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center font-[300] py-3 ">
                    <p>&copy; {new Date().getFullYear()} Fabyoh.com - All Rights Reserved. </p>
                    <div className='flex gap-6'>
                        <a href="">
                            <img src={visa} alt="" className='w-9' />
                        </a>
                        <a href="">
                            <img src={americanExpress} alt="" className='w-9' />
                        </a>
                        <a href="">
                            <img src={discover} alt="" className='w-9' />
                        </a>
                        <a href="">
                            <img src={paypal} alt="" className='w-9' />
                        </a>
                        <a href="">
                            <img src={applepay} alt="" className='w-9' />
                        </a>
                        <a href="">
                            <img src={googlepay} alt="" className='w-9' />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;