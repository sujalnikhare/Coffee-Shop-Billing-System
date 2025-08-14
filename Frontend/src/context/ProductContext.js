// src/context/ProductContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const ProductContext = createContext();

// Create a custom hook to use the Product Context
export const useProductContext = () => {
    return useContext(ProductContext);
};

// Create the Product Provider component
export const ProductProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allProducts, setAllProducts] = useState({}); // This will store the fetched categorized products

    // This value object will be provided to all consumers
    const value = {
        searchTerm,
        setSearchTerm,
        allProducts,
        setAllProducts,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};