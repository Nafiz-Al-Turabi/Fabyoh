import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import TransactionCard from '../Cards/TransactionCard/TransactionCard';
import Loading from '../../Components/Loading/Loading';
import { AuthContext } from '../../Provider/AuthProvider';
import axiosInstance from '../../Axios/AxiosInstance';

const UserOrders = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('authToken');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { isLoading, isError, data = [], error } = useQuery({
        queryKey: ['userOrders', { email: user?.email }],
        queryFn: async () => {
            const response = await axiosInstance.get('/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        },
    });

    if (isLoading) return <Loading />;

    if (isError) {
        console.error('Error:', error);
        return <p>Error loading orders: {error.message}</p>;
    }

    // Filter orders with status "Pending" or "In Processing"
    const filteredData = data.filter(order =>
        order.status === 'Pending' || order.status === 'In Process'
    );

    // Sort the filtered data by date (newest first)
    const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate total pages
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Get the current items for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = sortedData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="">
            <div>
                {
                    currentItems.length > 0 ? (
                        <div  className='grid grid-cols-1 xl:grid-cols-2'>
                            {
                                currentItems.map((transaction) => (
                                    <TransactionCard key={transaction._id} transaction={transaction} />
                                ))
                            }
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No Pending or In Processing orders found.</p>
                    )
                }
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-violet-500 text-white' : 'bg-gray-300 text-black'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserOrders;
