// src/context/CustomerContext.js
import { createContext, useContext, useState } from 'react';

const CustomerContext = createContext();

export const useCustomerContext = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }) => {
    const [customerData, setCustomerData] = useState({});

    const updateCustomerData = (tableId, newData) => {
        setCustomerData(prev => ({
            ...prev,
            [tableId]: {
                ...prev[tableId],
                ...newData,
            },
        }));
    };

    return (
        <CustomerContext.Provider value={{ customerData, updateCustomerData }}>
            {children}
        </CustomerContext.Provider>
    );
};
