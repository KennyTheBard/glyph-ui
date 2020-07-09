import React from 'react';
import { Button, Navbar, NavDropdown, Nav } from 'react-bootstrap';

import UserCorner from './UserCorner.js';

function GlyphNav(props) {
    let token = localStorage.getItem("jwt");

	return (
		<Navbar className="navbar-dark" bg="dark" expand="lg">
            <Navbar.Brand href="#home">Glypher.io</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item>Action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            {!!token &&
                <UserCorner user={token}/>
            }
            {!token &&
                <>
                    <Button>Login</Button>
                    &nbsp;
                    <Button>Register</Button>
                </>
            }
        </Navbar>
    );
}

export default GlyphNav;