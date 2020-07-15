import React from 'react';
import { Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class EditChoice extends React.Component {

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
        if (this.state.choice.content === this.state.originalChoice.content) {
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.put(`${API_URL}/story/${this.state.storyId}/choice/${this.state.choice.id}/details`, this.state.choice, config)
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
                    {`Choice-${this.state.choice.id}`}
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

export default EditChoice