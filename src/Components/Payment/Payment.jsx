import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../../Provider/CartProvider';
import axiosInstance from '../../Axios/axiosInstance';

const Payment = ({ clientSecret, totalPrice }) => {
    const { user } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    console.log(cartItems);
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [successeId, setSuccessId] = useState('');
    // console.log('Client Secret:', clientSecret);
    const token = localStorage.getItem('authToken');


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        // for confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.name
                }
            }
        })
        if (confirmError) {
            console.log("confirm error", error);
        } else {
            console.log("Payment intent", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transuction id', paymentIntent.id);
                setSuccessId(paymentIntent.id)
                toast.success('Payment Successfull')

                // Payment data save to database..
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    date: new Date(),
                    transactionId: paymentIntent.id,
                    id: cartItems.map(cart => cart._id),
                    title: cartItems.map(cart => cart.title),
                    size: cartItems.map(cart => cart.size),
                    color: cartItems.map(cart => cart.color),
                    totalItems: cartItems.map(cart => cart.totalItems),
                    image: cartItems.map(cart => cart.image),
                    status: 'Pending'

                }
                try {
                    const response = await axiosInstance.post('/payment', payment, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    console.log('Payment saved successfully:', response.data);
                } catch (error) {
                    console.error('Error saving payment:', error);
                }

            }
        }

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='bg-white shadow-md border border-slate-300 p-6 rounded-lg max-w-md'>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition:Flip
                />
                <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Make a Payment</h2>
                <div className="mb-4">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '18px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                        className="border border-slate-300 p-3 rounded"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    className="w-full bg-violet-600 text-white font-medium py-3 px-6 rounded-md hover:bg-violet-500 focus:ring-4 focus:ring-violet-300 transition duration-150 ease-in-out mt-4"
                >
                    Pay Now
                </button>
            </form>

            {cardError && (
                <p className='text-red-600 mt-4 text-center'>{cardError}</p>
            )}
        </>
    );
};

export default Payment;
