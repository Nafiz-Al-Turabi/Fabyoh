import React, { useContext, useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './FeaturedProductCard.css';
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import trendingImage from './../../../assets/images/trending.gif'
import axiosInstance from '../../../Axios/axiosInstance';
import { AuthContext } from '../../../Provider/AuthProvider';

const FeaturedProductCard = ({ product }) => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { title, discount, imageMain, imageSecond, trending, _id } = product;
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const wishlistedItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsWishlisted(wishlistedItems.includes(_id));
    }, [_id]);
    const token = localStorage.getItem('authToken')
    const handleWishlistClick = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            const response = await axiosInstance.post('/wishlist', product, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setIsWishlisted(true);

            // Update local storage
            const wishlistedItems = JSON.parse(localStorage.getItem('wishlist')) || [];
            localStorage.setItem('wishlist', JSON.stringify([...wishlistedItems, _id]));
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            alert('Failed to add to wishlist. Please try again.');
        }
    };


    return (
        <div className="relative w-full sm:w-60 md:w-full h-auto group font-josefin transition-transform transform hover:scale-105 hover:shadow-lg">
            {/* Skeleton Loader */}
            {loading ? (
                <div>
                    <div className="relative xl:w-80 min-h-96 bg-gray-300 rounded-lg mb-4 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 shimmer-effect"></div>
                    </div>
                    <div className="relative h-6 bg-gray-300 rounded-md mb-2 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 shimmer-effect"></div>
                    </div>
                    <div className="relative h-6 w-1/2 bg-gray-300 rounded-md overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 shimmer-effect"></div>
                    </div>
                </div>
            ) : (
                <div className='relative'>
                    {/* Responsive images */}
                    <div className="flex justify-center items-center relative xl:w-80 min-h-96 overflow-hidden">
                        <img
                            src={imageMain}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                        />
                        <img
                            src={imageSecond}
                            alt={`${title} alternative view`}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                        />
                    </div>

                    {/* Title */}
                    <Link to={`/productDetails/${_id}`}>
                        <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2 text-center">{title}</h3>
                    </Link>

                    {/* Price */}
                    {discount > 0 && (
                        <p className="mb-4 text-red-500 uppercase text-sm text-center absolute top-5 left-5 bg-white p-1">({discount}% off)</p>
                    )}

                    {trending ? (
                        <img src={trendingImage} alt="" className='w-10 absolute bottom-16 right-5' />
                    ) : null}

                    {/* Add to Wishlist Button */}
                    <div className="absolute top-4 right-4">
                        <button onClick={handleWishlistClick} className="text-2xl text-white hover:text-red-500 transition-colors duration-200" aria-label="Add to wishlist">
                            {isWishlisted ? <PiHeartStraightFill /> : <PiHeartStraightLight />}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeaturedProductCard;
