import React from 'react';
import { Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';
import EditTextarea from './edit/EditTextarea.js';

const axios = require('axios');

class ViewChoice extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
            pushHook: props.pushHook,
            popHook: props.popHook,
            breadId: props.breadId,
            storyId: props.storyId,
            scene: props.scene,
            choice: props.choice,            
        }
    }

    onChoiceContentChange = (e) => {
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
                <div>
                    <p className="title">Choice-{this.state.choice.id}</p>
                    <EditTextarea   value={this.state.choice.content}
                                    onChangeHook={this.onChoiceContentChange}/>
                </div>
                <Button variant="danger" onClick={() => this.state.popHook()}>Cancel</Button>
                &nbsp;
                <Button variant="success" onClick={this.onSave}>Save</Button>
            </>
        )
    }

}

export default ViewChoice