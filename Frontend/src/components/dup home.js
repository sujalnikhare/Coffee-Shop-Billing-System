import "../css/Homeee.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { useCustomerContext } from '../context/CustomerContext';



//1. hot coffee
import doppioImg from '../assets/images/1.Hot Coffee/1.doppio.png';
import americano from '../assets/images/1.Hot Coffee/2.americano.png';
import cappucino from '../assets/images/1.Hot Coffee/3.cappuccino.png';
import latte from '../assets/images/1.Hot Coffee/4.latte.png';
import flatwhite from '../assets/images/1.Hot Coffee/5.flat-white.png';
import irishcream from '../assets/images/1.Hot Coffee/6.irish-cream-latte.png';
import caramellatte from '../assets/images/1.Hot Coffee/7.caramel-latte.png';
import hazelnutlatte from '../assets/images/1.Hot Coffee/8.hazelnut-latte.png';
import vanillalatte from '../assets/images/1.Hot Coffee/9.vanilla-latte.png';
import cinnamonlatte from '../assets/images/1.Hot Coffee/10.cinnamon-latte.png';
import mocha from '../assets/images/1.Hot Coffee/11.mocha.png';
import nutellanutty from '../assets/images/1.Hot Coffee/12.nutella-nutty-latte.png';
import lotusbiscoff from '../assets/images/1.Hot Coffee/13.lotus-biscoff-latte.png';


//2.On The Rocks
import chilledamericano from '../assets/images/2.On The Rocks/1.Chilled Americano.png';
import sparklingcoldbrew from '../assets/images/2.On The Rocks/2.Sparkling Cold Brew.png';
import icedcoldbrew from '../assets/images/2.On The Rocks/3.Iced Cold Brew.png';
import energyrush from '../assets/images/2.On The Rocks/4.Energy Rush.png';
import icedtoniccoldbrew from '../assets/images/2.On The Rocks/5.Iced Tonic Cold Brew.png';
import gingeralecoldbrew from '../assets/images/2.On The Rocks/6.Ginger Ale Cold Brew.png';
import cranberrycoldbrew from '../assets/images/2.On The Rocks/7.Cranberry Cold Brew.png';
import orangecoldbrew from '../assets/images/2.On The Rocks/8.orange-cold-brew.png';
import icedtonicesspresso from '../assets/images/2.On The Rocks/9.Iced Tonic Esspresso.png';
import espressoking from '../assets/images/2.On The Rocks/10.Espresso King.png';


//3. Cold Coffee & Frappe
import classiccoldcoffee from '../assets/images/3.Cold Coffee Frappe/1.classsic_cold_coffee.png';
import icedcoffee from '../assets/images/3.Cold Coffee Frappe/2.iced_coffee.png';
import icedmocha from '../assets/images/3.Cold Coffee Frappe/3.iced_macha.png';
import coldcoffee from '../assets/images/3.Cold Coffee Frappe/4.cold-coffee-frappe.png';
import hazelutfrappe from '../assets/images/3.Cold Coffee Frappe/5.hazelnut_frappe.png';
import butterscotchfrappe from '../assets/images/3.Cold Coffee Frappe/6.Butterscotch Frappe.png';
import mochafrappe from '../assets/images/3.Cold Coffee Frappe/7.Mocha Frappe.png';
import caramelfrappe from '../assets/images/3.Cold Coffee Frappe/8.caramel_frappe.png';
import vanillafrappe from '../assets/images/3.Cold Coffee Frappe/9. vanilla_frappe.png';
import shortbreadcookiefrappe from '../assets/images/3.Cold Coffee Frappe/10.Short Bread Cookie Frappe.png';
import irishcreamfrappe from '../assets/images/3.Cold Coffee Frappe/11.irish_cream_frappe.png';
import lotusbiscofffrappe from '../assets/images/3.Cold Coffee Frappe/12.lotus-biscoff--frappe.png';
import nutellafrappe from '../assets/images/3.Cold Coffee Frappe/13.nutela_frappe.png';
import mochahazelbomb from '../assets/images/3.Cold Coffee Frappe/14.mocha-hazel-bomb.png';


