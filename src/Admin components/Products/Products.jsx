import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ProductsCard from '../ProductsCard/ProductsCard';
import Loading from '../../Components/Loading/Loading';
import axiosInstance from '../../Axios/axiosInstance';

const Products = () => {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem('authToken');
    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axiosInstance.get('/products', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    // Pagination Logic
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

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

    return (
        <div>
            {/* Display Products */}
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-10'>
                {paginatedData.map(product => (
                    <ProductsCard key={product._id} product={product} refetch={refetch} />
                ))}
            </div>

            {paginatedData.length > 0 && (
                <div className="flex justify-center mt-8">
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

export default Products;
