import { useQuery } from '@tanstack/react-query';
import React from 'react';
import ProductsCard from '../ProductsCard/ProductsCard';
import Loading from '../../Components/Loading/Loading';
import axiosInstance from '../../Axios/axiosInstance';

const Products = () => {
    const itemsPerPage = 5;
    const token = localStorage.getItem('authToken');
    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axiosInstance.get('/products', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response.data);
            return response.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-10'>
            {data.map(product => (
                <ProductsCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default Products;
