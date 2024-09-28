import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import axiosInstance from '../../Axios/axiosInstance';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { PiHeartStraightFill } from 'react-icons/pi';
import { FaTimes } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { CartContext } from '../../Provider/CartProvider';
import useWishlist from '../../Hooks/useWishlist';

const WhishList = () => {
    const { addToCart } = useContext(CartContext)
    const { data, isLoading, removeFromWishlist } = useWishlist()

    if (isLoading) {
        return <Loading />;
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='h-screen max-w-6xl mx-auto font-josefin'>
            <h1 className='text-2xl uppercase font-bold mt-5'>Wishlist</h1>
            {
                data.length === 0 ? <p className='text-center mt-6 '>There is no wishlist. please add</p> :
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 my-20 p-6">
                        {data?.map((product) => (
                            <div
                                key={product._id}
                                className="relative bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center transition-transform transform hover:scale-105 overflow-hidden"
                            >
                                <div className="group">
                                    <button
                                        onClick={() => removeFromWishlist(product._id)}
                                        className="text-red-500 bg-black hover:text-red-700 transition-colors rounded-bl-lg absolute right-0 p-2"
                                    >
                                        <PiHeartStraightFill className="group-hover:opacity-0 inset-0 duration-200" />
                                        <FaTimes className="absolute top-2 left-2 inset-0 text-red-500 opacity-0 group-hover:opacity-100 duration-200" />
                                    </button>
                                </div>
                                <Link to={`/productDetails/${product.productId}`} className="w-full flex items-center gap-5">
                                    <div>
                                        <img src={product.image} alt="" className="h-28" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mt-2 text-center">{product.title}</h3>
                                        {product.discount > 0 && (
                                            <p className="text-red-500 font-bold text-center">({product.discount}% off)</p>
                                        )}
                                    </div>
                                </Link>
                                <Link to={`/productDetails/${product.productId}`} className="absolute bottom-0 bg-black text-white rounded-tl-lg right-0 p-2">
                                    <FaPlus />
                                </Link>
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
};

export default WhishList;
