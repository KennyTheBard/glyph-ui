import React from 'react';
import { Spinner } from 'react-bootstrap';

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
    
    axios.get(`/api/activate/${props.userId}/${props.code}`).then((res) => {
        if (res.activate.check) {
            props.history.push("/");
        }
    }).catch((error) => {
        console.log(error);
    })
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
