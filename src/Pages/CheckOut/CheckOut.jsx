import React, { useContext, useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartContext } from '../../Provider/CartProvider';
import Payment from '../../Components/Payment/Payment';
import axiosInstance from '../../Axios/AxiosInstance';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalButtonComponent from '../../Components/PayPalButtonComponent/PayPalButtonComponent';
import { FaStripe, FaPaypal } from 'react-icons/fa'; // Icons for Stripe & PayPal

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_key);

const CheckOut = () => {
    const { cartItems, calculateTotalPrice } = useContext(CartContext);
    const [clientSecret, setClientSecret] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const token = localStorage.getItem('authToken');
    const totalPrice = calculateTotalPrice();

    useEffect(() => {
        if (paymentMethod === 'stripe') {
            paymentIntent(); // Only call if Stripe is selected
        }
    }, [totalPrice, paymentMethod]);

    const paymentIntent = async () => {
        try {
            const response = await axiosInstance.post('/create-payment-intent', { price: totalPrice }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.error('Payment Intent Error:', error);
        }
    };

    // PayPal payments
    const handleCreateOrder = async () => {
        try {
            const { data } = await axiosInstance.post('/paypal/create-payment', { totalPrice }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return data.forwardLink;
        } catch (error) {
            console.error('Error creating PayPal order:', error);
        }
    };

    const handleApproveOrder = async (data) => {
        try {
            const { data: paymentData } = await axiosInstance.post('/paypal/execute-payment', {
                paymentId: data.orderID,
                payerId: data.payerID
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Payment approved:', paymentData);
        } catch (error) {
            console.error('Error approving PayPal order:', error);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='max-w-7xl mx-auto my-16 p-4 xl:p-0 font-josefin'>
            <div>
                <h2 className="text-xl font-bold mb-4 md:text-3xl">Billing Information</h2>
                <div className='md:flex justify-between items-start'>
                    {/* Cart items */}
                    <div className='mb-8 md:w-1/2'>
                        {cartItems.map((item) => (
                            <div key={item._id} className='mb-3 flex gap-4'>
                                <img src={item.image} alt={item.title} className='w-20 h-20 object-cover' />
                                <div className='flex flex-col justify-between'>
                                    <h1 className='font-bold'>{item.title}</h1>
                                    <div className='flex items-center gap-4'>
                                        <p style={{ backgroundColor: item.color }} className='h-4 w-4 rounded-full'></p>
                                        <span className='text-xl text-gray-300'>|</span>
                                        <p className='md:text-xl'>{item.size}</p>
                                        <span className='text-xl text-gray-300'>|</span>
                                        <p className='font-bold'>${item.totalPrice}</p>
                                        <span className='text-xl text-gray-300'>|</span>
                                        <p className='md:text-xl'>{item.totalItems}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment selection and details */}
                    <div className='md:w-1/2'>
                        <h1 className='mb-5 text-xl font-bold'>Total: ${totalPrice}</h1>

                        {/* Payment Method Selector */}
                        <div className="mb-8 flex gap-4">
                            {/* Stripe Payment Card */}
                            <div
                                className={`border p-4 w-full rounded-lg cursor-pointer transition transform duration-300 hover:scale-105 ${paymentMethod === 'stripe' ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200'
                                    }`}
                                onClick={() => setPaymentMethod('stripe')}
                            >
                                <FaStripe className='text-3xl text-blue-600 mb-2' />
                                <h3 className='text-lg font-semibold'>Pay with Stripe</h3>
                                <p className='text-sm text-gray-500'>Secure card payment via Stripe.</p>
                            </div>

                            {/* PayPal Payment Card */}
                            <div
                                className={`border p-4 w-full rounded-lg cursor-pointer transition transform duration-300 hover:scale-105 ${paymentMethod === 'paypal' ? 'border-yellow-500 bg-yellow-50 shadow-md' : 'border-gray-200'
                                    }`}
                                onClick={() => setPaymentMethod('paypal')}
                            >
                                <FaPaypal className='text-3xl text-yellow-600 mb-2' />
                                <h3 className='text-lg font-semibold'>Pay with PayPal</h3>
                                <p className='text-sm text-gray-500'>Fast, easy, and secure PayPal payment.</p>
                            </div>
                        </div>

                        {/* Conditionally render payment options */}
                        {paymentMethod === 'stripe' && (
                            <Elements stripe={stripePromise}>
                                <Payment clientSecret={clientSecret} totalPrice={totalPrice} />
                            </Elements>
                        )}
                        {paymentMethod === 'paypal' && (
                            <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
                                <PayPalButtonComponent
                                    createOrder={handleCreateOrder}
                                    onApprove={handleApproveOrder}
                                    totalPrice={totalPrice}
                                />
                            </PayPalScriptProvider>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
