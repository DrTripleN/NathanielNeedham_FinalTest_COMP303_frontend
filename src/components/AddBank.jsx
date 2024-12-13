import { useState } from "react";
import { Button, Form, Row, Col, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import '../styles/bankui.css';

function AddBank() {
    const [bankData, setBankFormData] = useState({
        bankName: '',
        bankYear: '',
        bankEmp: '',
        bankAddress: '',
        bankBranches: '',
        bankATMs: ''
    });


    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const instance = axios.create({
        baseURL: 'http://localhost:8763/api/', // Set your backend base URL
    });
    const handleReset = () => {
        setBankFormData({
            bankName: '',
            bankYear: '',
            bankEmp: '',
            bankAddress: '',
            bankBranches: '',
            bankATMs: ''
        });
        setError('');
        setSuccess('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Sending bank data:', bankData);
            const response = await instance.post("banks/add", bankData);
            console.log('Response:', response.data); // Log the response

            setSuccess('Bank added successfully!');
            setBankFormData({
                bankName: '',
                bankYear: '',
                bankEmp: '',
                bankAddress: '',
                bankBranches: '',
                bankATMs: ''
            });
            setError('');
        } catch (error) {
            console.error('Error adding bank:', error);
            setError('Error adding bank, please try again.');
            setSuccess('');
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="translucent-form">
                        <Card.Body>
                            <h3 className="mb-4 text-center">Add Bank</h3>

                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="bankName" className="my-3">
                                    <Form.Label>Bank Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter the bank name"
                                        value={bankData.bankName}
                                        onChange={(e) => setBankFormData({ ...bankData, bankName: e.target.value })}
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="bankYear" className="my-3">
                                            <Form.Label>Bank Established Year</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter the bank's established year"
                                                value={bankData.bankYear}
                                                onChange={(e) => setBankFormData({ ...bankData, bankYear: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="bankEmp" className="my-3">
                                            <Form.Label>Number of Employees</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter the number of employees"
                                                value={bankData.bankEmp}
                                                onChange={(e) => setBankFormData({ ...bankData, bankEmp: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId="bankAddress" className="my-3">
                                    <Form.Label>Bank Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter the bank's address"
                                        value={bankData.bankAddress}
                                        onChange={(e) => setBankFormData({ ...bankData, bankAddress: e.target.value })}
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="bankBranches" className="my-3">
                                            <Form.Label>Number of Bank Branches</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter the number of branches"
                                                value={bankData.bankBranches}
                                                onChange={(e) => setBankFormData({ ...bankData, bankBranches: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group controlId="bankATMs" className="my-3">
                                            <Form.Label>Number of ATMs</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter the number of ATMs"
                                                value={bankData.bankATMs}
                                                onChange={(e) => setBankFormData({ ...bankData, bankATMs: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="warning" type="button" onClick={handleReset}>
                                        Reset
                                    </Button>
                                    <Button variant="success" type="submit">
                                        Add Bank
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AddBank;
