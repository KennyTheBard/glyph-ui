import React from 'react';
import { Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class EditScene extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
            pushHook: props.pushHook,
            popHook: props.popHook,
            storyId: props.storyId,
            scene: {...props.scene},
            originalScene: {...props.scene},
        }
    }

    onContentChange = (e) => {
        let scene = this.state.scene;
        scene.content = e.target.value;
        this.setState({scene: scene});
    }

    onSave = () => {
        if (this.state.scene.content === this.state.originalScene.content) {
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };
        
        axios.put(`${API_URL}/story/${this.state.storyId}/scene/${this.state.scene.id}`,
        this.state.scene, config).then(() => {
            this.state.popHook();
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <>
                <p className="title">Scene-{this.state.scene.id}</p>
                <textarea defaultValue={this.state.scene.content}
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

export default EditScene