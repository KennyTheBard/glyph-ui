import React from 'react';
import { Spinner } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

function Activate(props) {
    if (!props.user || !props.code) {
        return (
            <>
                <p>
                    You will soon recieve an activation email. Please check your spam folder.
                </p>
            </>
        );
    }
    
    axios.get(`${API_URL}/user/activate/${props.userId}/${props.code}`).then((res) => {
        if (res.activate.check) {
            props.history.push("/");
        }
    }).catch((error) => {
        console.log(error);
    });
    return (
		<>
            <p>
                Processing activation.
            </p>
            <Spinner animation="border" variant="dark"/>
		</>
	);
}

export default Activate;
