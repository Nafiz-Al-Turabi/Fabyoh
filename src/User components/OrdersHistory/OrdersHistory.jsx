import React, { useContext, useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import { AuthContext } from '../../Provider/AuthProvider';
import axiosInstance from '../../Axios/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const OrdersHistory = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('authToken');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const { isLoading, isError, data = [], error } = useQuery({
        queryKey: ['userOrders', { email: user.email }],
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

    // Filter orders with status "Completed" or "Delivered"
    const filteredData = data.filter(order => order.status === 'Completed' || order.status === 'Delivered');

    // Sort the filtered data by date (newest first)
    const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Calculate total pages
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Get the current items for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = sortedData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="p-6">
            {currentItems.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <thead className="bg-gradient-to-r from-green-500 to-violet-500 text-white">
                            <tr>
                                <th className="py-3 px-4 border-b text-left">Order ID</th>
                                <th className="py-3 px-4 border-b text-left">Transaction ID</th>
                                <th className="py-3 px-4 border-b text-left">Product Name</th>
                                <th className="py-3 px-4 border-b text-left">Quantity</th>
                                <th className="py-3 px-4 border-b text-left">Price</th>
                                <th className="py-3 px-4 border-b text-left">Order Date</th>
                                <th className="py-3 px-4 border-b text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(order => (
                                <tr key={order._id} className="hover:bg-gray-100 transition duration-200">
                                    <td className="py-2 px-4 border-b">{order._id}</td>
                                    <td className="py-2 px-4 border-b">{order.transactionId}</td>
                                    <td className="py-2 px-4 border-b">{order.title}</td>
                                    <td className="py-2 px-4 border-b">
                                        {order.totalItems.reduce((acc, item) => acc + item, 0)}
                                    </td>
                                    <td className="py-2 px-4 border-b text-green-600 font-semibold">
                                        ${order.price}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {new Date(order.date).toLocaleDateString()}
                                    </td>
                                    <td className={`py-2 px-4 border-b ${order.status === 'Delivered' ? 'text-green-500' : 'text-red-500'}`}>
                                        {order.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-600">No completed or delivered orders found.</p>
            )}

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

export default OrdersHistory;
