import React from 'react';
import { Image, Container, Row, Col } from 'react-bootstrap';

import './UserCorner.scss';

function UserCorner(props) {
	return (
		<>
            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        <Row>
                            <span className="navtext">{props.user.username}</span>
                        </Row>
                        <Row>
                            <span className="navtext">{props.user.email}</span>
                        </Row>
                    </Col>
                    <Col xs={6} md={4}>
                        <Image  roundedCircle width="50" height="50"
                                src={!!props.user.profilePicSrc
                                        ? props.user.profilePicSrc
                                        : "https://bowerbird-app.s3.amazonaws.com/production/uploads/publication/image/1330/small_default_profile.png"}/>
                    </Col>
                </Row>
            </Container>
		</>
	);
}

export default UserCorner;
