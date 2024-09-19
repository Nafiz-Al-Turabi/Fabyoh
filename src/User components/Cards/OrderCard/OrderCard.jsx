import React from 'react';

const OrderCard = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg p-4 max-w-lg w-full mx-auto my-4">
      {/* Product Image */}
      <div className="md:w-1/3 w-full">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Product" 
          className="rounded-lg object-cover w-full h-32 md:h-auto"
        />
      </div>

      {/* Order Details */}
      <div className="md:w-2/3 w-full md:pl-4">
        <div className="mt-4 md:mt-0">
          {/* Product Name */}
          <h2 className="text-lg font-bold">Product Name</h2>

          {/* Price */}
          <p className="text-gray-600 text-sm mt-2">Price: $299.99</p>

          {/* Order Date */}
          <p className="text-gray-600 text-sm">Order Date: 2024-09-18</p>

          {/* Order Status */}
          <div className="mt-2">
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
              Pending
            </span>
          </div>

          {/* Actions */}
          <div className="flex mt-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded mr-2">
              View
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-4 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
