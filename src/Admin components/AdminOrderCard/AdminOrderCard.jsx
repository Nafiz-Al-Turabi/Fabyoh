import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Axios/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';

const AdminOrderCard = ({ order, refetch }) => {
    const statusOptions = ['Pending', 'In Process', 'Complete'];

    const [status, setStatus] = useState(order.status);

    const token = localStorage.getItem('authToken')

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);

        try {
            const response = await axiosInstance.patch(`/adminOrders/${order._id}`, { newStatus }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('status updated succesfully');
            refetch();
        } catch (error) {
            toast.error('Failed to update status');
            console.error('Error updating status:', error);
        }
    };
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 container mx-auto border-t-4 border-rose-300">
            <ToastContainer />
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
                <h2 className="text-base font-bold text-gray-500">Order #{order.transactionId}</h2>
                <p className="text-gray-500 text-sm">Order Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <div className="border-t w-full border-gray-200 pt-4  grid grid-cols-1 lg:grid-cols-3 xl:flex jxl:ustify-between  gap-6">
                {/* Customer Info */}
                <div className='xl:w-1/4'>
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Customer Info</h3>
                    <p className="text-gray-600">Email: {order.email}</p>
                    <p className="text-gray-500 text-sm">Total Items: {order.totalItems.reduce((acc, item) => acc + item, 0)}</p>
                    <p className="text-gray-500 text-sm">Total Price: ${order.price}</p>
                </div>

                {/* Products Info */}
                <div className='xl:w-full'>
                    <h3 className="text-md font-semibold text-gray-700 mb-2 ">Products</h3>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-2 '>
                        {order.title.map((product, index) => (
                            <div key={index} className="mb-4 flex items-start space-x-4 border border-violet-200 p-1 rounded ">
                                <img
                                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                                    src={order.image[index]}
                                    alt={product}
                                />
                                <div className='flex'>
                                    <div>
                                        <p className="text-gray-600 font-medium text-xs">{product}</p>
                                        <p className="text-gray-500 text-sm">Size: {order.size[index]}</p>
                                        <p className="text-gray-500 text-sm">Total: {order.totalItems[index]}</p>

                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span
                                            className="w-6 h-6 border"
                                            style={{ backgroundColor: order.color[index] }}
                                            title={order.color[index]}
                                        ></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Dropdown */}
                <div className='xl:w-1/4'>
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Order Status</h3>
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        {statusOptions.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                </div>
            </div>
        </div>
    );
};

export default AdminOrderCard;
