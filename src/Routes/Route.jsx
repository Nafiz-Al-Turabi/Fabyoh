import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import Shirts from '../Pages/Shirts/Shirts';
import TShirts from '../Pages/TShirts/TShirts';
import Hoodies from '../Pages/Hoodies/Hoodies';
import Jackets from '../Pages/Jackets/Jackets';
import ProductsDetails from '../Pages/ProductsDetails/ProductsDetails';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/shirts',
                element: <Shirts />
            },
            {
                path: '/tshirts',
                element: <TShirts />
            },
            {
                path: '/hoodies',
                element: <Hoodies />
            },
            {
                path: '/jackets',
                element: <Jackets />
            },
            {
                path: '/productDetails/:id',
                element: <ProductsDetails />,
                loader: ({ params }) => fetch('products.json')
            },
        ]
    },
]);

export default router;