import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'; // Import react-hook-form
import logo from './../../assets/images/logo.webp';
import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Axios/axiosInstance';
import { AuthContext } from '../../Provider/AuthProvider';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    const from  = location.state?.from?.pathname || '/';

    const { login, errorMessage, successMessage } = useContext(AuthContext)


    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            await login(email, password);
            setTimeout(() => {
                navigate(from, {replace: true});
            }, 1000);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div
            style={{
                backgroundImage: 'url("https://i.ibb.co/w4TjXSj/shopping.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh'
            }}
            className='flex justify-center items-center font-josefin'>
            <div className='bg-white w-[550px] p-6 xl:p-16 rounded-lg'>
                <Link to="/" className='flex justify-center'>
                    <img src={logo} alt="logo" className='w-32  mb-14' />
                </Link>
                <h1 className='text-3xl text-center mb-6'>Nice to see you again!</h1>
                {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="w-full h-full px-3 py-6 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 hover:border-slate-500 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7e61da] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            type='email'
                            {...register('email', { required: 'Email is required' })}
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7e61da] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#7e61da] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#7e61da] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Email
                        </label>
                        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                    </div>

                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="w-full h-full px-3 py-6 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 hover:border-slate-500 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7e61da] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            type='password'
                            {...register('password', { required: 'Password is required' })}
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7e61da] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#7e61da] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#7e61da] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Password
                        </label>
                        {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                    </div>

                    <a href="#" className='block float-end p-text font-semibold'>Forget Password?</a>
                    <button type='submit' className='p-btn s-bg text-white uppercase p-3'>Login</button>

                    <p className='text-center'>Don't have an account?
                        <Link to="/signup" className='p-text ml-2'>Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
