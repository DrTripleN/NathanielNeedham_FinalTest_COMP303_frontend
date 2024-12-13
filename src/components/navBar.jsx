import '../styles/navBar.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
    const location = useLocation(); // Hook to get the current location

    return (
        <Navbar fixed="top"> {/* Adjust Navbar properties as needed */}
            <Container className="nav-container">
                <Navbar.Brand as={Link} to="/">Bank</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            as={Link}
                            to="/bankLists"
                            className={location.pathname === '/bankLists' ? 'active' : ''}
                        >
                            Bank Lists
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/addBank"
                            className={location.pathname === '/addBank' ? 'active' : ''}
                        >
                            Register Bank
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/bankOperations"
                            className={location.pathname === '/bankOperations' ? 'active' : ''}
                        >
                            Bank Operations
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
