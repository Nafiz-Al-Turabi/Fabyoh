import React, { useEffect, useState } from 'react';
import FeaturedProductCard from '../Cards/FeaturedProductCard/FeaturedProductCard';


const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await fetch('/products.json')
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const result = await response.json()
            setProducts(result)
        } catch (error) {
            console.log('Failed to fetch products', error)
        }
    }
    return (
        <div className='max-w-[1360px] mx-auto my-40'>
            <h1 className='text-[26px] text-center mb-8 uppercase font-josefin font-bold mx-4 xl:mx-0 font-josefin'>Featured Products</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 mx-4 xl:mx-0'>
                {
                    products.map(product => <FeaturedProductCard key={product.id} product={product} />)
                }
            </div>
        </div>
    );
};

export default FeaturedProducts;