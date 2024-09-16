import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../Axios/axiosInstance';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axiosInstance.get('/userinfo', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => {
                    setUser(res.data)
                    console.log(res.data);
                })
                .catch(() => {
                    localStorage.removeItem('authToken');
                    setUser(null)
                })
                .finally(() => {
                    setLoading(false)
                })
            setUser(true);
        }
        setLoading(false)
    }, []);


    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/login', { email, password });
            if (response && response.data) {
                setSuccessMessage(response.data.message);
                setErrorMessage('');

                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                    console.log('Login successful. Token stored in localStorage.');
                    setUser(true)
                } else {
                    console.error('Token not found in response.');
                    setIsLoggedIn(false);
                }
            } else {
                console.error('Invalid response from server.');
            }
        } catch (error) {
            console.error('Error during login:', error.response?.data?.message || error.message);
            setErrorMessage(error.response?.data?.message || 'Login failed, please try again.');
            setErrorMessage('');
        }
    };

    const logout = () => {
        setLoading(true);
        setUser(false);
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