import React, { useContext, useState } from 'react';
import { FaUser, FaShoppingCart, FaHistory, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { IoSettings } from 'react-icons/io5';
import logo from './../../../assets/images/logo.webp';
import Loading from '../../../Components/Loading/Loading';
import UserSettings from '../../../User components/UserSettings/UserSettings';
import UserProfile from '../../../User components/UserProfile/UserProfile';
import { Link } from 'react-router-dom';
import UserOrders from '../../../User components/UserOrders/UserOrders';
import OrdersHistory from '../../../User components/OrdersHistory/OrdersHistory';

const UserDashboard = () => {
    const { user, logout, loading } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('profile'); // State for active tab

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex h-screen font-josefin">
            {/* Sidebar for Desktop */}
            <aside
                className={`fixed top-0 inset-y-0 h-screen left-0 md:p-5 w-64 bg-white border-r transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:static md:w-64 md:flex md:flex-col`}
            >
                <div className="p-4 flex justify-center">
                    <Link to='/'><img src={logo} alt="Logo" className='w-28' /></Link>
                </div>
                <nav className="flex-1">
                    <ul className='space-y-3 mt-2'>
                        <li>
                            <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center p-4 hover:bg-violet-600 hover:text-white duration-200 ease-in ${activeTab === 'profile' ? 'text-white bg-violet-500 rounded-xl' : 'rounded-xl'}`}>
                                <FaUser className={`mr-3 ${activeTab === 'profile' ? 'text-white' : 'p-text'}`} /> Profile
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center p-4 hover:bg-violet-600 hover:text-white duration-200 ease-in ${activeTab === 'orders' ? 'text-white bg-violet-500 rounded-xl' : 'rounded-xl'}`}>
                                <FaShoppingCart className={`mr-3 ${activeTab === 'orders' ? 'text-white' : 'p-text'}`} /> Orders
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveTab('order-history')} className={`w-full flex items-center p-4 hover:bg-violet-600 hover:text-white duration-200 ease-in ${activeTab === 'order-history' ? 'text-white bg-violet-500 rounded-xl' : 'rounded-xl'}`}>
                                <FaHistory className={`mr-3 ${activeTab === 'order-history' ? 'text-white' : 'p-text'}`} /> Order History
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center p-4 hover:bg-violet-600 hover:text-white duration-200 ease-in ${activeTab === 'settings' ? 'text-white bg-violet-500 rounded-xl' : 'rounded-xl'}`}>
                                <IoSettings className={`mr-3 ${activeTab === 'settings' ? 'text-white' : 'p-text'}`} /> Settings
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white overflow-auto">
                {/* Mobile Sidebar Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-4 text-gray-800"
                    aria-label="Toggle sidebar"
                >
                    {isSidebarOpen ? <FaTimes size={24} className='fixed top-5 left-5 ' /> : <FaBars size={24} />}
                </button>

                <header className="flex justify-between items-center bg-white border-b p-6">
                    <h1 className="text-xl md:text-3xl font-bold ">Welcome, <span className='p-text'>{user.name}</span></h1>
                    <button onClick={logout} className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600">
                        <FaSignOutAlt />
                    </button>
                </header>

                {/* Render active tab content */}
                <section className="p-6 overflow-auto"> {/* Adjust height to fit header and footer */}
                    {activeTab === 'profile' && <UserProfile />}
                    {activeTab === 'orders' && <UserOrders />}
                    {activeTab === 'order-history' && <OrdersHistory/>}
                    {activeTab === 'settings' && <UserSettings />}
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
