import React, { useContext } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { FaPaypal } from 'react-icons/fa';
import { CartContext } from '../../Provider/CartProvider';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../../Axios/axiosInstance';

const PayPalButtonComponent = ({ createOrder, onApprove, totalPrice }) => {
    const { user } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const token = localStorage.getItem('authToken');

    const handleApprove = async (data, details) => {
        // Successful PayPal transaction
        toast.success('Transaction completed by ' + details.payer.name.given_name);

        // Prepare payment data for storage
        const paymentData = {
            email: user.email,
            price: totalPrice,
            date: new Date(),
            transactionId: data.orderID,
            id: cartItems.map(cart => cart._id),
            title: cartItems.map(cart => cart.title),
            size: cartItems.map(cart => cart.size),
            color: cartItems.map(cart => cart.color),
            totalItems: cartItems.map(cart => cart.totalItems),
            image: cartItems.map(cart => cart.image),
            status: 'Pending',
        };

        try {
            // Send the payment data to the server
            const response = await axiosInstance.post('/payment', paymentData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Payment saved successfully:', response.data);
        } catch (error) {
            console.error('Error saving payment:', error);
        }
    };

    return (
        <div className="border border-yellow-400 bg-yellow-50 p-6 rounded-lg shadow-md relative z-30"> {/* Add z-50 for high z-index */}
             <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="flex items-center gap-3 mb-4">
                <FaPaypal className="text-3xl text-yellow-600" />
                <h2 className="text-2xl font-semibold text-gray-700">Pay with PayPal</h2>
            </div>

            <div className="mb-6">
                <p className="text-gray-600 text-md">Secure and easy payments with PayPal. Your payment of <strong>${totalPrice}</strong> will be processed securely.</p>
            </div>

            <PayPalButtons 
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: totalPrice,
                            },
                        }],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        handleApprove(data, details);
                    });
                }}
                onError={(err) => {
                    console.error('PayPal Checkout Error:', err);
                    alert('Something went wrong with your payment. Please try again.');
                }}
                style={{
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'paypal',
                }}
            />

            {/* Optional Section: Custom error messages */}
            <div id="paypal-error" className="text-red-600 mt-4 hidden">
                <p>An error occurred during checkout. Please try again.</p>
            </div>
        </div>
    );
};

export default PayPalButtonComponent;
