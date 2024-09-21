import React, { useContext, useState } from 'react';
import AdminOrderCard from '../AdminOrderCard/AdminOrderCard';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../Axios/axiosInstance';
import Loading from '../../Components/Loading/Loading';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('authToken');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['userOrders'],
        queryFn: async () => {
            const response = await axiosInstance.get('/adminOrders', {
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

    const pendingOrders = data.filter(order => order.status === 'Pending');

    // Calculate total pages
    const totalPages = Math.ceil(pendingOrders.length / itemsPerPage);

    // Get the current items for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = pendingOrders.slice(startIndex, startIndex + itemsPerPage);
    return (
        <div className='mt-10'>
            {
                currentItems.map(order =>
                    <AdminOrderCard key={order._id} order={order} refetch={refetch}/>
                )
            }

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

export default Orders;