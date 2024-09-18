import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '../../Axios/axiosInstance';


const Customers = () => {
    const handleDelete = () => {
        alert('Delete action triggered');
    };

    const { isPending, isError, data = [], error, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await axiosInstance.get('/users');
            return response.data;

        },
    })

    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="px-4 py-2 text-left text-gray-600 md:px-6 md:py-3">Name</th>
                        <th className="px-4 py-2 text-left text-gray-600 md:px-6 md:py-3">Role</th>
                        <th className="px-4 py-2 text-left text-gray-600 md:px-6 md:py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50 border-b transition-colors duration-300">
                            <td className="px-4 py-2 md:px-6 md:py-4 flex items-center space-x-2 text-sm">
                                <img
                                    src={user.image || "https://via.placeholder.com/40"}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p>{user.name}</p>
                                    <p>{user.email}</p>
                                </div>
                            </td>
                            <td className="px-4 py-2 md:px-6 md:py-4">
                                <select
                                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                            </td>
                            <td className="px-4 py-2 md:px-6 md:py-4 flex items-center space-x-2">
                                <button
                                    onClick={handleDelete}
                                    className="flex items-center bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors duration-300"
                                >
                                    <FaTrashAlt className="mr-1" />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;
