import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Import react-hook-form
import logo from './../../assets/images/logo.webp';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Axios/axiosInstance';

const SignUp = () => {
    // Initialize useForm hook
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate()

    // Submit handler
    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post('/register', data);
            setSuccessMessage('Account created successfully! Redirecting to login page...');
            setErrorMessage('');

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'An error occurred');
            setErrorMessage('');
        }
    };

    return (
        <div style={{
            backgroundImage: 'url("https://i.ibb.co/w4TjXSj/shopping.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh'
        }}
            className='flex justify-center items-center font-josefin'>
            <div className='bg-white w-[550px] p-6 xl:p-16 rounded-lg'>
                <Link to="/" className='flex justify-center'>
                    <img src={logo} alt="Logo" className='w-32 mb-14' />
                </Link>
                <h1 className='text-3xl text-center mb-6'>Create an account</h1>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                {/* Handle form submission with handleSubmit */}
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="w-full h-full px-3 py-6 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 hover:border-slate-500 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7e61da] focus:border-t-transparent focus:outline-0"
                            placeholder=" " // Placeholder remains the same
                            type='name'
                            name='name'
                            {...register("name", { required: "Name is required" })} // Use register from react-hook-form
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7e61da] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#7e61da] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#7e61da] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Name
                        </label>
                        {/* Show error if validation fails */}
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    {/* Email Input */}
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="w-full h-full px-3 py-6 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 hover:border-slate-500 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7e61da] focus:border-t-transparent focus:outline-0"
                            placeholder=" " // Placeholder remains the same
                            type='email'
                            name='email'
                            {...register("email", { required: "Email is required" })} // Use register from react-hook-form
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7e61da] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#7e61da] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#7e61da] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Email
                        </label>
                        {/* Show error if validation fails */}
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    {/* Password Input */}
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="w-full h-full px-3 py-6 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 hover:border-slate-500 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7e61da] focus:border-t-transparent focus:outline-0"
                            placeholder=" "
                            type='password'
                            name='password'
                            {...register("password", { required: "Password is required" })} // Use register for password field
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7e61da] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#7e61da] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#7e61da] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Password
                        </label>
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>

                    <div className='hidden'>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            id="address"
                            type="text"
                            {...register('address')}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className='hidden'>
                        <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">Postcode</label>
                        <input
                            id="postcode"
                            type="text"
                            {...register('postcode')}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className='hidden'>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            id="city"
                            type="text"
                            {...register('city')}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <p className='block float-end text-sm font-semibold'>
                        By creating an account, you agree to our
                        <Link to='/' className='p-text'> Terms and Conditions</Link>, and
                        <Link to='/' className='p-text'> Privacy Policy</Link>.
                    </p>

                    {/* Submit Button */}
                    <button type="submit" className='p-btn s-bg text-white uppercase p-3'>Create account</button>

                    <p className='text-center'>Already have an account?
                        <Link to="/login" className='p-text ml-2'>Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
