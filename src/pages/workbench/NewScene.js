import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class NewScene extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
            storyId: props.storyId,
            pushHook: props.pushHook,
            popHook: props.popHook,
            content: null,
        }
    }

    onCreate = (e) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.post(`${API_URL}/story/${this.state.storyId}/scene`, {
            content: this.state.content,
            template: false,
            note: "",
        }, config).then((res) => {
            this.state.popHook();
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formTitle">
                    <Form.Label>Content</Form.Label>
                    <Form.Control   type="textarea" size="lg"
                                    placeholder="Content"
                                    onChange={
                                        (e) => this.setState({content: e.target.value})
                                    }/>
                </Form.Group>
                <Button variant="primary"
                        onClick={this.onCreate}>
                    Create
                </Button>
            </Form>
        )
    }

}

export default NewScene