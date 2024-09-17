import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { FcBarChart, FcCustomerSupport, FcPaid, FcShop } from "react-icons/fc";
import { IoIosSettings } from "react-icons/io";


const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex h-screen bg-gray-900/80">
            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`bg-gray-800 text-white w-64 fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:relative md:translate-x-0`}>
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
                    <nav>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700"><FcBarChart className="text-xl mr-5" /> Dashboard</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700"><FcShop className="text-xl mr-5" /> Products</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700"><FcPaid className="text-xl mr-5" /> Orders</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700"><FcCustomerSupport className="text-xl mr-5" /> Customers</a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700"><IoIosSettings className="text-xl mr-5" /> Settings</a></li>
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="bg-gray-700 shadow-md flex items-center justify-between p-4">
                    <button className="md:hidden text-gray-700" onClick={toggleSidebar}>
                        <FiMenu className="text-2xl" />
                    </button>
                    <h1 className="text-xl text-white font-semibold">Welcome, <span className="p-text">{user.name}</span> as <span className="uppercase text-sm border p-1 rounded">{user.role}</span></h1>
                    <button className="text-red-500 hover:text-red-700">
                        <FiLogOut onClick={() => logout()} className="text-2xl" />
                    </button>
                </header>

                {/* Dashboard Content */}
                <main className="p-6 flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-slate-800 text-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
                            <p className="text-2xl font-bold">$10,000</p>
                        </div>
                        <div className="bg-slate-800 text-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">New Orders</h3>
                            <p className="text-2xl font-bold">150</p>
                        </div>
                        <div className="bg-slate-800 text-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2">Total Products</h3>
                            <p className="text-2xl font-bold">500</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
