import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    
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
                    disabled={!stripe}
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
