import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Navbar, NavDropdown, Nav } from 'react-bootstrap';

import UserCorner from './UserCorner.js';

function GlyphNav(props) {
    let history = useHistory();
    const user = props.user;

	return (
		<Navbar className="navbar-dark" bg="dark" expand="lg">
            <Navbar.Brand>Glypher.io</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => history.push("/")}>Home</Nav.Link>
                    <Nav.Link>Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item>Action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <div className="justify-content-end">
            {!!user &&
                <UserCorner user={user}/>
            }
            {!user &&
                <>
                    <Button onClick={() => history.push("/login")}>Login</Button>
                    &nbsp;
                    <Button onClick={() => history.push("/register")}>Register</Button>
                </>
            }
            </div>
        </Navbar>
    );
}

export default GlyphNav;
