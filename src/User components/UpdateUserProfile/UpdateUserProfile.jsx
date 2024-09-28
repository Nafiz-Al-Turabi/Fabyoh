import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import axiosInstance from '../../Axios/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const image_token = import.meta.env.VITE_IMAGE_SECRET;

const UpdateUserProfile = () => {
    const { user, loading } = useContext(AuthContext);
    const token = localStorage.getItem('authToken')
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
    });
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_token}`;

    const onSubmit = async (updatedData) => {
        try {
            let imageUrl = user.image; 

            if (updatedData.image && updatedData.image[0]) {
                const formData = new FormData();
                formData.append('image', updatedData.image[0]);
    
                const imageUploadResponse = await fetch(image_hosting_url, {
                    method: 'POST',
                    body: formData,
                });
                const imageUploadResult = await imageUploadResponse.json();
    
                if (imageUploadResult.success) {
                    imageUrl = imageUploadResult.data.url;
                } else {
                    toast.error('Image upload failed');
                    return;
                }
            }
    
            const updatedUserData = {
                ...updatedData,
                image: imageUrl,
            };
            const response = await axiosInstance.put(`/user/${user?.email}`, updatedUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(' User profile updated successfully');
            window.location.reload()
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('You did not change anything');

        }
    };

    return (
        <div className="max-w-md lg:container mx-auto p-4 bg-white rounded-lg shadow-md border-t-4 border-violet-500">
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
                theme="light"
                transition:Flip
            />
            <h2 className="text-2xl font-semibold text-center mb-4">Update Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-0 grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        defaultValue={user.name}
                        className={`mt-1 block w-full border border-gray-300 focus:outline-violet-500 rounded-md p-2 ${errors.name ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="mt-1 block w-full border border-gray-300 focus:outline-violet-500 rounded-md p-2 bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                        type="text"
                        {...register('city', { required: 'City is required' })}
                        defaultValue={user.city}
                        className={`mt-1 block w-full border border-gray-300 focus:outline-violet-500 rounded-md p-2 ${errors.city ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Post Code</label>
                    <input
                        type='number'
                        defaultValue={user.postcode}
                        {...register('postcode', { required: 'Post code is required' })}
                        className={`mt-1 block w-full border border-gray-300 focus:outline-violet-500 rounded-md p-2 ${errors.address ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>
                <div className='lg:col-span-2'>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                        defaultValue={user.address}
                        {...register('address', { required: 'Address is required' })}
                        className={`mt-1 block w-full border border-gray-300 focus:outline-violet-500 rounded-md p-2 h-32 lg:h-56 ${errors.address ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        defaultValue={user.phone}
                        {...register('phone', { required: 'Phone is required' })}
                        className={`mt-1 block w-full border border-gray-300 focus:outline-violet-500 rounded-md p-2 ${errors.phone ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>



                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register('image')}
                        className={`mt-1 block w-full border border-gray-300 focus:outline-violet-500 rounded-md p-[5px] ${errors.image ? 'border-red-500' : ''
                            }`}
                    />
                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                </div>

                <div className='flex justify-end lg:col-span-2'>
                    <button
                        type="submit"
                        className="w-full lg:w-32  bg-violet-500 text-white font-semibold py-2 rounded-md hover:bg-violet-600 transition duration-200"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUserProfile;
