import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Provider/CartProvider';
import { IoClose } from 'react-icons/io5';
import logo from './../../assets/images/logo.webp'

const Cart = () => {
    const [isSticky, setIsSticky] = useState(false);

    const { cartItems, increaseQuantity, decreaseQuantity, removeItem, calculateTotalPrice } = useContext(CartContext);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        };


        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='xl:w-[1300px] mx-auto p-4 xl:p-6 font-josefin' style={{ paddingBottom: '220px' }}>
            <div className='xl:flex justify-between relative'>
                <div className='xl:w-3/5'>
                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            className='relative flex gap-3 border-b pb-6 mb-5 bg-white shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/50 duration-300 p-4 rounded-t-md rounded-md border-t-2 border-t-violet-500'
                        >
                            <div>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className='w-full h-40 object-cover'
                                />
                            </div>
                            <div className='space-y-6'>
                                <h3 className='md:text-2xl xl:text-3xl'>{item.title}</h3>
                                <div className='flex gap-2 items-center my-5'>
                                    <p style={{ backgroundColor: item.color }} className='h-6 w-6'></p><span className='text-xl text-gray-300'>|</span>
                                    <p className='md:text-3xl'>{item.size}</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='w-24 flex justify-between border-2 p-1 text-center'>
                                        <button onClick={() => decreaseQuantity(index)}>-</button>
                                        {item.totalItems}
                                        <button onClick={() => increaseQuantity(index)}>+</button>
                                    </div>
                                    <p className='font-bold'>${item.totalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                            {/* For delete added cart */}
                            <button
                                className='absolute top-5 right-5'
                                onClick={() => removeItem(index)}
                            >
                                <IoClose className='text-2xl' />
                            </button>
                        </div>
                    ))}
                </div>
                <div className={`${isSticky ? '2xl:fixed top-[89px] right-80 border' : '2xl:fixed top-[150px] right-80'} bg-white 2xl:z-30 md:w-full xl:w-[450px] shadow `}>
                    <div className='mt-5 p-2'>
                        <div className='flex justify-center mb-6'>
                            <div>
                                <img src={logo} alt="" className='w-32' />
                                <p className='mt-3 text-lg'>Happy Shopping</p>
                            </div>
                        </div>
                        <div>
                            {
                                cartItems.map((item, index) => (
                                    <div className='flex justify-between p-2'>
                                        <h1 className='font-bold text-lg text-gray-500'>{item.title}</h1>
                                        <p className='text-lg font-bold'>{item.totalPrice.toFixed(2)}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <h1 className='flex justify-end mr-5 text-xl'>+</h1>
                        <div className='flex justify-between bg-gray-100 p-2 mt-2'>
                            <p className='text-xl font-bold'>Total Amount</p>
                            <p className='text-xl font-bold'>${calculateTotalPrice()}</p>
                        </div>
                        <button className='p-btn s-bg text-white uppercase mt-10'>
                            Proceed to checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;