import React, { createContext, useContext, useState } from "react";

const BillContext = createContext();

export const useBill = () => useContext(BillContext);

export const BillProvider = ({ children }) => {
    const [bill, setBill] = useState([]);

    const addToCart = (product) => {
        setBill((prevBill) => {
            const existingProduct = prevBill.find((item) => item.id === product.id);

            if (existingProduct) {
                // Increase quantity if already in the cart
                return prevBill.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new product with quantity 1
                return [...prevBill, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setBill((prevBill) => prevBill.filter((item) => item.id !== id));
    };

    const addQuantity = (product) => {
        setBill((prevBill) =>
            prevBill.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const subQuantity = (product) => {
        setBill((prevBill) =>
            prevBill.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };

    const clearCart = () => {
        setBill([]);
      };
      

    return (
        <BillContext.Provider
            value={{ bill, addToCart, removeFromCart, addQuantity, subQuantity, clearCart }}
        >
            {children}
        </BillContext.Provider>
    );
};
