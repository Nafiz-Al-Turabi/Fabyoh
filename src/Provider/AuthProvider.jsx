import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../Axios/axiosInstance';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        let isMounted = true;

        const loadUser = async () => {
            const token = localStorage.getItem('authToken');

            if (!token) {
                if (isMounted) {
                    setLoading(false);
                }
                return;
            }

            if (isMounted) {
                setLoading(true);
            }

            try {
                const res = await axiosInstance.get('/userinfo', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (isMounted) {
                    setUser(res.data);
                    setErrorMessage('');
                }
            } catch (error) {
                localStorage.removeItem('authToken');

                if (isMounted) {
                    setUser(null);
                    setErrorMessage('');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadUser();

        return () => {
            isMounted = false;
        }
    }, []);


    const login = async (email, password) => {
        setErrorMessage('');
        setSuccessMessage('');
        setLoading(true);

        try {
            const response = await axiosInstance.post('/login', { email, password });

            if (!response?.data?.token) {
                setErrorMessage('Login succeeded but no token was returned.');
                return false;
            }

            localStorage.setItem('authToken', response.data.token);
            setSuccessMessage(response.data.message || 'Login successful.');

            try {
                const userResponse = await axiosInstance.get('/userinfo', {
                    headers: { 'Authorization': `Bearer ${response.data.token}` }
                });
                setUser(userResponse.data);
            } catch (error) {
                setUser(response.data.user || null);
            }

            return true;
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed, please try again.';
            setErrorMessage(message);
            setUser(null);
            return false;
        } finally {
            setLoading(false);
        }
    };


    const logout = () => {
        setLoading(true);
        setUser(null);
        localStorage.removeItem('authToken');
        setSuccessMessage('');
        setErrorMessage('');
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
