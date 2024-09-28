import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import ManagesRoleTable from '../ManagesRoleTable/ManagesRoleTable';
import axiosInstance from '../../Axios/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Components/Loading/Loading';

const ManagesRoles = () => {
    const { user } = useContext(AuthContext);
    const [filteredData, setFilteredData] = useState([]);
    const [loadingRoleUpdate, setLoadingRoleUpdate] = useState(false);
    const token = localStorage.getItem('authToken');

    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const response = await axiosInstance.get('/users?role=admin');
            return response.data;
        },
    });

    useEffect(() => {
        const filteredUsers = data.filter(user => user.role === 'admin');
        setFilteredData(filteredUsers);
    }, [data]);

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

    const handleUserDelete = async (userId) => {
        try {
            const response = await axiosInstance.delete(`/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            toast.success('User deleted successfully');
            refetch();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };
    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
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
            <div className=' w-[320px] lg:w-full overflow-auto '>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-violet-500 border-b text-white">
                            <th className="px-4 py-2 text-left md:px-6 md:py-3">Name</th>
                            <th className="px-4 py-2 text-left md:px-6 md:py-3">Role</th>
                            {user.role === 'super-admin' && (
                                <th className="px-4 py-2 text-left md:px-6 md:py-3">Update Role</th>
                            )}
                            <th className="px-4 py-2 text-left md:px-6 md:py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(admin => (
                            <ManagesRoleTable
                                key={admin._id}
                                admin={admin}
                                handleUserDelete={handleUserDelete}
                                toggleRole={toggleRole}
                                loadingRoleUpdate={loadingRoleUpdate}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagesRoles;
