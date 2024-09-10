import React from 'react';
import logo from './../../assets/images/logo.webp';

const Login = () => {
    return (
        <div
            style={{
                backgroundImage: 'url("https://i.ibb.co/w4TjXSj/shopping.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh'
            }}
            className='flex justify-center items-center font-josefin'>
            <div className='bg-white w-[550px] p-6 rounded-lg '>
                <div className='flex justify-center'>
                    <img src={logo} alt="" className='w-32 mt-5 mb-14' />
                </div>
                <h1 className='text-3xl text-center mb-6'>Nice to see you again!</h1>
                <form action="" className='space-y-8'>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="w-full h-full px-3 py-6 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 hover:border-slate-500 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7e61da] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeHolder=" "
                            type='email'
                            name='email'
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7e61da] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#7e61da] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#7e61da] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Email
                        </label>
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="w-full h-full px-3 py-6 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 hover:border-slate-500 text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#7e61da] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeHolder=" "
                            type='password'
                            name='passowrd'
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#7e61da] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#7e61da] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#7e61da] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Passowrd
                        </label>
                    </div>
                    <a href="" className='block float-end p-text font-semibold'>Forget Passowrd?</a>
                    <button className='p-btn s-bg text-white uppercase p-3'>Login</button>

                    <p className='text-center'>Don't have an account?
                        <a href="" className='p-text ml-2'>Sign Up</a>
                    </p>

                    <div className='flex items-center gap-5'>
                        <hr className='w-full' />
                        <p className='text-slate-500'>or</p>
                        <hr className='w-full' />
                    </div>

                    <button className='flex items-center justify-center border text-base md:text-xl p-btn uppercase hover:text-white hover:bg-[#2b2b2b] duration-300'>
                        <img src="https://i.ibb.co.com/QYsBvmC/pngwing-com-2.png" alt="" className='w-10' />
                        Continue with google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
