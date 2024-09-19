import React from 'react';

const AdminOrderCard = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 container mx-auto border-t">
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4">
                <h2 className="text-xl font-bold">Order #12345</h2>
                <p className="text-gray-500 text-sm">Order Date: 2024-09-18</p>
            </div>

            {/* Order Details */}
            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center border-t border-gray-200 pt-4">
                {/* Customer Info */}
                <div className="md:w-1/3">
                    <h3 className="text-md font-semibold text-gray-700">Customer</h3>
                    <p className="text-gray-600">John Doe</p>
                    <p className="text-gray-500 text-sm">john.doe@example.com</p>
                </div>

                {/* Product Info */}
                <div className="md:w-1/3 mt-4 md:mt-0">
                    <h3 className="text-md font-semibold text-gray-700">Product</h3>
                    <p className="text-gray-600">Smartphone X</p>
                    <p className="text-gray-500 text-sm">Price: $899.99</p>
                </div>

                {/* Order Status */}
                <div className="md:w-1/3 mt-4 md:mt-0 flex md:justify-end">
                    <div>
                        <h3 className="text-md font-semibold text-gray-700">Status</h3>
                        <span className="px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                            Pending
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-6">
                {/* Approve Button */}
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
                    Approve
                </button>
                {/* Cancel Button */}
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
                    Cancel Order
                </button>
            </div>
        </div>
    );
};

export default AdminOrderCard;
