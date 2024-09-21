import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../Axios/axiosInstance";
const image_token = "6a61f4573470b3c2d847bbcd4cd9b15a";

const AddProduct = () => {
    const [isSubmitting, SetIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const token = localStorage.getItem("authToken");
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_token}`;

    const onSubmit = async (data) => {
        SetIsSubmitting(true);
        try {
            const imageFileMain = data.imageMain[0];
            const imageFileSecond = data.imageSecond?.[0];

            const formDataMain = new FormData();
            formDataMain.append("image", imageFileMain);

            const imageResponseMain = await fetch(image_hosting_url, {
                method: 'POST',
                body: formDataMain
            });
            const imageResultMain = await imageResponseMain.json();
            const ImageUrlMain = imageResultMain.data.url;

            let ImageUrlSecond = null;
            if (imageFileSecond) {
                const formDataSecond = new FormData();
                formDataSecond.append("image", imageFileSecond);

                const imageResponseSecond = await fetch(image_hosting_url, {
                    method: 'POST',
                    body: formDataSecond
                });
                const imageResultSecond = await imageResponseSecond.json();
                ImageUrlSecond = imageResultSecond.data.url;
            }

            const productData = {
                ...data,
                imageMain: ImageUrlMain,
                imageSecond: ImageUrlSecond || ""
            };

            const response = await axiosInstance.post('/addproduct', productData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // console.log(response.data);

        } catch (error) {
            console.error("Error adding product:", error);
        } finally {
            SetIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md border-t-4 border-violet-500">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Product Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="lg:flex gap-5">
                    <div className="lg:w-full">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            {...register("title", { required: "Title is required" })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter product title"
                        />
                        {errors.title && <span className="text-red-600">{errors.title.message}</span>}
                    </div>

                    <div className="lg:w-full">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("price", { required: "Price is required" })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter product price"
                        />
                        {errors.price && <span className="text-red-600">{errors.price.message}</span>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                    <input
                        type="number"
                        {...register("discount")}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter discount percentage"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Colors</label>
                    <select
                        multiple
                        {...register("colors", { required: "Select at least one color" })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="#000000">Black</option>
                        <option value="#ffffff">White</option>
                        <option value="#001f3f">Navy</option>
                        <option value="#6b8e23">Olive</option>
                        <option value="#808080">Gray</option>
                        <option value="#8b4513">Saddle Brown</option>
                    </select>
                    {errors.colors && <span className="text-red-600">{errors.colors.message}</span>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter product description"
                    ></textarea>
                    {errors.description && <span className="text-red-600">{errors.description.message}</span>}
                </div>

                <div className="lg:flex gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Main Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("imageMain", { required: "Main image is required" })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        {errors.imageMain && <span className="text-red-600">{errors.imageMain.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Secondary Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("imageSecond")}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        {...register("category", { required: "Category is required" })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="tshirts">T-Shirts</option>
                        <option value="jackets">Jackets</option>
                        <option value="pants">Pants</option>
                    </select>
                    {errors.category && <span className="text-red-600">{errors.category.message}</span>}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        {...register("in_stock")}
                        className="h-4 w-4 text-violet-600 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">In Stock</label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        {...register("trending")}
                        className="h-4 w-4 text-violet-600 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">Trending</label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        {...register("date", { required: "Date is required" })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {errors.date && <span className="text-red-600">{errors.date.message}</span>}
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition"
                        disabled={isSubmitting}
                    >
                        {
                            isSubmitting ? <div role="status">
                            <svg aria-hidden="true" class="inline w-16 h-6  text-gray-200 animate-spin dark:text-gray-600 fill-purple-50" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div> : 'Submit'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
