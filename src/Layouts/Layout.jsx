import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Offer from '../Shared/Offer';
import BottomNav from '../Shared/BottomNav';
import Footer from '../Shared/Footer';

const Layout = () => {
    // Conditional rendaring for navbar and other
    const location = useLocation();
    const hide = location.pathname === '/login' || location.pathname === '/signup'||  location.pathname === '/dashboard';
    return (
        <div>
            {!hide && <Offer />}
            {!hide && <Navbar />}
            <Outlet />
            {!hide && <Footer />}
            {!hide && <BottomNav />}
        </div>
    );
};

export default Layout;