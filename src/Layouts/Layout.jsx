import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Offer from '../Shared/Offer';
import BottomNav from '../Shared/BottomNav';
import Footer from '../Shared/Footer';

const Layout = () => {
    return (
        <div>
            <Offer />
            <Navbar />
            <Outlet />
            <Footer/>
            <BottomNav/>
        </div>
    );
};

export default Layout;