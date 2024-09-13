import React, { useEffect, useState } from 'react';
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
import trending from './../assets/images/trending.gif'
import Marquee from 'react-fast-marquee';
import image from './../assets/images/fabyoh/women2.webp'
import image2 from './../assets/images/fabyoh/menblack.webp'
import image3 from './../assets/images/fabyoh/manNavy.webp'
import image4 from './../assets/images/fabyoh/women.webp'
import { Link } from 'react-router-dom';


const Footer = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts()
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/products.json')
            const data = await response.json();
            setProducts(data)
        } catch (error) {
            console.log('Error to get products in footer', error);
        }
    }
    return (
        <footer className='font-josefin pt-4 border-t'>
            <div className=''>
                <div className='flex items-center px-4 sm:px-6 lg:px-6'>
                    <h1 className='text-xl'>Trending Now </h1>
                    <img src={trending} alt="" className='w-6' />
                </div>
                <div className='relative'>
                    {/* Fog overlays */}
                    <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                    {/* Marquee component */}
                    <Marquee className='py-8 flex justify-between'
                        pauseOnHover={true}
                        gradient={false}
                        speed={30}
                    >
                        {
                            products.map(product =>
                                <Link key={product.id} to={`/productDetails/${product.id}`} className='flex items-center text-xl gap-5 hover:-translate-y-2 duration-300 mr-40'>
                                    <div className='relative overflow-hidden w-20 h-20 rounded-full flex justify-center'>
                                        <img src={product.imageMain} alt="Men's Navy Jacket" className='w-full h-full object-cover' />
                                    </div>
                                    <h1>{product.title}</h1>
                                </Link>
                            )
                        }
                    </Marquee>
                </div>

            </div>
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