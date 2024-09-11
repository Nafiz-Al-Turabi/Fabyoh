import React, { useEffect, useState } from 'react';
import FeaturedProductCard from '../Cards/FeaturedProductCard/FeaturedProductCard';

const Filters = () => {

    // State to manage dropdown visibility and selected option
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Newest');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);


    // Handle the dropdown toggle
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Handle selecting an option
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false); // Close dropdown after selecting an option
    };

    // for fillter system
    const [openCategory, setOpenCategory] = useState(false);
    const [openPrice, setOpenPrice] = useState(false);
    const [openAvailability, setOpenAvailability] = useState(false);
    const [openTrending, setOpenTrending] = useState(false);


    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await fetch('/products.json')
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const result = await response.json()
            setProducts(result)
        } catch (error) {
            console.log('Failed to fetch products', error)
        }
    };

    // sort 

    useEffect(() => {
        sortProducts();
    }, [selectedOption, products]);

    const sortProducts = () => {
        let sorted = [...products];

        switch (selectedOption) {
            case 'Newest':
                sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'Low to High':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'High to Low':
                sorted.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        setFilteredProducts(sorted);
    };

    return (
        <div>
            <div className='flex justify-between items-center p-6 border-2 bg-white relative'>
                <p>{filteredProducts.length} Items Found</p>
                <div className='relative'>
                    <span className='w-56 p-2 text-slate-400 border rounded-md flex items-center cursor-pointer' onClick={handleDropdownToggle}>
                        Store by:
                        <button className='text-left text-black ml-2'>{selectedOption}</button>
                    </span>
                    {isDropdownOpen && (
                        <div className='bg-white shadow-md w-56 flex flex-col absolute right-0 top-12 rounded-md z-40 border border-gray-200'>
                            <button
                                className='p-2 hover:bg-violet-50 text-left'
                                onClick={() => handleOptionSelect('Newest')}
                            >
                                Newest
                            </button>
                            <button
                                className='p-2 hover:bg-violet-50 text-left'
                                onClick={() => handleOptionSelect('Low to High')}
                            >
                                Low to High
                            </button>
                            <button
                                className='p-2 hover:bg-violet-50 text-left'
                                onClick={() => handleOptionSelect('High to Low')}
                            >
                                High to Low
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex'>
                <div className='hidden lg:block w-1/3 bg-white border-r mb-6'>
                    <div className='flex justify-between items-center mb-6 p-6'>
                        <h1 className='text-xl font-semibold text-gray-800'>Filters</h1>
                        <button className='text-red-500 hover:text-red-600 font-medium'>Clear All</button>
                    </div>

                    {/* Category Accordion */}
                    <div className=''>
                        <button
                            className='w-full text-left flex justify-between items-center py-3 px-6 border-t'
                            onClick={() => setOpenCategory(!openCategory)}
                        >
                            <span className='text-gray-700'>Category</span>
                            <svg
                                className={`w-4 h-4 transition-transform ${openCategory ? 'rotate-180' : ''}`}
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                            </svg>
                        </button>
                        {openCategory && (
                            <div className='mt-2 space-y-2'>
                                {['Shirts', 'Tshirts', 'Hoodies', 'Jackets'].map((item) => (
                                    <label key={item} className='flex items-center py-3 px-6'>
                                        <input
                                            type='checkbox'
                                            className='form-checkbox text-red-500'
                                        />
                                        <span className='ml-2 text-gray-700'>{item}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Price Accordion */}
                    <div className=''>
                        <button
                            className='w-full text-left flex justify-between items-center py-3 px-6 border-t'
                            onClick={() => setOpenPrice(!openPrice)}
                        >
                            <span className='text-gray-700'>Price</span>
                            <svg
                                className={`w-4 h-4 transition-transform ${openPrice ? 'rotate-180' : ''}`}
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                            </svg>
                        </button>
                        {openPrice && (
                            <div className='mt-2 space-y-2'>
                                {['0-100', '100-200', '200-300'].map((item) => (
                                    <label key={item} className='flex items-center py-3 px-6'>
                                        <input
                                            type='checkbox'
                                            className='form-checkbox text-red-500 w'
                                        />
                                        <span className='ml-2 text-gray-700'>{item}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Availability Accordion */}
                    <div className=''>
                        <button
                            className='w-full text-left flex justify-between items-center py-3 px-6 border-t'
                            onClick={() => setOpenAvailability(!openAvailability)}
                        >
                            <span className='text-gray-700'>Availability</span>
                            <svg
                                className={`w-4 h-4 transition-transform ${openAvailability ? 'rotate-180' : ''}`}
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                            </svg>
                        </button>
                        {openAvailability && (
                            <div className='mt-2 space-y-2'>
                                {['In Stock', 'Out of Stock'].map((item) => (
                                    <label key={item} className='flex items-center py-3 px-6'>
                                        <input
                                            type='checkbox'
                                            className='form-checkbox text-red-500'
                                        />
                                        <span className='ml-2 text-gray-700'>{item}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Trending Accordion */}
                    <div>
                        <button
                            className='w-full text-left flex justify-between items-center py-3 px-6 border-t'
                            onClick={() => setOpenTrending(!openTrending)}
                        >
                            <span className='text-gray-700'>Trending</span>
                            <svg
                                className={`w-4 h-4 transition-transform ${openTrending ? 'rotate-180' : ''}`}
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                            </svg>
                        </button>
                        {openTrending && (
                            <div className='mt-2 space-y-2'>
                                {['Popular', 'New Arrivals'].map((item) => (
                                    <label key={item} className='flex items-center py-3 px-6'>
                                        <input
                                            type='checkbox'
                                            className='form-checkbox text-red-500'
                                        />
                                        <span className='ml-2 text-gray-700'>{item}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className='w-full py-4 lg:p-6'>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 mx-4 xl:mx-0'>
                        {
                            filteredProducts.map(product => <FeaturedProductCard key={product.id} product={product} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;