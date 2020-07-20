import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class NewStory extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
            pushHook: props.pushHook,
            popHook: props.popHook,
            breadId: props.breadId,
            title: null,
            description: null,
        }
    }

    onCreate = () => {
        axios.post(`${API_URL}/story`, {
            title: this.state.title,
            description: this.state.description,
        }).then(() => {
            this.state.popHook();
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control   type="textarea" size="lg"
                                    placeholder="Title"
                                    onChange={(e) => this.setState({title: e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control   type="textarea" as="textarea"
                                    placeholder="Describe the story in a few sentences. No spoilers!"
                                    onChange={(e) => this.setState({description: e.target.value})}/>
                </Form.Group>
                <Button variant="primary"
                        onClick={this.onCreate}>
                    Create
                </Button>
            </Form>
        )
    }

}

export default NewStory