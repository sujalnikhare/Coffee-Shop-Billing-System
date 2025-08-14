import React from 'react';
import { useCustomerContext } from '../context/CustomerContext';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const CustomerDetails = () => {
    const { customerData } = useCustomerContext();

    return (
        <Container style={{ padding: "20px" }}>
            <h2 className="mb-4">Customer Details</h2>
            {Object.entries(customerData).map(([tableId, customer]) => (
                <Card key={tableId} className="mb-3">
                    <Card.Body>
                        <Row>
                            <Col md={4}>
                                <h4>Table {tableId}</h4>
                                <p><strong>Name:</strong> {customer.name}</p>
                                <p><strong>Phone:</strong> {customer.phone}</p>
                                <p><strong>Super Coins:</strong> {customer.superCoins || 0}</p>
                            </Col>
                            <Col md={8}>
                                <p><strong>Ordered Items:</strong></p>
                                <ListGroup>
                                    {customer.order?.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default CustomerDetails;
