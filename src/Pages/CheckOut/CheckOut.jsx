import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Provider/CartProvider';
import Payment from '../../Components/Payment/Payment';
import axiosInstance from '../../Axios/axiosInstance';

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_key)
const CheckOut = () => {
    const { cartItems, calculateTotalPrice } = useContext(CartContext);
    const [clientSecret, setClientSecret] = useState('');
    const token = localStorage.getItem('authToken');
    const totalPrice = calculateTotalPrice();
    useEffect(() => {
        paymentIntent();
    }, [calculateTotalPrice]);

    const paymentIntent = async () => {
        try {
            const response = await axiosInstance.post('/create-payment-intent', { price: totalPrice }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setClientSecret(response.data.clientSecret);
        } catch (error) {

        }

        
    }
    return (
        <div className='max-w-7xl mx-auto my-16 p-4 xl:p-0 font-josefin h-screen'>
            <div>
                <h2 className="text-xl font-bold mb-4 md:text-3xl">Billing Information</h2>
                <div className='md:flex justify-between items-center'>
                    <div>
                        {
                            cartItems.map((item) =>
                                <div key={item._id} className='mb-3' >
                                    <div className='flex gap-2'>
                                        <div>
                                            <img src={item.image} alt="" className='w-20' />
                                        </div>
                                        <div className='flex flex-col justify-between'>
                                            <h1>{item.title}</h1>
                                            <div className='flex items-center gap-4'>
                                                <p style={{ backgroundColor: item.color }} className='h-4 w-4'></p><span className='text-xl text-gray-300'>|</span>
                                                <p className='md:text-xl'>{item.size}</p><span className='text-xl text-gray-300'>|</span>
                                                <p className='font-bold'>${item.totalPrice.toFixed(2)}</p><span className='text-xl text-gray-300'>|</span>
                                                <p className='md:text-xl'>{item.totalItems}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        }

                    </div>

                    <div className='w-full md:w-1/2'>
                        <h1 className='mb-5 text-xl font-bold'>Total: ${totalPrice}</h1>
                        <Elements stripe={stripePromise} >
                            <Payment clientSecret={clientSecret} totalPrice={totalPrice}></Payment>
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
