import React, { useContext, useState } from 'react';
import { FaUser, FaShoppingCart, FaHistory, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { IoSettings } from 'react-icons/io5';
import logo from './../../../assets/images/logo.webp';
import Loading from '../../../Components/Loading/Loading';
import UserSettings from '../../../User components/UserSettings/UserSettings';

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
        <div className="flex h-screen bg-gray-100 font-josefin">
            {/* Sidebar for Desktop */}
            <aside
                className={`fixed inset-y-0 left-0 bg-gray-700 text-white w-64 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:static md:w-64 md:flex md:flex-col`}
            >
                <div className="p-4 flex justify-center">
                    <img src={logo} alt="Logo" className='w-28' />
                </div>
                <nav className="flex-1">
                    <ul className='space-y-3 mt-2'>
                        <li>
                            <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center p-4 hover:bg-slate-500 ${activeTab === 'profile' ? 'bg-slate-500' : ''}`}>
                                <FaUser className="mr-3" /> Profile
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center p-4 hover:bg-slate-500 ${activeTab === 'orders' ? 'bg-slate-500' : ''}`}>
                                <FaShoppingCart className="mr-3" /> Orders
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveTab('order-history')} className={`w-full flex items-center p-4 hover:bg-slate-500 ${activeTab === 'order-history' ? 'bg-slate-500' : ''}`}>
                                <FaHistory className="mr-3" /> Order History
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center p-4 hover:bg-slate-500 ${activeTab === 'settings' ? 'bg-slate-500' : ''}`}>
                            <IoSettings className="mr-3" /> Settings
                            </button>
                        </li>
                        
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white">
                {/* Mobile Sidebar Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-4 text-gray-800"
                    aria-label="Toggle sidebar"
                >
                    {isSidebarOpen ? <FaTimes size={24} className='fixed top-5 left-5 text-white ' /> : <FaBars size={24} />}
                </button>

                <header className="flex justify-between items-center mb-6 bg-gray-800 p-6">
                    <h1 className="text-xl md:text-3xl font-bold text-white">Welcome, <span className='p-text'>{user.name}</span></h1>
                    <button onClick={logout} className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600">
                        <FaSignOutAlt />
                    </button>
                </header>

              

                {/* Render active tab content */}
                <section className="p-6">
                    {activeTab === 'profile' && <p>Your profile information will go here.</p>}
                    {activeTab === 'orders' && <p>Your orders will be displayed here.</p>}
                    {activeTab === 'order-history' && <p>Your order history will be displayed here.</p>}
                    {activeTab === 'settings' && <UserSettings/>}
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
