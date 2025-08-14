import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homeee from './Homeee'; // Your Home component
import { CustomerProvider } from '../context/CustomerContext'; // Existing Customer Context
import { BillProvider } from '../context/billcontext'; // Existing Bill Context
import { ProductProvider } from '../context/ProductContext'; // <-- NEW: Import ProductProvider
import SignUp from "./signup";
import Login from "./login";
import CustomerDetails from "./CustomerDetail";
import BasicExample from './Nav';


function App() {
    return (
        <Router>
            <ProductProvider> {/* <-- Wrap with ProductProvider */}
                <CustomerProvider> {/* Existing context */}
                    <BillProvider> {/* Existing context */}
                        <BasicExample /> {/* Your navigation component */}
                        <Routes>
                            <Route path="/" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/home" element={<Homeee />} />
                            <Route path="/CustomerDetail" element={<CustomerDetails />} />
                        </Routes>
                    </BillProvider>
                </CustomerProvider>
            </ProductProvider>
        </Router>
    );
}

export default App;