import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import { ListGroup, Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useProductContext } from '../context/ProductContext';
// import { useCustomerContext } from '../context/CustomerContext';
import "../css/Homeee.css";

function Homeee() {
    // const navigate = useNavigate();
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // updates every second

        return () => clearInterval(timer); // cleanup
    }, []);

    const [selectedTable, setSelectedTable] = useState(1);
    const [carts, setCarts] = useState({
        1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [],
    });

    const cart = carts[selectedTable];

    const addToCart = (product) => {
        setCarts(prevCarts => {
            const currentCart = prevCarts[selectedTable];
            const exists = currentCart.find(item => item._id === product._id);
            let updatedCart;

            if (exists) {
                updatedCart = currentCart.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCart = [...currentCart, { ...product, quantity: 1 }];
            }
            return { ...prevCarts, [selectedTable]: updatedCart };
        });
    };

    const removeFromCart = (_id) => {
        setCarts(prevCarts => ({
            ...prevCarts,
            [selectedTable]: prevCarts[selectedTable].filter(item => item._id !== _id),
        }));
    };

    const addQuantity = (item) => {
        setCarts(prevCarts => ({
            ...prevCarts,
            [selectedTable]: prevCarts[selectedTable].map(p =>
                p._id === item._id ? { ...p, quantity: p.quantity + 1 } : p
            ),
        }));
    };

    const subQuantity = (item) => {
        setCarts(prevCarts => ({
            ...prevCarts,
            [selectedTable]: prevCarts[selectedTable]
                .map(p => p._id === item._id ? { ...p, quantity: p.quantity - 1 } : p)
                .filter(p => p.quantity > 0),
        }));
    };

    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({
        1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null,
    });
    const [newCustomer, setNewCustomer] = useState({ name: '', phone: '' });
    // const { updateCustomerData, customerData } = useCustomerContext(); // customerData is not used, might be removed if not needed


    // Use product context for product data and search term
    const { searchTerm, setSearchTerm, allProducts, setAllProducts } = useProductContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Only fetch products if they haven't been loaded into the context yet
        if (!allProducts || Object.keys(allProducts).length === 0) {
            setIsLoading(true);
            axios.get("http://localhost:5009/allcoffee")
                .then(response => {
                    setAllProducts(response.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching products:", err);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false); // If products are already in context, set loading to false immediately
        }
        setSearchTerm('');
    }, [allProducts, setAllProducts, setSearchTerm]);


    // Filter products based on search term
    const filterProducts = (products, term) => {
        if (!term) return products;
        const lowerCaseTerm = term.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(lowerCaseTerm)
        );
    };

    // Helper function to render product categories
    // Now takes filtered items
    const renderCategory = (title, items = []) => {
        const filteredItems = filterProducts(items, searchTerm);
        if (filteredItems.length === 0 && searchTerm) {
            return null; // Don't render category if no matching products in search
        }
        return (
            <div id="home-col2">
                <h2 id="coffee-block-hed">{title}</h2>
                {filteredItems.map(product => (
                    <Button id="home-product-block" key={product._id} onClick={() => addToCart(product)}>
                        <Card id="card-box" style={{ width: '11.2rem' }}>
                            <img
                                id="home-product-block-img"
                                src={`data:image/jpeg;base64,${product.image}`}
                                alt={product.name}
                            />
                            <Card.Body id="card-body">
                                <Card.Title id="card-item-name">{product.name}</Card.Title>
                                <Card.Text id="card-item-price">Price: ₹{product.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Button>
                ))}
                {filteredItems.length === 0 && !searchTerm && (
                    <p>No products in this category.</p> // Only show this if not searching
                )}
            </div>
        );
    };

    // --- NEW: Render filtered products directly if a search term exists ---
    const renderFilteredProductsGlobally = () => {
        if (!searchTerm) {
            // If no search term, render all categories as usual
            return (
                <>
                    {renderCategory("Hot Coffee", allProducts.hotcoffee)}
                    {renderCategory("On The Rocks", allProducts.ontherocks)}
                    {renderCategory("Cold Coffee & Frappe", allProducts.coldcoffeefrappe)}
                    {renderCategory("Hot Chocolate", allProducts.hotchocolate)}
                    {renderCategory("Milk Shakes", allProducts.milkshakes)}
                    {renderCategory("Mocktails", allProducts.mocktails)}
                    {renderCategory("Smoothie Bowl", allProducts.smoothie)}
                    {renderCategory("Iced Tea", allProducts.icedtea)}
                </>
            );
        } else {
            // If there's a search term, flatten all products and then filter/render them
            const allFlattenedProducts = Object.values(allProducts).flat();
            const filtered = filterProducts(allFlattenedProducts, searchTerm);

            if (filtered.length === 0) {
                return <h3 className="text-center mt-5">No products found matching "{searchTerm}"</h3>;
            }

            return (
                <div id="home-col2" className="mt-4">
                    <h2 id="coffee-block-hed">Search Results for "{searchTerm}"</h2>
                    {filtered.map(product => (
                        <Button id="home-product-block" key={product._id} onClick={() => addToCart(product)}>
                            <Card id="card-box" style={{ width: '11.2rem' }}>
                                <img
                                    id="home-product-block-img"
                                    src={`data:image/jpeg;base64,${product.image}`}
                                    alt={product.name}
                                />
                                <Card.Body id="card-body">
                                    <Card.Title id="card-item-name">{product.name}</Card.Title>
                                    <Card.Text id="card-item-price">Price: ₹{product.price}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Button>
                    ))}
                </div>
            );
        }
    };

    const printRef = useRef();

    // Function to calculate super coins
    const calculateSuperCoins = (cartItems) => {
        const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        // Example: 1 super coin for every 100 rupees spent
        return Math.floor(totalAmount / 100);
    };

    const handlePlaceOrder = async () => {
        // Save the entered customer info to customerDetails state for the selected table
        setCustomerDetails(prev => ({
            ...prev,
            [selectedTable]: newCustomer,
        }));

        try {
            const calculatedSuperCoins = calculateSuperCoins(cart); // Calculate super coins here
            const orderPayload = {
                name: newCustomer.name,
                phone: newCustomer.phone,
                orderDetails: cart.map(item => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                superCoins: calculatedSuperCoins, // Send the calculated super coins
            };

            const response = await axios.post("http://localhost:5009/customer-order", orderPayload);
            console.log("Order placed successfully:", response.data);

            // Close the modal after successful order placement
            setShowCustomerModal(false);

            // Proceed with printing
            setTimeout(() => {
                const printContents = printRef.current.innerHTML;
                const originalContents = document.body.innerHTML;
                document.body.innerHTML = printContents;
                window.print();
                document.body.innerHTML = originalContents;
                window.location.reload(); // reload to restore everything
            }, 100); // 100ms delay to ensure state is set and backend call is made

        } catch (error) {
            console.error("Error placing order:", error);
            // You might want to show an error message to the user here
        }
    };


    return (
        <>
            {/* Customer Details Modal */}
            <Modal show={showCustomerModal} onHide={() => setShowCustomerModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {customerDetails[selectedTable] ? 'Edit Customer Details' : 'Add New Customer'} (Table {selectedTable})
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={newCustomer.name}
                            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                            type="tel"
                            className="form-control"
                            value={newCustomer.phone}
                            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>Cancel</Button>
                    <Button
                        variant="primary"
                        onClick={handlePlaceOrder} // Call the new handler
                    >
                        Save & Place Order
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Main Layout */}
            <Container id="home-body" fluid className="d-flex" style={{ height: "100vh" }}>
                <Row className="flex-grow-1 d-flex w-100" style={{ margin: 0 }}>
                    {/* Left Sidebar - Table Selection and Customer Details */}
                    <Col id="home-sec1" sm md="2">
                        <Row>
                            <ListGroup id="home-col1-table">
                                <ListGroup.Item id="home-col1-list1">
                                    <i id="menu-icon" className="fa-solid fa-bars fa-lg" style={{ color: "#000000" }}></i>
                                    <span id="home-col1-list-link1">Order Table</span>
                                </ListGroup.Item>
                                {/* Render table selection buttons */}
                                {[...Array(8)].map((_, idx) => (
                                    <ListGroup.Item
                                        id="home-col1-list"
                                        key={idx + 1}
                                        onClick={() => setSelectedTable(idx + 1)}
                                        style={{ backgroundColor: selectedTable === idx + 1 ? "#151515" : "" }}
                                    >
                                        <span id="home-col1-list-link">TABLE {idx + 1}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            {/* Display current customer details if available for the selected table */}
                            {customerDetails[selectedTable] && (
                                <ListGroup.Item id="home-col1-customer-detail">
                                    <strong>Customer:</strong> {customerDetails[selectedTable].name}<br />
                                    <strong>Phone:</strong> {customerDetails[selectedTable].phone}
                                </ListGroup.Item>
                            )}
                        </Row>
                    </Col>

                    {/* Middle Section - Coffee Categories and Items */}
                    <Col id="home-sec2" sm>
                        {/* Conditional rendering for loading state */}
                        {isLoading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                                <h2>Loading Products...</h2>
                            </div>
                        ) : (
                            renderFilteredProductsGlobally() // Use the new global rendering logic
                        )}
                    </Col>

                    {/* Right Sidebar - Cart Items */}
                    <Col id="home-sec3" sm md="4">
                        <div className="cart-container">
                            <h2 id="home-cart-heding">Cart Items (Table {selectedTable})</h2>

                            <div className="cart-items-scroll">
                                {cart.length === 0 ? (
                                    <p>Your cart is empty.</p>
                                ) : (
                                    cart.map((item) => (
                                        <Row key={item._id} className="mb-3 p-2 border rounded align-items-center" id="cart-item-box">
                                            <Col xs={6}>
                                                <h5>{item.name}</h5>
                                                <p>Price: ₹{item.price}</p>
                                                <p>Quantity: {item.quantity}</p>
                                            </Col>
                                            <Col xs={4} className="d-flex align-items-center gap-2" id="cart-add-sub-div">
                                                <Button id="add-sub" variant="outline-secondary" size="sm" onClick={() => subQuantity(item)}>-</Button>
                                                <span id="item-total-count"><strong>{item.quantity}</strong></span>
                                                <Button id="add-sub" variant="outline-secondary" size="sm" onClick={() => addQuantity(item)}>+</Button>
                                            </Col>
                                            <Col xs={2} className="text-end">
                                                <Button
                                                    id="delete-button"
                                                    variant="light"
                                                    size="sm"
                                                    onClick={() => removeFromCart(item._id)}
                                                    style={{ border: '1px solid #498050', color: '#498050' }}
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="text-end p-2" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                    Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                                </div>
                            )}

                            <Button
                                id="order-placed"
                                onClick={() => {
                                    // When opening the modal, pre-fill with existing customer details if available
                                    setNewCustomer(customerDetails[selectedTable] || { name: '', phone: '' });
                                    setShowCustomerModal(true);
                                }}
                                disabled={cart.length === 0}
                            >
                                Place Order
                            </Button>

                            {/* This is the single, corrected printRef div */}
                            <div ref={printRef} style={{ display: "none" }}>
                                <div
                                    style={{
                                        width: "58mm",
                                        fontFamily: "monospace",
                                        fontSize: "12px",
                                        whiteSpace: "pre-wrap",
                                        padding: "5px", // Added a small padding for better appearance
                                        boxSizing: "border-box" // Include padding in the width calculation
                                    }}
                                >
                                    <h2 style={{ textAlign: "center", margin: "5px 0" }}>Perkleaf Coffee</h2>
                                    <p style={{ textAlign: "center", fontSize: "10px", margin: "2px 0" }}>
                                        Address: Medical Chowk, Nagpur
                                    </p>


                                    <p style={{ textAlign: "center", fontSize: "10px", margin: "2px 0" }}>
                                        fssai - 21525077001084
                                    </p>


                                    <p style={{ margin: "2px 0" }}>Date: {currentDateTime.toLocaleDateString()} &nbsp;&nbsp;Time: {currentDateTime.toLocaleTimeString()}</p>
                                    <p style={{ margin: "2px 0" }}>Table: {selectedTable}</p>

                                    {customerDetails[selectedTable] && (
                                        <>
                                            <p style={{ margin: "2px 0" }}>Customer Name: {customerDetails[selectedTable].name}</p>
                                            <p style={{ margin: "2px 0" }}>Customer Phone: {customerDetails[selectedTable].phone}</p>
                                        </>
                                    )}

                                    <p style={{ borderBottom: "1px dashed #000", borderTop: "1px dashed #000", padding: "4px 0", margin: "5px 0", fontWeight: "bold" }}>
                                        Item &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Qty &nbsp;Price &nbsp;
                                    </p>

                                    {cart.map(item => (
                                        <p key={item._id} style={{ margin: "2px 0" }}>
                                            {item.name.slice(0, 15).padEnd(19)} {/* Adjust padding for item name */}
                                            {String(item.quantity).padEnd(5)}
                                            ₹{item.price.toFixed(2).padEnd(8)}
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    ))}

                                    <p style={{ borderTop: "1px dashed #000", borderBottom: "1px dashed #000", padding: "4px 0", margin: "5px 0", fontWeight: "bold" }}>
                                        Grand Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                                    </p>
                                    <p style={{ textAlign: "center", margin: "5px 0" }}>Thank You! Visit Again!</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Homeee;