import React from 'react';
import { useForm } from 'react-hook-form';

const UpdateProductModal = ({ product, onClose, onUpdate, onDelete }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: product.title,
            price: product.price,
            discount: product.discount,
            description: product.description,
            category: product.category,
            in_stock: product.in_stock,
            imageMain: product.imageMain,
        }
    });

    const onSubmit = (data) => {
        onUpdate(data);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative shadow-lg border-t-4 border-green-100 m-4 lg:m-0">
                <h2 className="text-xl font-semibold mb-4">Update Product</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 lg:grid-cols-2 lg:gap-5'>

                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                        <input
                            {...register('title', { required: 'Title is required' })}
                            className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-green-300`}
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                        <input
                            type="number"
                            {...register('price', { required: 'Price is required' })}
                            className={`w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-green-300`}
                        />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>

                    {/* Discount */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Discount</label>
                        <input
                            type="number"
                            {...register('discount', { required: 'Discount is required' })}
                            className={`w-full px-3 py-2 border ${errors.discount ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-green-300`}
                        />
                        {errors.discount && <span className="text-red-500 text-sm">{errors.discount.message}</span>}
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                        <input
                            {...register('category', { required: 'Category is required' })}
                            className={`w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-green-300`}
                        />
                        {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
                    </div>

                    {/* Stock Status */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Stock Status</label>
                        <select
                            {...register('in_stock', { required: 'Stock status is required' })}
                            className={`w-full px-3 py-2 border ${errors.in_stock ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-green-300`}
                        >
                            <option value={true}>In Stock</option>
                            <option value={false}>Out of Stock</option>
                        </select>
                        {errors.in_stock && <span className="text-red-500 text-sm">{errors.in_stock.message}</span>}
                    </div>

                    {/* Description */}
                    <div className="mb-4 lg:col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            className={`w-full px-3 py-2 border resize-none h-20 lg:h-40 ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-green-300`}
                        />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end mt-6 lg:col-span-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-5 text-sm border border-gray-300 text-gray-500 px-4 py-2 rounded-md hover:text-white hover:shadow-lg hover:shadow-gray-500/80 duration-200 ease-in hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="text-sm border border-green-300 text-green-500 px-4 py-2 rounded-md hover:text-white hover:shadow-lg hover:shadow-green-500/80 duration-200 ease-in hover:bg-green-600 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductModal;
