import  { useState } from "react";
import { Button, Form, Row, Col, Card, Container } from "react-bootstrap";
import axios from "axios";
import "../styles/bankui.css";

function BankOperations() {
    const [searchKey, setSearchKey] = useState("");
    const [bankData, setBankData] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSearch = async () => {
        try {
            // Attempt to search by ID
            let endpoint = `http://localhost:8763/api/banks/id/${searchKey}`;
            let response = await axios.get(endpoint);
            setBankData(response.data);
            setError("");
        } catch (err) {
            if (err.response && err.response.status === 404) {
                try {

                    const endpoint = `http://localhost:8763/api/banks/name/${searchKey}`;
                    const response = await axios.get(endpoint);
                    setBankData(response.data);
                    setError("");
                } catch (nameError) {
                    if (nameError.response && nameError.response.status === 404) {
                        setError("Bank not found. Please check the ID or name and try again.");
                    } else {
                        setError("An error occurred while searching for the bank. Please try again later.");
                    }
                    setBankData(null);
                }
            } else {
                setError("An error occurred while searching for the bank. Please try again later.");
                setBankData(null);
            }
        }
    };


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const endpoint = bankData.id
                ? `http://localhost:8763/api/banks/edit/id/${bankData.id}`
                : `http://localhost:8763/api/banks/edit/name/${bankData.bankName}`;

            await axios.put(endpoint, bankData, {
                headers: { "Content-Type": "application/json" },
            });
            setSuccess("Bank updated successfully!");
            setError("");
        } catch (err) {
            // Check if the error response exists and set a more informative message
            if (err.response) {
                setError(`Failed to update bank: ${err.response.data.message || "Unknown error."}`);
            } else {
                setError("An error occurred while updating the bank. Please try again later.");
            }
            setSuccess(""); // Clear success message if error occurs
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this bank?");
        if (confirmDelete) {
            try {
                const endpoint = bankData.id
                    ? `http://localhost:8763/api/banks/delete/id/${bankData.id}`
                    : `http://localhost:8763/api/banks/delete/name/${bankData.bankName}`;

                await axios.delete(endpoint);
                setSuccess("Bank deleted successfully!");
                setError("");
                setBankData(null);
            } catch (err) {

                if (err.response) {
                    setError(`Failed to delete bank: ${err.response.data.message || "Unknown error."}`);
                } else {
                    setError("An error occurred while deleting the bank. Please try again later.");
                }
                setSuccess("");
            }
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBankData({ ...bankData, [name]: value });
    };

    return (
        <div className="mt-5">
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="translucent-form">
                        <Card.Body>
                            <h3 className="mb-4 text-center">Bank Operations</h3>

                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

                            <Form onSubmit={handleSearch} className="mb-4">
                                <Form.Group controlId="searchKey">
                                    <Form.Label>Enter Bank Name or ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Bank Name or ID"
                                        value={searchKey}
                                        onChange={(e) => setSearchKey(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="success" onClick={handleSearch} className="mt-3">
                                    Search
                                </Button>
                            </Form>

                            {bankData && (
                                <Form onSubmit={handleUpdate}>
                                    <Row>

                                        <Col md={6}>
                                            <Form.Group controlId="bankYear">
                                                <Form.Label>Established Year</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="bankYear"
                                                    value={bankData.bankYear}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group controlId="bankEmp" className="my-3">
                                        <Form.Label>Number of Employees</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="bankEmp"
                                            value={bankData.bankEmp}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="bankAddress" className="my-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="bankAddress"
                                            value={bankData.bankAddress}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Update Bank
                                    </Button>

                                    <Button variant="danger" className="m-lg-3" onClick={handleDelete}>
                                        Delete Bank
                                    </Button>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default BankOperations;
