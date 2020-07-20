import React from 'react';
import { Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class NewChoice extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
            pushHook: props.pushHook,
            popHook: props.popHook,
            storyId: props.storyId,
            choice: {...props.choice},
            originalChoice: {...props.choice},
        }
    }

    onContentChange = (e) => {
        let choice = this.state.choice;
        choice.content = e.target.value;
        this.setState({choice: choice});
    }

    onSave = () => {
        axios.post(`${API_URL}/story/${this.state.storyId}/choice`, this.state.choice)
        .then(() => {
            this.state.popHook();
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <>
                <p className="title">
                    New choice
                </p>
                <textarea defaultValue={this.state.choice.content}
                                        onChange={this.onContentChange}
                                        wrap="soft"/>
                <br/>
                <Button variant="danger" onClick={() => this.state.popHook()}>Cancel</Button>
                &nbsp;
                <Button variant="success" onClick={this.onSave}>Save</Button>
            </>
        )
    }

}

export default NewChoice