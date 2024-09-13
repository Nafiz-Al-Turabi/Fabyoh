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

     // Increase quantity of a cart item
     const increaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].totalItems += 1;
        updatedCart[index].totalPrice = updatedCart[index].totalItems * updatedCart[index].price;
        setCartItems(updatedCart);
    };

    // Decrease quantity of a cart item
    const decreaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].totalItems > 1) {
            updatedCart[index].totalItems -= 1;
            updatedCart[index].totalPrice = updatedCart[index].totalItems * updatedCart[index].price;
            setCartItems(updatedCart);
        }
    };

    // Remove item from cart
    const removeItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
        return totalPrice.toFixed(2);
    };
    return (
        <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, removeItem, calculateTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;