import React, { useEffect, useState } from 'react';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../Axios/axiosInstance';

const Customers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setFilteredData(data);
        } else {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const results = data.filter(user =>
                user.name.toLowerCase().includes(lowerCaseQuery) ||
                user.email.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredData(results);
        }
    };

    const handleDelete = () => {
        alert('Delete action triggered');
    };

    const { isPending, isError, data = [], error, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await axiosInstance.get('/users');
            return response.data;
        },
    });

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    return (
        <div className="overflow-x-auto p-4">
            <div className='flex justify-between mb-4'>
                <h2 className="text-2xl font-bold">Customers</h2>
                <div className='relative'>
                    <input
                        type="text"
                        className='border w-96 p-2 rounded focus:outline-violet-400'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or email"
                    />
                    <button
                        onClick={handleSearch}
                        className='absolute top-[3px] right-1 bg-violet-500 hover:bg-violet-600 duration-200 text-xl text-white p-2 rounded'
                    >
                        <FaSearch />
                    </button>
                </div>
            </div>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="px-4 py-2 text-left text-gray-600 md:px-6 md:py-3">Name</th>
                        <th className="px-4 py-2 text-left text-gray-600 md:px-6 md:py-3">Role</th>
                        <th className="px-4 py-2 text-left text-gray-600 md:px-6 md:py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(user => (
                        <tr key={user._id} className="hover:bg-gray-50 border-b transition-colors duration-300">
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
