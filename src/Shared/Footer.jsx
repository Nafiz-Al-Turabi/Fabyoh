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
            <div className=' md:max-w-[1305px] mx-auto mb-20 md:mb-0  '>
                <div className='space-y-12 md:space-y-0 md:grid md:grid-cols-3 xl:flex xl:gap-32 py-20 border-y px-4'>
                    <div className='md:col-span-4 xl:col-auto mb-10'>
                        <img src={logo} alt="logo" className='w-32' />
                        <p className=' md:w-[600px] xl:w-[400px] s-text mt-5'>
                            Fabyoh is a NextJs Based Seo Optimized Readymade eCommerce Script With Advanced Features Built For Small Business Owners And Entrepreneurs
                        </p>
                    </div>
                    <div>
                        <h1 className='text-xl lg:text-2xl font-semibold'>Shop Now</h1>
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
                        <h1 className='text-xl lg:text-2xl font-semibold'>Important Links</h1>
                        <div className='flex flex-col gap-3 mt-5'>
                            <a href="" className='text-xl font-[300]'>Privacy Policy</a>
                            <a href="" className='text-xl font-[300]'>Terms And Conditions</a>
                            <a href="" className='text-xl font-[300]'>Shipping And Returns</a>
                            <a href="" className='text-xl font-[300]'>About Us</a>
                            <a href="" className='text-xl font-[300]'>Help</a>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-xl lg:text-2xl font-semibold'>Follow Us On</h1>
                        <div className='flex gap-4 mt-5'>
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
                <div className="flex flex-col lg:flex-row justify-between items-center font-[300] py-3 md:px-4 lg:px-0 ">
                    <p>&copy; {new Date().getFullYear()} Fabyoh.com - All Rights Reserved. </p>
                    <div className='flex gap-6 mt-4'>
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