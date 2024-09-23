import React, { useState } from 'react';
import UpdateProductModal from '../UpdateProductModal/UpdateProductModal';
import axiosInstance from '../../Axios/axiosInstance';

const ProductCard = ({ product, refetch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = localStorage.getItem('authToken')
    const handleUpdate = async (updatedProduct) => {
        try {
            const response = await axiosInstance.put(
                `/products/${product._id}`,
                updatedProduct,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            if (response.status === 200) {
                console.log('Product updated successfully');
                refetch();
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const response = await axiosInstance.delete(`/products/${product._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                console.log('Product deleted successfully');
                refetch(); // Re-fetch products after deletion
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

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
        <div className="max-w-sm bg-white shadow-lg rounded-lg mx-auto">
            {/* Product Image */}
            <div className="w-full">
                <img
                    className="h-80 object-cover  w-full  rounded-xl"
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
                    {description.length > 100 ? `${description.slice(0, 60)}...` : description}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-sm border border-green-300 text-green-500 px-4 py-2 rounded-md hover:text-white hover:shadow-lg hover:shadow-green-500/80 duration-200 ease-in hover:bg-green-500 transition-colors"
                    >
                        Update
                    </button>
                    <button
                        onClick={handleDelete}
                        className="text-sm border border-red-300 text-red-500 px-4 py-2 rounded-md hover:text-white hover:shadow-lg hover:shadow-red-500/80 duration-200 ease-in hover:bg-red-600 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Update Modal */}
            {isModalOpen && (
                <UpdateProductModal
                    product={product}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default ProductCard;
