import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CartContext } from '../../Provider/CartProvider';

const steps = ['Shipping', 'Billing', 'Review'];

const CheckOut = () => {
    const { cartItems, calculateTotalPrice } = useContext(CartContext);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [currentStep, setCurrentStep] = useState(0);

    const formData = watch(); // For showing data in review step

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onSubmit = data => {
        console.log('Form Data Submitted:', data);
        alert('Order placed successfully!');
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {/* Name */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    className={`w-full px-4 py-2 border focus:outline-violet-500 hover:border hover:border-gray-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    className={`w-full px-4 py-2 border focus:outline-violet-500 hover:border hover:border-gray-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    type="email"
                                    {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            {/* Phone */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
                                <input
                                    id="phone"
                                    className={`w-full px-4 py-2 border focus:outline-violet-500 hover:border hover:border-gray-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    type="tel"
                                    {...register('phone', { required: 'Phone number is required', minLength: { value: 10, message: 'Phone number must be 10 digits' } })}
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                            </div>

                            {/* ZIP Code */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="zipCode">ZIP Code</label>
                                <input
                                    id="zipCode"
                                    className={`w-full px-4 py-2 border focus:outline-violet-500 hover:border hover:border-gray-500 ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                                    type="text"
                                    {...register('zipCode', { required: 'ZIP code is required', minLength: 5, maxLength: 10 })}
                                />
                                {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
                            </div>

                            {/* Shipping Address */}
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="shippingAddress">Shipping Address</label>
                                <input
                                    id="shippingAddress"
                                    className={`w-full px-4 py-2 border focus:outline-violet-500 hover:border hover:border-gray-500 ${errors.shippingAddress ? 'border-red-500' : 'border-gray-300'}`}
                                    type="text"
                                    {...register('shippingAddress', { required: 'Shipping address is required' })}
                                />
                                {errors.shippingAddress && <p className="text-red-500 text-sm">{errors.shippingAddress.message}</p>}
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Billing Information</h2>
                        <div className='flex justify-between'>
                            <div>
                                {
                                    cartItems.map((item, index) =>
                                        <div key={index} className='mb-3' >
                                            <div className='flex gap-2'>
                                                <div>
                                                    <img src={item.image} alt="" className='w-16' />
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

                            <div>
                                <h1>Total: ${calculateTotalPrice()}</h1>
                                <p>Payment intrigation will be here...</p>
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
                        <div className="flex items-center  gap-2 mb-4">
                            <h3 className="font-semibold">Name:</h3>
                            <p>{formData.name}</p>
                        </div>
                        <div className="flex items-center  gap-2 mb-4">
                            <h3 className="font-semibold">Email:</h3>
                            <p>{formData.email}</p>
                        </div>
                        <div className="flex items-center  gap-2 mb-4">
                            <h3 className="font-semibold">Phone:</h3>
                            <p>{formData.phone}</p>
                        </div>
                        <div className="flex items-center  gap-2 mb-4">
                            <h3 className="font-semibold">ZIP Code:</h3>
                            <p>{formData.zipCode}</p>
                        </div>
                        <div className="flex items-center  gap-2 mb-4">
                            <h3 className="font-semibold">Shipping Address:</h3>
                            <p>{formData.shippingAddress}</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
                <div className="mb-4">
                    {/* Stepper */}
                    <div className="flex justify-between mb-8">
                        {steps.map((step, index) => (
                            <div key={index} className={`flex-1 text-center py-2 border-b-2 ${index === currentStep ? 'border-violet-600' : 'border-gray-300'}`}>
                                {step}
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {renderStep()}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-6">
                            {currentStep > 0 && (
                                <button
                                    type="button"
                                    className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                            )}
                            {currentStep < steps.length - 1 ? (
                                <button
                                    type="button"
                                    className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700"
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                >
                                    Place Order
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
