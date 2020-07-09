import React from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';

function UserCorner(props) {
	return (
		<>
            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        {props.username}
                    </Col>
                    <Col xs={6} md={4}>
                        <Image src={props.profilePicSrc} thumbnail />
                    </Col>
                </Row>
            </Container>
		</>
	);
}

export default UserCorner;
