import React, { useEffect, useState } from 'react';
import FeaturedProductCard from '../Cards/FeaturedProductCard/FeaturedProductCard';
import axiosInstance from '../../Axios/axiosInstance';

const Filters = () => {
    const itemsPerPage = 12;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Newest');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [openCategory, setOpenCategory] = useState(true);
    const [openPrice, setOpenPrice] = useState(false);
    const [openAvailability, setOpenAvailability] = useState(false);

    // States for selected filter criteria
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [selectedTrending, setSelectedTrending] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        fetchProducts();
        // to select category according to Navigation bar
        const path = window.location.pathname;
        const category = path.split('/').pop(); // Get the last part of the path
        if (category && category !== 'products') {
            setSelectedCategory([category]);
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('/products');
            const result = response.data
            setProducts(result);
            setFilteredProducts(result);
        } catch (error) {
            console.log('Failed to fetch products', error);
        }
    };

    // Handle the dropdown toggle
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Handle selecting an option
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };

    // Handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategory((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    // Handle price range selection
    const handlePriceChange = (range) => {
        setSelectedPriceRange((prev) =>
            prev.includes(range) ? prev.filter((item) => item !== range) : [...prev, range]
        );
    };

    // Handle availability selection
    const handleAvailabilityChange = (availability) => {
        setSelectedAvailability((prev) =>
            prev.includes(availability)
                ? prev.filter((item) => item !== availability)
                : [...prev, availability]
        );
    };

    // Handle trending selection
    const handleTrendingChange = (trending) => {
        setSelectedTrending((prev) =>
            prev.includes(trending) ? prev.filter((item) => item !== trending) : [...prev, trending]
        );
    };

    useEffect(() => {
        filterAndSortProducts();
    }, [selectedOption, selectedCategory, selectedPriceRange, selectedAvailability, selectedTrending, products]);

    // Filter and Sort Products
    const filterAndSortProducts = () => {
        let updatedProducts = [...products];

        // Apply category filter
        if (selectedCategory.length > 0) {
            updatedProducts = updatedProducts.filter((product) =>
                selectedCategory.includes(product.category)
            );
        }

        // Apply price filter
        if (selectedPriceRange.length > 0) {
            updatedProducts = updatedProducts.filter((product) => {
                const productPrice = product.price;
                return selectedPriceRange.some((range) => {
                    const [min, max] = range.split('-').map(Number);
                    return productPrice >= min && productPrice <= max;
                });
            });
        }

        // Apply availability filter
        if (selectedAvailability.length > 0) {
            updatedProducts = updatedProducts.filter((product) =>
                selectedAvailability.includes(product.in_stock ? 'In Stock' : 'Out of Stock')
            );
        }

        // Apply trending filter
        if (selectedTrending.length > 0) {
            updatedProducts = updatedProducts.filter((product) =>
                selectedTrending.includes(product.trending ? 'Popular' : 'New Arrivals')
            );
        }

        // Sort the filtered products
        switch (selectedOption) {
            case 'Newest':
                updatedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'Low to High':
                updatedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'High to Low':
                updatedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFilteredProducts(updatedProducts);
    };

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Control the number of pagination buttons displayed
    const visiblePages = 5; // Number of page buttons to show around the current page
    const getPaginationGroup = () => {
        let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
        let end = Math.min(totalPages, start + visiblePages - 1);
        start = Math.max(1, end - visiblePages + 1);
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <div className='flex justify-between items-center p-6 border-2 bg-white relative font-josefin'>
                <p>{filteredProducts.length} Items Found</p>
                <div className='relative'>
                    <span className='w-56 p-2 text-slate-400 border rounded-md flex items-center cursor-pointer' onClick={handleDropdownToggle}>
                        Sort by:
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
            <div className='flex font-josefin'>
                <div className='hidden lg:block w-1/4 bg-white border-r mb-6'>
                    <div className='flex justify-between items-center mb-6 p-6'>
                        <h1 className='text-xl font-semibold text-gray-800'>Filters</h1>
                        <button className='text-red-500 hover:text-red-600 font-medium' onClick={() => {
                            setSelectedCategory([]);
                            setSelectedPriceRange([]);
                            setSelectedAvailability([]);
                            setSelectedTrending([]);
                        }}>Clear All</button>
                    </div>

                    {/* Category Accordion */}
                    <div>
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
                                            className='checkbox'
                                            checked={selectedCategory.includes(item.toLowerCase())}
                                            onChange={() => handleCategoryChange(item.toLowerCase())}
                                        />
                                        <span className='ml-2 text-gray-700'>{item}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Price Accordion */}
                    <div>
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
                                            className='checkbox'
                                            onChange={() => handlePriceChange(item)}
                                        />
                                        <span className='ml-2 text-gray-700'>${item}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Availability Accordion */}
                    <div>
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
                                            className='checkbox'
                                            onChange={() => handleAvailabilityChange(item)}
                                        />
                                        <span className='ml-2 text-gray-700'>{item}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
                <div className='grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 p-4 mx-4 xl:mx-0'>
                    {paginatedData.map((product) => (
                        <FeaturedProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
            {paginatedData.length > 0 && (
                <div className="flex justify-center mt-8 mb-10">
                    <nav>
                        <ul className="inline-flex items-center -space-x-px">
                            {/* First Button */}
                            <li>
                                <button
                                    className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 && 'cursor-not-allowed'}`}
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === 1}
                                >
                                    First
                                </button>
                            </li>

                            {/* Previous Button */}
                            <li>
                                <button
                                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 && 'cursor-not-allowed'}`}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>

                            {/* Pagination Buttons */}
                            {getPaginationGroup().map(page => (
                                <li key={page}>
                                    <button
                                        className={`px-3 py-2 leading-tight border ${currentPage === page ? 'bg-violet-500 text-white' : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            ))}

                            {/* Next Button */}
                            <li>
                                <button
                                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages && 'cursor-not-allowed'}`}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>

                            {/* Last Button */}
                            <li>
                                <button
                                    className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages && 'cursor-not-allowed'}`}
                                    onClick={() => handlePageChange(totalPages)}
                                    disabled={currentPage === totalPages}
                                >
                                    Last
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Filters;
