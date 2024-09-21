import React from 'react';

const ProductCard = ({ product, onDelete, onUpdate }) => {
    const {
        title,
        price,
        discount,
        description,
        imageMain,
        category,
        in_stock,
    } = product;

    return (
        <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden mx-auto transform transition-transform hover:scale-105">
            {/* Product Image */}
            <div className="w-full">
                <img
                    className="h-48 w-full object-cover top"
                    src={imageMain}
                    alt={title}
                />
            </div>

            {/* Product Details */}
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{category}</p>

                {/* Price and Discount */}
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-gray-900">${price}</span>
                    {discount > 0 && (
                        <span className="text-sm bg-red-100 text-red-500 px-2 py-1 rounded">
                            {discount}% Off
                        </span>
                    )}
                </div>

                {/* Stock Status */}
                <p className={`mt-2 text-sm ${in_stock ? 'text-green-500' : 'text-red-500'}`}>
                    {in_stock ? 'In Stock' : 'Out of Stock'}
                </p>

                {/* Description */}
                <p className="text-gray-600 mt-4 text-sm">
                    {description.length > 100 ? `${description.slice(0, 100)}...` : description}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={onUpdate}
                        className="bg-green-500 text-white text-sm px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                    >
                        Update
                    </button>
                    <button
                        onClick={onDelete}
                        className="bg-red-500 text-white text-sm px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
