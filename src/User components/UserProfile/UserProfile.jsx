import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { CartContext } from '../../Provider/CartProvider';

const UserProfile = () => {
    const {user}=useContext(AuthContext);
    const {cartItems}=useContext(CartContext)
    return (
        <div className='font-josefin'>
            <div className='flex justify-between gap-5'>
                <div className='w-96  bg-gray-50 border border-gray-100 rounded-xl'>
                    <div className='mb-16'>
                        <div className='flex justify-center mt-16'>
                            <img src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726704000&semt=ais_hybrid" alt="image" className='w-32 h-32 object-cover rounded-full border-4 border-violet-400' />
                        </div>
                        <div className='text-center mt-6'>
                            <h1 className='text-xl font-semibold text-gray-700'>{user.name}</h1>
                            <p className='s-text'>{user.email}</p>
                        </div>
                        <div className='bg-white grid grid-cols-2 gap-5 items-center p-8 m-8 rounded-xl'>
                            <div className='text-center'>
                                <p className='bg-violet-100 text-violet-500 px-3 py-1 mb-2 rounded-full'>Cart Items</p>
                                <p className='text-lg font-bold'>2</p>
                            </div>
                            <div  className='text-center'>
                                <p className='bg-green-100 text-green-500 px-3 py-1 mb-2 rounded-full'>Order Count</p>
                                <p className='text-lg font-bold'>32</p>
                            </div>
                            <div  className='text-center'>
                                <p className='bg-rose-100 text-rose-500 px-3 py-1 mb-2 rounded-full'>Wishlist</p>
                                <p className='text-lg font-bold'>22</p>
                            </div>
                            <div  className='text-center'>
                                <p className='bg-teal-100 text-teal-500 px-3 py-1 mb-2 rounded-full'>Reviewed</p>
                                <p className='text-lg font-bold'>22</p>
                            </div>
                        </div>
                        <div className='bg-white p-6 m-8 rounded-xl'>
                            <p className='font-bold text-gray-600'>Adrees: <span className='text-sm s-text '>{user.address}</span> </p>
                            <p className='font-bold text-gray-600'>City: <span className='text-sm s-text '>{user.city}</span> </p>
                            <p className='font-bold text-gray-600'>Post code: <span className='text-sm s-text '>{user.postcode}</span> </p>
                            <p className='font-bold text-gray-600'>Phone: <span className='text-sm s-text '>{user.phone}</span> </p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between w-3/4 gap-5'>
                    <div className='h-32 w-full bg-orange-600/50 rounded-xl '></div>
                    <div className='h-32 w-full bg-amber-200 rounded-xl '></div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;