//4. Hot Chocolate
import traditionalhotchocolate from '../assets/images/4.Hot Chocolate/1.traditional-hot-chocolate.png';
import nutellahotchocolate from '../assets/images/4.Hot Chocolate/2.nutella-hot-chocolate.png';
import hotchocolatewithbrownie from '../assets/images/4.Hot Chocolate/3.hot-chocolate-brownie.png';
import nutellahotchocolatewithbrownie from '../assets/images/4.Hot Chocolate/4.Nutella Hot Chocolate With Brownie.png';


//5. Milk Shakes
import strawberryshake from '../assets/images/5.Milk Shakes/1.strawbery-shake.png';
import strawberryoreoshake from '../assets/images/5.Milk Shakes/2.strawbery-oreo.png';
import chocolateshake from '../assets/images/5.Milk Shakes/3.chocolate-shake.png';
import chocohazelnutshake from '../assets/images/5.Milk Shakes/4.choco-hazelnut.png';
import blueberryshake from '../assets/images/5.Milk Shakes/5.blueberry-shake.png';
import mangoshake from '../assets/images/5.Milk Shakes/6.mango-shake.png';
import blueberrycheesecakeshake from '../assets/images/5.Milk Shakes/7.bluebery-cheesecake.png';
import mixberryshake from '../assets/images/5.Milk Shakes/8.mix-berry.png';
import kiwibananashake from '../assets/images/5.Milk Shakes/9.Kiwi Banana Shake.png';
import brownieshake from '../assets/images/5.Milk Shakes/10.Brownie Shake.png';


//6. Mocktail
import classicmintmOjito from '../assets/images/6.Mocktails/1.Classic Mint MOjito.png';
import bluelagoonmOjito from '../assets/images/6.Mocktails/2.Blue Lagoon MOjito.png';
import greenapplemOjito from '../assets/images/6.Mocktails/3.Green Apple MOjito.png';
import peachmOjito from '../assets/images/6.Mocktails/4.Peach MOjito.png';
import cranberrystrawberry from '../assets/images/6.Mocktails/5.Cranberry Strawberry.png';
import orangemixberrymOjito from '../assets/images/6.Mocktails/6.Orange Mix Berry MOjito.png';


//7.Smoothie
import smoothiebowl from '../assets/images/7.Smoothie Bowl/1.smoothie-bowl.png';


//8. Iced Tea
import lemonicedtea from '../assets/images/8.Iced Tea/1.Lemon Iced Tea.png';
import peachicedtea from '../assets/images/8.Iced Tea/2.peach_tea.png';
import kiwiicedtea from '../assets/images/8.Iced Tea/3.Kiwi Iced Tea.png';
import strawberryicedtea from '../assets/images/8.Iced Tea/4.strawberry_tea.png';
import greenappleicedtea from '../assets/images/8.Iced Tea/5.Green Apple Iced Tea.png';

