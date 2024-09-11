import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SignUp';
import Shirts from '../Pages/Shirts/Shirts';

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
        ]
    },
]);

export default router;