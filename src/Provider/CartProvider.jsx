import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (newItem) => {
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

        setCartItems(updatedCart);
    };
    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;