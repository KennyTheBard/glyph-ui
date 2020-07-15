import React from 'react';

import { API_URL } from '../../config.js';

const axios = require('axios');

class Library extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: props.history,
        }
    }

    render() {
        return (
            <>
                
            </>
        )
    }
}

export default Library