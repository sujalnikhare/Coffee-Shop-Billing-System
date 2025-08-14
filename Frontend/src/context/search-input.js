// src/context/search-input.js (Updated or New)
import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useProductContext } from './ProductContext'; // Import the new context

const SearchInput = () => {
    const { searchTerm, setSearchTerm } = useProductContext();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <InputGroup className="mb-0 w-100"> {/* Adjusted margin and width for better fit */}
            <Form.Control
                placeholder="Search products..."
                aria-label="Search products"
                value={searchTerm}
                onChange={handleSearchChange}
                className="rounded-pill px-3" // Add some styling to make it look nice
                style={{ height: '40px' }} // Set a fixed height
            />
            <InputGroup.Text className="bg-white border-0 rounded-pill pe-3">
                <i className="fa-solid fa-magnifying-glass" style={{ color: "#498050" }}></i>
            </InputGroup.Text>
        </InputGroup>
    );
};

export default SearchInput;