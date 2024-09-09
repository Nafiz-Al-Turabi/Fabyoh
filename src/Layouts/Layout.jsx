import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Offer from '../Shared/Offer';
import BottomNav from '../Shared/BottomNav';

const Layout = () => {
    return (
        <div>
            <Offer />
            <Navbar />
            <Outlet />
            <BottomNav/>
        </div>
    );
};

export default Layout;