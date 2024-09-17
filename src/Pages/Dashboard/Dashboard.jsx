import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../Components/Loading/Loading';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import UserDashboard from './UserDashboard/UserDashboard';

const Dashboard = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />
    }
    if (user) {
        if (user.role === 'super-admin') {
            return <AdminDashboard />
        }
        if (user.role === 'admin') {
            return <AdminDashboard />
        }
        if (user.role === 'user') {
            return <UserDashboard />
        }
    }
};

export default Dashboard;