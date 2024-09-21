import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../Axios/axiosInstance';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setLoading(true)
            axiosInstance.get('/userinfo', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => {
                    setUser(res.data);
                    setErrorMessage('')
                })
                .catch(() => {
                    localStorage.removeItem('authToken');
                    setUser(null)
                })
                .finally(() => {
                    setLoading(false)
                });
        } else {
            setLoading(false)
        }

    }, [user?.message]);


    const login = async (email, password) => {
        setErrorMessage('')
        setErrorMessage('');
        try {
            const response = await axiosInstance.post('/login', { email, password });
            if (response && response.data) {
                setSuccessMessage(response.data.message);

                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                    setUser(response.data)
                    setErrorMessage('');

                } else {
                    console.error('Token not found in response.');
                    setIsLoggedIn(false);
                }
            } else {
                console.error('Invalid response from server.');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Login failed, please try again.');
            setErrorMessage(message);
        }
    };


    const logout = () => {
        setLoading(true);
        setUser(null);
        localStorage.removeItem('authToken');
        setLoading(false);
    };

    const Information = {
        errorMessage,
        successMessage,
        login,
        logout,
        user,
        loading
    }
    return (
        <AuthContext.Provider value={Information}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;