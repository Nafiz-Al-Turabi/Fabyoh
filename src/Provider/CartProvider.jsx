import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../Axios/axiosInstance';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAuthConfig = () => {
        const token = localStorage.getItem('authToken');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    const deleteCartItemFromServer = async (itemId) => {
        await axiosInstance.delete(`/carts/${itemId}`, getAuthConfig());
    };

    const fetchCartItems = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setCartItems([]);
            return;
        }

        try {
            setLoading(true);
            const response = await axiosInstance.get('/carts', getAuthConfig());
            setCartItems(response.data);
        } catch (error) {
            setError('Failed to load cart items from the server.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    // Add a new item to the cart and update the server
    const addToCart = async (newItem) => {
        const existingItemIndex = cartItems.findIndex(
            (item) => item.title === newItem.title && item.color === newItem.color && item.size === newItem.size
        );

        let updatedCart;

        if (existingItemIndex > -1) {
            // Update existing item's quantity and total price
            updatedCart = [...cartItems];
            updatedCart[existingItemIndex].totalItems += newItem.totalItems;
            updatedCart[existingItemIndex].totalPrice += newItem.totalPrice;
        } else {
            // Add new item to the cart
            updatedCart = [...cartItems, newItem];
        }

        try {
            // Send updated cart to the server
            await axiosInstance.post('/cart', newItem, getAuthConfig());
            setCartItems(updatedCart);
        } catch (error) {
            // console.error('Error adding to cart:', error.response || error.message);
            setError('Failed to update the cart on the server.');
        }
    };

    // Update cart item quantity on the server
    const updateCartItem = async (itemId, updateData) => {
        try {
            await axiosInstance.patch(`/cart/${itemId}`, updateData, getAuthConfig());
        } catch (error) {
            // console.error('Error updating cart item:', error.response || error.message);
            setError('Failed to update the cart item on the server.');
        }
    };

    const increaseQuantity = async (itemId) => {
        setCartItems(prevItems => {
            // Find the item to be updated
            const updatedItems = prevItems.map(item =>
                item._id === itemId
                    ? {
                        ...item,
                        totalItems: item.totalItems + 1,
                        totalPrice: item.price * (item.totalItems + 1)
                    }
                    : item
            );
            const updatedItem = updatedItems.find(item => item._id === itemId);

            // Update item on the server
            updateCartItem(itemId, {
                totalItems: updatedItem.totalItems,
                totalPrice: updatedItem.totalPrice
            });

            return updatedItems;
        });
    };

    const decreaseQuantity = async (itemId) => {
        setCartItems(prevItems => {
            // Find the item to be updated
            const updatedItems = prevItems.map(item =>
                item._id === itemId
                    ? {
                        ...item,
                        totalItems: Math.max(1, item.totalItems - 1),
                        totalPrice: item.price * Math.max(1, item.totalItems - 1)
                    }
                    : item
            );
            const updatedItem = updatedItems.find(item => item._id === itemId);

            // Update item on the server
            updateCartItem(itemId, {
                totalItems: updatedItem.totalItems,
                totalPrice: updatedItem.totalPrice
            });

            return updatedItems;
        });
    };



    // Remove item from the cart and update the server
    const removeItem = async (itemId) => {
        try {
            await deleteCartItemFromServer(itemId);
            setCartItems((prevItems) => prevItems.filter(item => item._id !== itemId));
        } catch (error) {
            console.error('Error removing item:', error.response || error.message);
            setError('Failed to remove the item from the server.');
        }
    };

    const clearCart = async () => {
        const token = localStorage.getItem('authToken');
        if (!token || cartItems.length === 0) {
            setCartItems([]);
            return;
        }

        try {
            await Promise.all(
                cartItems.map((item) => deleteCartItemFromServer(item._id))
            );

            setCartItems([]);
        } catch (error) {
            console.error('Error clearing cart items:', error.response || error.message);
            setError('Failed to clear cart items from the server.');
            throw error;
        }
    };

    // Calculate total price of the cart items
    const calculateTotalPrice = () => {
        const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
        return totalPrice.toFixed(2);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            removeItem,
            clearCart,
            calculateTotalPrice,
            loading,
            error
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