function Homeee() {

    const hotcoffee = [
        { id: 1, name: "Doppio", price: 109.00, image: doppioImg },
        { id: 2, name: "Americano", price: 119.00, image: americano },
        { id: 3, name: "Cappucino", price: 149.00, image: cappucino },
        { id: 4, name: "Latte", price: 149.00, image: latte },
        { id: 5, name: "Flat White", price: 149.00, image: flatwhite },
        { id: 6, name: "Irish Cream Latte", price: 159.00, image: irishcream },
        { id: 7, name: "Caramel Latte", price: 149.00, image: caramellatte },
        { id: 8, name: "Hazelnut Latte", price: 159.00, image: hazelnutlatte },
        { id: 9, name: "Vanilla Latte", price: 159.00, image: vanillalatte },
        { id: 10, name: "Cinnamon Latte", price: 159.00, image: cinnamonlatte },
        { id: 11, name: "Mocha", price: 159.00, image: mocha },
        { id: 12, name: "Nutella Nutty Latte", price: 179.00, image: nutellanutty },
        { id: 13, name: "Lotus Biscoff Latte", price: 179.00, image: lotusbiscoff },
    ];

    const ontherocks = [
        { id: 14, name: "Chilled Americano", price: 139.00, image: chilledamericano },
        { id: 15, name: "Sparkling Cold Brew", price: 169.00, image: sparklingcoldbrew },
        { id: 16, name: "Iced Cold Brew", price: 169.00, image: icedcoldbrew },
        { id: 17, name: "Energy Rush", price: 189.00, image: energyrush },
        { id: 18, name: "Iced Tonic Cold Brew", price: 199.00, image: icedtoniccoldbrew },
        { id: 19, name: "Ginger Ale Cold Brew", price: 189.00, image: gingeralecoldbrew },
        { id: 20, name: "Cranberry Cold Brew", price: 189.00, image: cranberrycoldbrew },
        { id: 21, name: "Orange Cold Brew", price: 180.00, image: orangecoldbrew },
        { id: 22, name: "Iced Tonic Esspresso", price: 199.00, image: icedtonicesspresso },
        { id: 23, name: "Espresso King", price: 199.00, image: espressoking },
    ];

    const coldcoffeefrappe = [
        { id: 24, name: "Classic Cold Coffee", price: 159.00, image: classiccoldcoffee },
        { id: 25, name: "Iced Coffee", price: 159.00, image: icedcoffee },
        { id: 26, name: "Iced Mocha", price: 169.00, image: icedmocha },
        { id: 27, name: "Cold Coffee Frappe", price: 169.00, image: coldcoffee },
        { id: 28, name: "Hazelut Frappe", price: 179.00, image: hazelutfrappe },
        { id: 29, name: "Butterscotch Frappe", price: 179.00, image: butterscotchfrappe },
        { id: 30, name: "Mocha Frappe", price: 179.00, image: mochafrappe },
        { id: 31, name: "Caramel Frappe", price: 179.00, image: caramelfrappe },
        { id: 32, name: "Vanilla Frappe", price: 179.00, image: vanillafrappe },
        { id: 33, name: "Short Bread Cookie Frappe", price: 179.00, image: shortbreadcookiefrappe },
        { id: 34, name: "Irish Cream Frappe", price: 179.00, image: irishcreamfrappe },
        { id: 35, name: "Lotus Biscoff Frappe", price: 209.00, image: lotusbiscofffrappe },
        { id: 36, name: "Nutella Frappe", price: 209.00, image: nutellafrappe },
        { id: 37, name: "Mocha Hazel Bomb", price: 240.00, image: mochahazelbomb },
    ];

    const hotchocolate = [
        { id: 38, name: "Traditional Hot Chocolate", price: 159.00, image: traditionalhotchocolate },
        { id: 39, name: "Nutella Hot Chocolate", price: 169.00, image: nutellahotchocolate },
        { id: 40, name: "Hot Chocolate With Brownie", price: 189.00, image: hotchocolatewithbrownie },
        { id: 41, name: "Nutella Hot Chocolate With Brownie", price: 199.00, image: nutellahotchocolatewithbrownie },
    ];

    const milkshakes = [
        { id: 42, name: "Strawberry Shake", price: 159.00, image: strawberryshake },
        { id: 43, name: "Strawberry Oreo Shake", price: 179.00, image: strawberryoreoshake },
        { id: 44, name: "Chocolate Shake", price: 169.00, image: chocolateshake },
        { id: 45, name: "Choco Hazelnut Shake", price: 189.00, image: chocohazelnutshake },
        { id: 46, name: "Blueberry Shake", price: 159.00, image: blueberryshake },
        { id: 47, name: "Mango Shake", price: 159.00, image: mangoshake },
        { id: 48, name: "Blueberry Cheesecake Shake", price: 189.00, image: blueberrycheesecakeshake },
        { id: 49, name: "Mix Berry Shake", price: 179.00, image: mixberryshake },
        { id: 50, name: "Kiwi Banana Shake", price: 179.00, image: kiwibananashake },
        { id: 51, name: "Brownie Shake", price: 220.00, image: brownieshake },
    ];

    const mocktails = [
        { id: 52, name: "Classic Mint MOjito", price: 160.00, image: classicmintmOjito },
        { id: 53, name: "Blue Lagoon MOjito", price: 160.00, image: bluelagoonmOjito },
        { id: 54, name: "Green Apple MOjito", price: 160.00, image: greenapplemOjito },
        { id: 55, name: "Peach MOjito", price: 160.00, image: peachmOjito },
        { id: 56, name: "Cranberry Strawberry", price: 180.00, image: cranberrystrawberry },
        { id: 57, name: "Orange Mix Berry MOjito", price: 180.00, image: orangemixberrymOjito },
    ];

    const smoothie = [
        { id: 58, name: "Smoothie Bowl", price: 250.00, image: smoothiebowl },
    ];

    const icedtea = [
        { id: 59, name: "Lemon Iced Tea", price: 120.00, image: lemonicedtea },
        { id: 60, name: "Peach Iced Tea", price: 130.00, image: peachicedtea },
        { id: 61, name: "Kiwi Iced Tea", price: 130.00, image: kiwiicedtea },
        { id: 62, name: "Strawberry Iced Tea", price: 130.00, image: strawberryicedtea },
        { id: 63, name: "Green Apple Iced Tea", price: 130.00, image: greenappleicedtea },
    ];






    //manage selected table (default to 1)
    const [selectedTable, setSelectedTable] = useState(1);

    // store cart for each table
    const [carts, setCarts] = useState({
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
    });

    // Get cart for current table
    const cart = carts[selectedTable];

    const addToCart = (product) => {
        setCarts(prevCarts => {
            //card updating system
            const currentCart = prevCarts[selectedTable];
            const exists = currentCart.find(item => item.id === product.id);
            let updatedCart;

            if (exists) {
                updatedCart = currentCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCart = [...currentCart, { ...product, quantity: 1 }];
            }

            return { ...prevCarts, [selectedTable]: updatedCart };
        });
    };

    const removeFromCart = (id) => {
        setCarts(prevCarts => ({
            ...prevCarts,
            [selectedTable]: prevCarts[selectedTable].filter(item => item.id !== id),
        }));
    };

    const addQuantity = (item) => {
        setCarts(prevCarts => ({
            ...prevCarts,
            [selectedTable]: prevCarts[selectedTable].map(p =>
                p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
        }));
    };

    const subQuantity = (item) => {
        setCarts(prevCarts => ({
            ...prevCarts,
            [selectedTable]: prevCarts[selectedTable]
                .map(p => p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p)
                .filter(p => p.quantity > 0),
        }));
    };


    const [showBill, setShowBill] = useState(false);
    const BillSubmit = () => {
        setShowBill(true); // Show bill modal
    };


    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({
        1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null,
    });
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        phone: '',
    });

    const { updateCustomerData, customerData } = useCustomerContext();




    return (
        <>


            <Modal show={showCustomerModal} onHide={() => setShowCustomerModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Customer (Table {selectedTable})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
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
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => {
                        setCustomerDetails(prev => ({
                            ...prev,
                            [selectedTable]: newCustomer,
                        }));
                        setNewCustomer({ name: '', phone: '' });
                        setShowCustomerModal(false);
                    }}>
                        Save Customer
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showBill} onHide={() => setShowBill(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Bill for Table {selectedTable}</Modal.Title>
                </Modal.Header>
                <Modal.Body id="print-section">
                    {cart.map((item) => (
                        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                            <div>{item.name} (x{item.quantity})</div>
                            <div>₹{item.price * item.quantity}</div>
                        </div>
                    ))}
                    <hr />
                    <h4>Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowBill(false)}>Close</Button>
                    <Button variant="primary" onClick={() => {
                        const orderItems = [...cart];
                        const coins = orderItems.reduce((total, item) => total + item.quantity, 0);

                        updateCustomerData(selectedTable, {
                            name: customerDetails[selectedTable]?.name || '',
                            phone: customerDetails[selectedTable]?.phone || '',
                            order: orderItems,
                            superCoins: (customerData[selectedTable]?.superCoins || 0) + coins,
                        });

                        window.print();
                        setShowBill(false);
                        setCarts(prev => ({ ...prev, [selectedTable]: [] }));
                    }}>
                        Print Bill
                    </Button>
                </Modal.Footer>
            </Modal>






            <Container id="home-body" fluid className="d-flex" style={{ height: "100vh" }}>
                <Row className="flex-grow-1 d-flex w-100" style={{ margin: 0 }}>
                    <Col id="home-sec1" sm md="2">
                        <Row >
                            <ListGroup id="home-col1-table">
                                <ListGroup.Item id="home-col1-list1">
                                    <i id="menu-icon" className="fa-solid fa-bars fa-lg" style={{ color: "#000000" }}></i>
                                    <span id="home-col1-list-link1" to="/">Order Table</span>
                                </ListGroup.Item>
                                {[...Array(8)].map((_, idx) => (
                                    <ListGroup.Item
                                        id="home-col1-list"
                                        key={idx + 1}
                                        onClick={() => setSelectedTable(idx + 1)}
                                        style={{ backgroundColor: selectedTable === idx + 1 ? "#151515" : "" }}
                                    >
                                        <Link id="home-col1-list-link" to="#">TABLE {idx + 1}</Link>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <ListGroup.Item id="home-col1-list-new-customer" style={{ textAlign: "center", marginTop: "10px" }}>
                                <Button id="new-customer-button" variant="success" onClick={() => setShowCustomerModal(true)}>+ New Customer</Button>
                            </ListGroup.Item>
                            {customerDetails[selectedTable] && (
                                <ListGroup.Item id="home-col1-customer-detail" >
                                    <strong>Customer:</strong> {customerDetails[selectedTable].name}<br />
                                    <strong>Phone:</strong> {customerDetails[selectedTable].phone}
                                </ListGroup.Item>
                            )}
                        </Row>
                    </Col>

                    <Col id="home-sec2" sm>

                        <div id="home-col1">
                            <h2 id="coffee-block-hed">Hot Coffee</h2>
                            {hotcoffee.map((product) => (
                                <Button id="home-product-block" key={product.id} onClick={() => addToCart(product)}>
                                    <Card id="cart-box" style={{ width: '13rem' }}>
                                        <img id="home-product-block-img" src={product.image} alt={product.name} />
                                        <Card.Body id="card-body">
                                            <Card.Title id="card-item-name">{product.name}</Card.Title>
                                            <Card.Text id="card-item-price">Price: ₹{product.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Button>
                            ))}
                        </div>

                        <div id="home-col1">
                            <h2 id="coffee-block-hed">On The Rocks</h2>
                            {ontherocks.map((product) => (
                                <Button id="home-product-block" key={product.id} onClick={() => addToCart(product)}>
                                    <Card id="cart-box" style={{ width: '13rem' }}>
                                        <img id="home-product-block-img" src={product.image} alt={product.name} />
                                        <Card.Body id="card-body">
                                            <Card.Title id="card-item-name">{product.name}</Card.Title>
                                            <Card.Text id="card-item-price">Price: ₹{product.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Button>
                            ))}
                        </div>

                        <div id="home-col2">
                            <h2 id="coffee-block-hed">Cold Coffee & Frappe</h2 >
                            {coldcoffeefrappe.map((product) => (
                                <Button id="home-product-block" key={product.id} onClick={() => addToCart(product)}>
                                    <Card id="cart-box" style={{ width: '13rem' }}>
                                        <img id="home-product-block-img" src={product.image} alt={product.name} />
                                        <Card.Body id="card-body">
                                            <Card.Title id="card-item-name">{product.name}</Card.Title>
                                            <Card.Text id="card-item-price">Price: ₹{product.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Button>
                            ))}
                        </div>

                        <div id="home-col2">
                            <h2 id="coffee-block-hed">Hot Chocolate</h2 >
                            {hotchocolate.map((product) => (
                                <Button id="home-product-block" key={product.id} onClick={() => addToCart(product)}>
                                    <Card id="cart-box" style={{ width: '13rem' }}>
                                        <img id="home-product-block-img" src={product.image} alt={product.name} />
                                        <Card.Body id="card-body">
                                            <Card.Title id="card-item-name">{product.name}</Card.Title>
                                            <Card.Text id="card-item-price">Price: ₹{product.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Button>
                            ))}
                        </div>

                        <div id="home-col2">
                            <h2 id="coffee-block-hed">Milk Shakes</h2 >
                            {milkshakes.map((product) => (
                                <Button id="home-product-block" key={product.id} onClick={() => addToCart(product)}>
                                    <Card id="cart-box" style={{ width: '13rem' }}>
                                        <img id="home-product-block-img" src={product.image} alt={product.name} />
                                        <Card.Body id="card-body">
                                            <Card.Title id="card-item-name">{product.name}</Card.Title>
                                            <Card.Text id="card-item-price">Price: ₹{product.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Button>
                            ))}
                        </div>

                        <div id="home-col2">
                            <h2 id="coffee-block-hed">Mocktails</h2 >
                            {mocktails.map((product) => (
                                <Button id="home-product-block" key={product.id} onClick={() => addToCart(product)}>
                                    <Card id="cart-box" style={{ width: '13rem' }}>
                                        <img id="home-product-block-img" src={product.image} alt={product.name} />
                                        <Card.Body id="card-body">
                                            <Card.Title id="card-item-name">{product.name}</Card.Title>
                                            <Card.Text id="card-item-price">Price: ₹{product.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Button>
                            ))}
                        </div>

                        <div id="home-col2">
                            <h2 id="coffee-block-hed">Smoothie Bowl</h2 >
                            {smoothie.map((product) => (
                                <Button id="home-product-block" key={product.id} onClick={() => addToCart(product)}>
                                    <Card id="cart-box" style={{ width: '13rem' }}>
                                        <img id="home-product-block-img" src={product.image} alt={product.name} />
                                        <Card.Body id="card-body">
                                            <Card.Title id="card-item-name">{product.name}</Card.Title>
                                            <Card.Text id="card-item-price">Price: ₹{product.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Button>
                            ))}
                        </div>

                        <div id="home-col2">
                            <h2 id="coffee-block-hed">Iced Tea</h2 >
                            {icedtea.map((product) => (
                                <Button id="home-product-block" key={product.id} onClick={() => addToCart(product)}>
                                    <Card id="cart-box" style={{ width: '13rem' }}>
                                        <img id="home-product-block-img" src={product.image} alt={product.name} />
                                        <Card.Body id="card-body">
                                            <Card.Title id="card-item-name">{product.name}</Card.Title>
                                            <Card.Text id="card-item-price">Price: ₹{product.price}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Button>
                            ))}
                        </div>
                    </Col>

                    <Col id="home-sec3" sm md="4">
                        <div className="cart-container">
                            <h2 id="home-cart-heding">Cart Items (Table {selectedTable})</h2>
                            <div className="cart-scroll">
                                {cart.length === 0 ? (
                                    <p>Your cart is empty.</p>
                                ) : (
                                    <>
                                        {cart.map((item) => (
                                            <Row key={item.id} className="mb-3 p-2 border rounded align-items-center" id="cart-item-box">
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
                                                    <Button id="delete-button" variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
                                                        <i className="fa-solid fa-trash" style={{ color: "#498050" }}></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        ))}
                                    </>
                                )}
                            </div>
                            {cart.length > 0 && (
                                <>
                                    <h3>Total: ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
                                    <Button id="order-placed" onClick={BillSubmit}>Place Order</Button>
                                </>
                            )}
                        </div>
                    </Col>

                </Row>
            </Container>
        </>
    );
}

export default Homeee;