import React, { useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import { CartContext } from '../../Provider/CartProvider';
import { Link } from 'react-router-dom';

const Sidebar = ({ toggleCart }) => {
    const { cartItems, increaseQuantity, decreaseQuantity, removeItem, calculateTotalPrice } = useContext(CartContext);
    return (
        <div className='fixed z-50 bg-white md:w-[350px] xl:w-[450px] h-full top-0 right-0 font-josefin border-l overflow-auto z-50'>
            <div className='relative px-6'>
                <button onClick={toggleCart}>
                    <IoClose className='text-4xl absolute top-5 left-5 text-gray-500' />
                </button>
                <div className='mt-16'>
                    {cartItems.length > 0 ? (
                        <>
                            {/* Cart Items */}
                            {cartItems.map((item) => (
                                <div
                                    key={item._id} // Use item's unique ID as key
                                    className='relative flex gap-3 border-b pb-6 mb-5'
                                >
                                    <div>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className='w-24 h-24 object-cover'
                                        />
                                    </div>
                                    <div className='space-y-1.5'>
                                        <h3>{item.title}</h3>
                                        <div className='flex gap-2 items-center'>
                                            <p style={{ backgroundColor: item.color }} className='h-4 w-4'></p><span className='text-xl text-gray-300'>|</span>
                                            <p>{item.size}</p>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <div className='w-24 flex justify-between border-2 p-1 text-center'>
                                                <button onClick={() => decreaseQuantity(item._id)}>-</button>
                                                {item.totalItems}
                                                <button onClick={() => increaseQuantity(item._id)}>+</button>
                                            </div>
                                            <p className='font-bold'>${item.totalPrice.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    {/* For delete added cart */}
                                    <button
                                        className='absolute top-0 right-0'
                                        onClick={() => removeItem(item._id)}
                                    >
                                        <IoClose />
                                    </button>
                                </div>
                            ))}

                            {/* Total and Checkout */}
                            <button className='p-btn border mt-5'>Add More From Wishlist</button>

                            <div className='mt-5 p-2'>
                                <h1 className='text-lg'>Total MRP</h1>
                                <div className='flex justify-between bg-gray-100 p-2 mt-2'>
                                    <p>Total Amount</p>
                                    <p>${calculateTotalPrice()}</p>
                                </div>
                            </div>

                            <Link to='/checkout'>
                                <button onClick={() => toggleCart()} className='p-btn s-bg text-white uppercase mt-10'>
                                    Proceed to checkout
                                </button>
                            </Link>
                            <Link to='/cart'>
                                <button onClick={() => toggleCart()} className='p-btn hover:bg-[#2b2b2b] border hover:text-white uppercase mt-10'>
                                    View cart
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className='mt-56'>
                            <div className='flex flex-col justify-center items-center space-y-32'>
                                <p className='text-lg'>There is nothing in your bag!</p>
                                <img src="https://i.ibb.co.com/r03M1Fv/cart-min.png" alt="" className='w-56' />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
