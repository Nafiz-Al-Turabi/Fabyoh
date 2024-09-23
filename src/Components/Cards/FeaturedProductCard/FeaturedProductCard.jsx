import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import './FeaturedProductCard.css';
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const FeaturedProductCard = ({ product }) => {
    const [loading, setLoading] = useState(true);
    const { title, discount, imageMain, imageSecond, _id } = product;

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer); // Cleanup
    }, []);

    return (
        <Link to={`/productDetails/${_id}`} className="relative w-full sm:w-60 md:w-full h-auto group font-josefin transition-transform transform hover:scale-105 hover:shadow-lg">
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
                <>
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
                    <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2 text-center">{title}</h3>

                    {/* Price */}
                    {discount > 0 && (
                        <p className="mb-4 text-red-500 uppercase text-sm text-center">({discount}% off)</p>
                    )}

                    {/* Add to Wishlist Button */}
                    <div className="absolute top-4 right-4">
                        <button className="text-2xl text-gray-700 hover:text-red-500 transition-colors duration-200" aria-label="Add to wishlist">
                            <PiHeartStraightLight />
                        </button>
                    </div>
                </>
            )}
        </Link>
    );
};

export default FeaturedProductCard;
