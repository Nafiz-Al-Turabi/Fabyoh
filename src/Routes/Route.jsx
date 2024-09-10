import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';

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
        ]
    },
]);

export default router;