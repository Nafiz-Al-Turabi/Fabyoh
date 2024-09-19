import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { FcBarChart, FcCustomerSupport, FcPaid, FcShop } from "react-icons/fc";
import { IoIosSettings } from "react-icons/io";
import Customers from "../../../Admin components/Customers/Customers";
import Settings from "../../../Admin components/Settings/Settings";

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard");
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
        <div className="flex h-screen  font-josefin">
            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={`bg-gray-800 h-dvh text-white w-64 fixed inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:relative md:translate-x-0`}>
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-6 capitalize ">{user.role}</h2>
                    <div className="flex flex-col">
                        <button
                            className={`p-2 text-left flex items-center space-x-2 mt-2 ${activeTab === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                            onClick={() => setActiveTab("dashboard")}
                        >
                            <FcBarChart className="text-xl" />
                            <span>Dashboard</span>
                        </button>
                        <button
                            className={`p-2 text-left flex items-center space-x-2 mt-2 ${activeTab === "products" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                            onClick={() => setActiveTab("products")}
                        >
                            <FcShop className="text-xl" />
                            <span>Products</span>
                        </button>
                        <button
                            className={`p-2 text-left flex items-center space-x-2 mt-2 ${activeTab === "orders" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                            onClick={() => setActiveTab("orders")}
                        >
                            <FcPaid className="text-xl" />
                            <span>Orders</span>
                        </button>
                        <button
                            className={`p-2 text-left flex items-center space-x-2 mt-2 ${activeTab === "customers" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                            onClick={() => setActiveTab("customers")}
                        >
                            <FcCustomerSupport className="text-xl" />
                            <span>Customers</span>
                        </button>
                        <button
                            className={`p-2 text-left flex items-center space-x-2 mt-2 ${activeTab === "settings" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                            onClick={() => setActiveTab("settings")}
                        >
                            <IoIosSettings className="text-xl" />
                            <span>Settings</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="bg-gray-700 shadow-md flex items-center justify-between p-4">
                    <button className="md:hidden text-gray-100" onClick={toggleSidebar}>
                        <FiMenu className="text-2xl" />
                    </button>
                    <h1 className="text-xl text-white font-semibold">Welcome, <span className="p-text">{user.name}</span></h1>
                    <button className="text-red-500 hover:text-red-700">
                        <FiLogOut onClick={() => logout()} className="text-2xl" />
                    </button>
                </header>

                {/* Main Content */}
                <main className="p-6 flex-1 bg-white overflow-y-auto">
                    {activeTab === "dashboard" && (
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
                    )}
                    {activeTab === "products" && (
                        <div>
                            {/* Products content */}
                            <h2 className="text-2xl font-bold">Products Section</h2>
                        </div>
                    )}
                    {activeTab === "orders" && (
                        <div>
                            {/* Orders content */}
                            <h2 className="text-2xl font-bold">Orders Section</h2>
                        </div>
                    )}
                    {activeTab === "customers" && (
                        <div>
                            <Customers />
                        </div>
                    )}
                    {activeTab === "settings" && (
                        <div>
                            <Settings />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
