import React, { useContext, useEffect, useState } from 'react';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../Axios/axiosInstance';
import emoji from './../../assets/images/emoji.svg'
import emoji2 from './../../assets/images/emoji2.svg'
import Loading from '../../Components/Loading/Loading';
import { AuthContext } from '../../Provider/AuthProvider';
import CustomersTable from '../CustomersTable/CustomersTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customers = () => {
    const { user } = useContext(AuthContext)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loadingRoleUpdate, setLoadingRoleUpdate] = useState(false);
    const token = localStorage.getItem('authToken');


    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            const userRoleData = data.filter(user => user.role === 'user');
            setFilteredData(userRoleData);
            setFilteredData(data);
        } else {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const results = data.filter(user =>
                user.role === 'user' && (
                    user.name.toLowerCase().includes(lowerCaseQuery) ||
                    user.email.toLowerCase().includes(lowerCaseQuery)
                )
            );
            setFilteredData(results);
        }
    };


    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await axiosInstance.get('/users?role=user');
            return response.data;
        },
    });

    useEffect(() => {
        const filteredUsers = data.filter(user => user.role === 'user');
        setFilteredData(filteredUsers);
    }, [data]);

    if (isLoading) {
        return <Loading />
    }

    // Function to handle role toggling
    const toggleRole = async (userId, currentRole) => {
        if (user.role !== 'super-admin') {
            toast.error('Only super-admin can update roles');
            return;
        }

        const newRole = currentRole === 'admin' ? 'user' : 'admin';

        try {
            setLoadingRoleUpdate(true); // Start loading

            const response = await axiosInstance.patch(
                `/update-role/${userId}`,
                { role: newRole },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                toast.success('User role updated successfully');
                refetch();
            }
        } catch (error) {
            toast.error('Failed to update user role');
        } finally {
            setLoadingRoleUpdate(false);
        }
    };

    // Delete user..
    const handleUserDelete = async (userId) => {
        try {
            const response = await axiosInstance.delete(`/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success('User deleted successfully');
            refetch();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    }

    return (
        <div className="p-4">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
            <div className='md:flex justify-between mb-4'>
                <h2 className="text-2xl font-bold">Customers</h2>
                <div className='relative'>
                    <input
                        type="text"
                        className='border w-full md:w-96 p-2 rounded focus:outline-violet-400 z-0'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or email"
                    />
                    <button
                        onClick={handleSearch}
                        className='absolute top-[3px] right-1 bg-violet-500 hover:bg-violet-600 duration-200 text-xl text-white p-2 rounded active:scale-95'
                    >
                        <FaSearch />
                    </button>
                </div>
            </div>
            {
                filteredData.length === 0
                    ?
                    (
                        <div className='flex justify-center items-center h-[600px]'>
                            <div className='flex items-center'>
                                <img src={emoji} alt="" className='w-16' />
                                <p className='text-xl'>"Oops! We searched high and low, but your result seems to have gone on vacation. Try searching for something else!"</p>
                                <img src={emoji2} alt="" className='w-16' />
                            </div>
                        </div>
                    )
                    :
                    <div className=' w-[320px] lg:w-full  overflow-auto '>
                        <table className=" bg-white border border-gray-300 rounded-lg shadow-md w-full ">
                            <thead>
                                <tr className="bg-violet-500 border-b text-white">
                                    <th className="px-4 py-2 text-left md:px-6 md:py-3">Name</th>
                                    <th className="px-4 py-2 text-left md:px-6 md:py-3">Role</th>
                                    {
                                        user.role === 'super-admin' ? <th className="px-4 py-2 text-left md:px-6 md:py-3">Update Role</th> : ''
                                    }
                                    <th className="px-4 py-2 text-left md:px-6 md:py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map(userData => (
                                    <CustomersTable userData={userData} key={userData._id} toggleRole={toggleRole} loadingRoleUpdate={loadingRoleUpdate} handleUserDelete={handleUserDelete} />
                                ))}
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    );
};

export default Customers;
