import React from 'react';
import BrowseScenes from './BrowseScenes';
import EditScene from './EditScene';

import './EditStory.css';


const axios = require('axios');

class EditStory extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
        }
    }

    render() {
        return (
            <div>
                <BrowseScenes/>
                <EditScene/>
            </div>
        )
    }

}

export default EditStory