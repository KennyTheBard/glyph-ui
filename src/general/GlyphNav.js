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
                    <Nav.Link onClick={() => history.push("/library")}>Library</Nav.Link>
                    <Nav.Link onClick={() => history.push("/workbench")}>Workbench</Nav.Link>
                    <NavDropdown title="More" id="basic-nav-dropdown">
                        <NavDropdown.Item>About</NavDropdown.Item>
                        <NavDropdown.Item>FAQ</NavDropdown.Item>
                        <NavDropdown.Item>Contact us</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>Buy tokens</NavDropdown.Item>
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
