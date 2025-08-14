import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useProductContext } from '../context/ProductContext';
import { useCustomerContext } from '../context/CustomerContext';
import "../css/Homeee.css";




function Homeee() {
    const navigate = useNavigate();

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
    const { updateCustomerData, customerData } = useCustomerContext();




    const submitOrderToBackend = async (customerInfo) => {
        const orderItems = [...carts[selectedTable]]; // Current table's cart
        const coins = orderItems.reduce((total, item) => total + item.quantity, 0);

        const customerPayload = {
            name: customerInfo.name,
            phone: customerInfo.phone,
            superCoins: coins,
            orderDetails: orderItems,
        };

        // 👉 Print cart and customer info to terminal (console)
        console.log(`🛒 Submitting Order for Table ${selectedTable}`);
        console.log("Customer Info:", customerPayload.name, customerPayload.phone);
        console.log("Cart Items:");
        orderItems.forEach(item => {
            console.log(`- ${item.name} | Qty: ${item.quantity} | Price: ₹${item.price} | Total: ₹${item.quantity * item.price}`);
        });
        console.log("Total Coins (Items):", coins);
        console.log("------------------------------------------------");

        try {
            await axios.post("http://localhost:5001/customer-order", customerPayload);

            updateCustomerData(selectedTable, {
                name: customerInfo.name,
                phone: customerInfo.phone,
                order: orderItems,
                superCoins: (customerData[selectedTable]?.superCoins || 0) + coins,
            });

            printBill(orderItems, customerInfo);
            setCarts(prev => ({ ...prev, [selectedTable]: [] }));
            navigate('/CustomerDetail');
        } catch (error) {
            console.error("❌ Error submitting order to backend:", error);
            alert("❌ Failed to submit order. Please try again.");
        }
    };

    // const printRef = useRef();


    const submitAndPrintOrder = async (customerInfo) => {
        const orderItems = [...carts[selectedTable]];
        const coins = orderItems.reduce((total, item) => total + item.quantity, 0);

        const customerPayload = {
            name: customerInfo.name,
            phone: customerInfo.phone,
            superCoins: coins,
            orderDetails: orderItems,
        };

        // Construct summary string for alert
        let orderSummary = `🧾 Order Summary for Table ${selectedTable}\n\n`;
        orderSummary += `👤 Name: ${customerInfo.name}\n📞 Phone: ${customerInfo.phone}\n\n`;
        orderSummary += `🛒 Items:\n`;

        orderItems.forEach(item => {
            orderSummary += `- ${item.name} | Qty: ${item.quantity} | Price: ₹${item.price} | Total: ₹${item.quantity * item.price}\n`;
        });

        const totalAmount = orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
        orderSummary += `\n💰 Total Coins (Items): ${coins}`;
        orderSummary += `\n🧾 Total Amount: ₹${totalAmount}`;
        orderSummary += `\n\n✅ Submitting order...`;

        // Show alert with order summary
        alert(orderSummary);

        // Log (optional)
        console.log(`🛒 Submitting Order for Table ${selectedTable}`);
        console.log("Customer Info:", customerPayload.name, customerPayload.phone);
        console.log("Cart Items:");
        orderItems.forEach(item => {
            console.log(`- ${item.name} | Qty: ${item.quantity} | Price: ₹${item.price} | Total: ₹${item.quantity * item.price}`);
        });

        try {
            await axios.post("http://localhost:5001/customer-order", customerPayload);

            updateCustomerData(selectedTable, {
                name: customerInfo.name,
                phone: customerInfo.phone,
                order: orderItems,
                superCoins: (customerData[selectedTable]?.superCoins || 0) + coins,
            });

            // Automatically print bill from printRef
            const printContents = printRef.current.innerHTML;
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload(); // to restore original content

            // Clear cart & navigate
            setCarts(prev => ({ ...prev, [selectedTable]: [] }));
            navigate('/CustomerDetail');

        } catch (error) {
            console.error("❌ Error submitting order to backend:", error);
            alert("❌ Failed to submit order. Please try again.");
        }
    };



    // const handlePrint = () => {
    //     const printContents = printRef.current.innerHTML;
    //     const originalContents = document.body.innerHTML;
    //     document.body.innerHTML = printContents;
    //     window.print();
    //     document.body.innerHTML = originalContents;
    //     window.location.reload(); // to restore scripts etc
    // };

    const submitOrdertoAlert = async (customerInfo) => {
        const orderItems = [...carts[selectedTable]]; // Current table's cart
        const coins = orderItems.reduce((total, item) => total + item.quantity, 0);

        const handlePrint = () => {
            const printContents = printRef.current.innerHTML;
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload(); // to restore scripts etc
        };


        const customerPayload = {
            name: customerInfo.name,
            phone: customerInfo.phone,
            superCoins: coins,
            orderDetails: orderItems,
        };

        // 👉 Construct a detailed message string for the alert
        let orderSummary = `🧾 Order Summary for Table ${selectedTable}\n\n`;
        orderSummary += `👤 Name: ${customerInfo.name}\n📞 Phone: ${customerInfo.phone}\n\n`;
        orderSummary += `🛒 Items:\n`;

        orderItems.forEach(item => {
            orderSummary += `- ${item.name} | Qty: ${item.quantity} | Price: ₹${item.price} | Total: ₹${item.quantity * item.price}\n`;
        });

        const totalAmount = orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
        orderSummary += `\n💰 Total Coins (Items): ${coins}`;
        orderSummary += `\n🧾 Total Amount: ₹${totalAmount}`;
        orderSummary += `\n\n✅ Submitting order...`;

        // 👉 Show alert with all order details
        alert(orderSummary);

        // 👉 Log to console (optional)
        console.log(`🛒 Submitting Order for Table ${selectedTable}`);
        console.log("Customer Info:", customerPayload.name, customerPayload.phone);
        console.log("Cart Items:");
        orderItems.forEach(item => {
            console.log(`- ${item.name} | Qty: ${item.quantity} | Price: ₹${item.price} | Total: ₹${item.quantity * item.price}`);
        });
        console.log("Total Coins (Items):", coins);
        console.log("------------------------------------------------");

        try {
            await axios.post("http://localhost:5001/customer-order", customerPayload);

            updateCustomerData(selectedTable, {
                name: customerInfo.name,
                phone: customerInfo.phone,
                order: orderItems,
                superCoins: (customerData[selectedTable]?.superCoins || 0) + coins,

            });

            printBill(orderItems, customerInfo);
            setCarts(prev => ({ ...prev, [selectedTable]: [] }));
            navigate('/CustomerDetail');
        } catch (error) {
            console.error("❌ Error submitting order to backend:", error);
            alert("❌ Failed to submit order. Please try again.");
        }
    };



    const submitOrdertoAlertt = async (customerInfo) => {
        const orderItems = [...carts[selectedTable]];
        const coins = orderItems.reduce((total, item) => total + item.quantity, 0);
        const totalAmount = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

        const customerPayload = {
            name: customerInfo.name,
            phone: customerInfo.phone,
            superCoins: coins,
            orderDetails: orderItems,
        };

        try {
            // await axios.post("http://localhost:5001/customer-order", customerPayload);

            updateCustomerData(selectedTable, customerPayload, {
                name: customerInfo.name,
                phone: customerInfo.phone,
                order: orderItems,
                superCoins: (customerData[selectedTable]?.superCoins || 0) + coins,
            });

            setCarts(prev => ({ ...prev, [selectedTable]: [] }));

            // ✅ Print using thermal layout
            const printContents = printRef.current.innerHTML;
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload(); // reload to restore UI/scripts

            // navigate('/CustomerDetail');
        } catch (error) {
            console.error("❌ Error submitting order to backend:", error);
            alert("❌ Failed to submit order. Please try again.");
        }
    };



    const handleOrderSubmit = async () => {
        const currentCustomer = customerDetails[selectedTable];

        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before placing an order.");
            return;
        }

        if (!currentCustomer?.name || !currentCustomer?.phone) {
            // If customer details are missing, show the modal
            setNewCustomer({ // Pre-fill if there was a partial entry or existing customer
                name: currentCustomer?.name || '',
                phone: currentCustomer?.phone || ''
            });
            setShowCustomerModal(true);
        } else {
            // If customer details exist, proceed to submit
            await submitOrderToBackend(currentCustomer);
        }
    };

    // Handler for saving customer details from the modal
    const handleSaveCustomerDetails = async () => {
        if (!/^[6-9]\d{9}$/.test(newCustomer.phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        const updatedCustomer = { ...newCustomer };
        setCustomerDetails(prev => ({
            ...prev,
            [selectedTable]: updatedCustomer,
        }));
        setNewCustomer({ name: '', phone: '' }); // Clear newCustomer state
        setShowCustomerModal(false); // Close the modal

        // After updating customerDetails, now proceed to submit the order
        if (carts[selectedTable].length > 0) { // Check if there are items in the cart for the selected table
            await submitOrderToBackend(updatedCustomer);
        }
    };

    // Use product context for product data and search term
    const { searchTerm, setSearchTerm, allProducts, setAllProducts } = useProductContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Only fetch products if they haven't been loaded into the context yet
        if (!allProducts || Object.keys(allProducts).length === 0) {
            setIsLoading(true);
            axios.get("http://localhost:5001/allcoffee")
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


    //print Billing sys
    const printBill = (orderItems, currentCustomer) => {
        const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        axios.post("http://localhost:5001/print-bill", {
            table: selectedTable,
            customer: currentCustomer,
            items: orderItems,
            total: total
        }).then(res => {
            alert("🧾 Bill sent to printer successfully!");
        }).catch(err => {
            console.error("Error printing bill:", err);
            alert("❌ Failed to print bill.");
        });
    };


    const printRef = useRef();

    const handlePrint = () => {
        const printContents = printRef.current.innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // to restore scripts etc
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
                        onClick={handleSaveCustomerDetails} // Call the new handler
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

                            <div ref={printRef} style={{ display: "none" }}>
                                <div style={{
                                    width: "58mm",
                                    fontFamily: "monospace",
                                    fontSize: "12px",
                                    whiteSpace: "pre-wrap",
                                }}>
                                    <h3 style={{ textAlign: "center" }}>Shreyans POS80</h3>
                                    <p>-------------------------------</p>
                                    <p>Table: {selectedTable}</p>
                                    {/* <p>Name: {customerInfo.name}</p>
                                <p>Phone: {customerInfo.phone}</p> */}
                                    <p>-------------------------------</p>
                                    <p>Item        Qty  Price  Total</p>

                                    {customerDetails[selectedTable]?.map((item, index) => (
                                        <p key={index}>
                                            {item.name.padEnd(10)}
                                            {String(item.quantity).padEnd(5)}
                                            {String(item.price.toFixed(2)).padEnd(7)}
                                            {String((item.quantity * item.price).toFixed(2))}
                                        </p>
                                    ))}

                                    <p>-------------------------------</p>
                                    {/* <p>Total: {totalAmount.toFixed(2).padStart(23)}</p>
                                <p>Coins: {coins}</p> */}
                                    <p>-------------------------------</p>
                                    <p style={{ textAlign: "center" }}>Thank You!</p>
                                    <p style={{ textAlign: "center" }}>Visit Again!</p>
                                </div>
                            </div>

                            <div className="p-4">
                                <button
                                    onClick={handlePrint}
                                    className="bg-blue-500 text-white p-2 rounded"
                                >
                                    Print Receipt
                                </button>

                                <div ref={printRef} style={{ display: "none" }}>
                                    <div style={{
                                        width: "58mm",
                                        fontFamily: "monospace",
                                        fontSize: "12px"
                                    }}>
                                        <h3 style={{ textAlign: "center" }}>Shreyans POS80</h3>
                                        <p>-------------------------------</p>
                                        <p>Item        Qty   Price   Total</p>
                                        <p>Tea         2     10.00   20.00</p>
                                        <p>Coffee      1     15.00   15.00</p>
                                        <p>-------------------------------</p>
                                        <p>Total:                35.00</p>
                                        <p>Thank you for shopping!</p>
                                        <p>-------------------------------</p>
                                        <p style={{ textAlign: "center" }}>Visit Again!</p>
                                    </div>
                                </div>
                            </div>

                            {/* {cart.length > 0 && (
                                <div className="cart-bottom">
                                    <h3>Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
                                    <Button id="order-placed" onClick={submitOrdertoAlert}>Place Order</Button>
                                </div>
                            )} */}



                            {/* {cart.length > 0 && (
                                <div className="cart-bottom">
                                    <h3>Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
                                    <Button id="order-placed" onClick={submitOrdertoAlert}>Place Order</Button>
                                </div>
                            )} */}



                            <Button id="order-placed" onClick={handlePrint} >Place Orderrrr</Button>
                            <div ref={printRef} style={{ display: "none" }}>
                                <div style={{
                                    width: "60mm",
                                    fontFamily: "monospace",
                                    fontSize: "12px"
                                }}>
                                    <h3 style={{ textAlign: "center" }}>Perkleaf Coffee</h3>
                                    <p>-------------------------------</p>
                                    <p>Item             Qty   Price   Total</p>
                                    <p>Iced Americano   1     109.00  109.00</p>
                                    <p>Hazelnut         1     159.00  159.00</p>
                                    <p>-------------------------------</p>
                                    {cart.length > 0 && (
                                        <div className="cart-bottom" style={{
                                            width: "60mm",
                                            fontFamily: "monospace",
                                            fontSize: "12px"
                                        }}>
                                            <p style={{ width: "60mm", fontFamily: "monospace", fontSize: "12px" }}>Coffee Name{'\t'}Qty{'\t'}Price{'\t'}</p>

                                            <h3>Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
                                            {/* <Button id="order-placed" onClick={submitOrdertoAlert}>Place Order</Button> */}
                                        </div>
                                    )}
                                    <p>Total:                         268.00</p>
                                    <p>Thank you for shopping!</p>
                                    <p>-------------------------------</p>
                                    <p style={{ textAlign: "center" }}>Visit Again!</p>
                                </div>
                                <div className="cart-items-scroll">
                                    {cart.length === 0 ? (
                                        <p>Your cart is empty.</p>
                                    ) : (
                                        <>
                                            {/* Heading Row - Shown Only Once */}
                                            <Col xs={6}>
                                                <p
                                                    style={{
                                                        width: "80mm",
                                                        fontFamily: "monospace",
                                                        fontSize: "12px",
                                                        wordSpacing: "15px",
                                                        fontWeight: "bold",
                                                        borderBottom: "1px dashed #000",
                                                        paddingBottom: "4px"
                                                    }}
                                                >
                                                    Coffee_Name{'     '}Qty{'     '}Price
                                                </p>
                                            </Col>

                                            {/* Item List */}
                                            {cart.map((item) => (
                                                <Col xs={6} key={item._id}>
                                                    <p
                                                        style={{
                                                            width: "60mm",
                                                            fontFamily: "monospace",
                                                            fontSize: "12px",
                                                            wordSpacing: "15px",
                                                        }}
                                                    >
                                                        {item.name}{'\t'}{item.quantity}{'\t'}₹{item.price}
                                                    </p>
                                                    <p
                                                        style={{
                                                            width: "60mm",
                                                            fontFamily: "monospace",
                                                            fontSize: "12px",
                                                            wordSpacing: "35px",
                                                        }}
                                                    >
                                                        Item Total: ₹{item.quantity * item.price}
                                                    </p>
                                                </Col>
                                            ))}

                                            {/* Grand Total */}
                                            <Col xs={12}>
                                                <hr style={{ width: "60mm" }} />
                                                <p
                                                    style={{
                                                        width: "60mm",
                                                        fontFamily: "monospace",
                                                        fontSize: "14px",
                                                        fontWeight: "bold",
                                                        wordSpacing: "15px",
                                                    }}
                                                >
                                                    Grand Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                                                </p>
                                            </Col>
                                        </>
                                    )}
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