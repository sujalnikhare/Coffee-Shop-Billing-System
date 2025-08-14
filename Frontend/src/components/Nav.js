import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchInput from "../context/search-input"; // Assuming this component exists
import "../css/Nav.css"; // Link to the new CSS file
import Button from "react-bootstrap/Button";
import { useBill } from "../context/billcontext"; // Assuming this context exists
import { useNavigate, NavLink } from 'react-router-dom'; // Import NavLink for navigation
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'; // Import Row for grid layout
import logo from '../assets/images/coffee main logo.png' // Assuming logo path is correct
// import { useProductContext } from '../context/ProductContext'; // No longer needed directly here as SearchInput handles it

function BasicExample() {
    const { clearCart } = useBill();
    const navigate = useNavigate();
    // const { setSearchTerm } = useProductContext(); // Get setSearchTerm from context

    const CustomDetail = () => {
        navigate('/CustomerDetail');
    };

    return (
        <Navbar id="nav-shell" expand="lg" className="sticky-top bg-body-tertiary shadow-sm">
            <Container id="nav-container" fluid>
                {/* Logo and Brand */}
                <Col xs={4} md={2} lg={1} className="d-flex align-items-center">
                    <NavLink to="/home" className="navbar-brand d-flex align-items-center">
                        <Image id="coffee-main-logo" src={logo} roundedCircle />
                    </NavLink>

                </Col>

                {/* Search Input - Occupies more space on larger screens */}
                <Col xs={8} md={4} lg={3} className="d-flex justify-content-center justify-content-lg-start">
                    {/* Pass setSearchTerm to the SearchInput component */}
                    <SearchInput /> {/* SearchInput will now consume context directly */}
                </Col>

                {/* Navbar Toggler for mobile responsiveness */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Navbar Collapse for navigation items */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto w-100"> {/* ms-auto pushes content to the right */}
                        <Row className="w-100 justify-content-around align-items-center">
                            {/* Clear Cart Button */}
                            <Col xs={12} lg={2} className="my-2 my-lg-0 text-center">
                                <Button onClick={clearCart} id="Nav-clear-cart" className="w-100">Clear Cart</Button>
                            </Col>

                            {/* Add New Item Button with NavLink */}
                            <Col xs={12} lg={2} className="my-2 my-lg-0 text-center">
                                <NavLink to="/addnewitem" className="btn btn-primary w-100" id="Nav-Add-Item">
                                    + Add New Item
                                </NavLink>
                            </Col>

                            {/* Print Button */}
                            <Col xs={12} lg={1} className="my-2 my-lg-0 text-center">
                                <Button id="Nav-Print" className="w-100">
                                    <i className="fa-solid fa-print"></i> Print
                                </Button>
                            </Col>

                            {/* User Profile Button */}
                            <Col xs={12} lg={1} className="my-2 my-lg-0 text-center">
                                <Button style={{ borderRadius: "50%", padding: "0px" }} onClick={CustomDetail} className="p-2">
                                    <i className="fa-solid fa-circle-user" style={{ marginBottom: "100px" }}></i>
                                </Button>
                            </Col>


                        </Row>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;