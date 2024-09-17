import React, { useContext, useState } from 'react';
import { FaUser, FaShoppingCart, FaHistory, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../../Provider/AuthProvider';
import { IoSettings } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import logo from './../../../assets/images/logo.webp'

const UserDashboard = () => {
    const { user,logout } = useContext(AuthContext)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100 font-josefin">
            {/* Sidebar for Desktop */}
            <aside
                className={`fixed inset-y-0 left-0 p-bg text-white w-64 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 md:static md:w-64 md:flex md:flex-col`}
            >
                <Link to='/' className="p-4 flex justify-center ">
                    <img src={logo} alt="" className='w-28' />
                </Link>
                <nav className="flex-1">
                    <ul>
                        <li className="">
                            <Link to='/' className="flex items-center p-4 hover:bg-violet-700">
                                <FaUser className="mr-3" /> Profile
                            </Link>
                        </li>
                        <li className="">
                            <Link to='/' className="flex items-center p-4 hover:bg-violet-700">
                                <FaShoppingCart className="mr-3" /> Orders
                            </Link>
                        </li>
                        <li className="">
                            <Link to='/' className="flex items-center p-4 hover:bg-violet-700">
                                <FaHistory className="mr-3" /> Order History
                            </Link>
                        </li>
                        <li className="">
                            <button onClick={()=>logout()} className="w-full flex items-center p-4 hover:bg-violet-700">
                                <FaSignOutAlt className="mr-3" /> Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white p-4 xl:p-6 ">
                {/* Mobile Sidebar Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-4 text-gray-800"
                    aria-label="Toggle sidebar"
                >
                    {isSidebarOpen ? <div>
                        <FaTimes size={24} className='fixed top-5 left-5 ' />
                    </div> : <FaBars size={24} />}
                </button>

                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-xl md:text-3xl font-bold">Welcome, <span className='p-text'>{user.name}</span></h1>
                    <button className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600">
                        <IoSettings />
                    </button>
                </header>

                {/* User Info */}
                <section className="mb-6">
                    <h2 className="text-base md:text-2xl font-semibold mb-4">Your Information</h2>
                    <div className="bg-gray-50 p-6 rounded">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Address:</strong>{user?.city}</p>
                        <p><strong>Post code:</strong>{user.postcode}</p>
                    </div>
                </section>

                {/* Recent Orders */}
                <section>
                    <h2 className="text-base md:text-2xl font-semibold mb-4">Recent Orders</h2>
                    <div className="bg-gray-50 p-6 rounded">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b text-xs">
                                    <th className="text-left p-2">Order ID</th>
                                    <th className="text-left p-2">Date</th>
                                    <th className="text-left p-2">Status</th>
                                    <th className="text-left p-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b text-xs hover:bg-gray-100">
                                    <td className="p-2">#12345</td>
                                    <td className="p-2">2024-09-15</td>
                                    <td className="p-2">Shipped</td>
                                    <td className="p-2">$99.99</td>
                                </tr>
                                {/* More orders can be added here */}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
