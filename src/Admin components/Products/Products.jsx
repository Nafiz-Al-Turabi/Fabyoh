import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ProductsCard from '../ProductsCard/ProductsCard';
import Loading from '../../Components/Loading/Loading';
import axiosInstance from '../../Axios/axiosInstance';

const Products = () => {
    const itemsPerPage = 10; 
    const [currentPage, setCurrentPage] = useState(1); 
    const token = localStorage.getItem('authToken');
    const { isLoading, isError, data = [], error } = useQuery({
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

    // Pagination 
    const totalPages = Math.ceil(data.length / itemsPerPage); 
    const startIndex = (currentPage - 1) * itemsPerPage; 
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage); 

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {/* Display Products */}
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-10'>
                {paginatedData.map(product => (
                    <ProductsCard key={product._id} product={product} />
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <nav>
                    <ul className="inline-flex items-center -space-x-px">
                        <li>
                            <button
                                className={`px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 && 'cursor-not-allowed'}`}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index + 1}>
                                <button
                                    className={`px-3 py-2 leading-tight border ${currentPage === index + 1 ? 'bg-violet-500 text-white' : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages && 'cursor-not-allowed'}`}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Products;
