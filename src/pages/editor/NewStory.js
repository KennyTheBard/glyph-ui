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
            title: null,
            description: null,
        }
    }

    onTitleChange = (e) => {
        this.setState({title: e.target.value});
    }

    onDescriptionChange = (e) => {
        this.setState({description: e.target.value});
    }

    onCreate = (e) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.post(`${API_URL}/story`, {
            title: this.state.title,
            description: this.state.description,
        }, config).then((res) => {
            this.state.history.push(`/story/edit/${res.data.id}`);
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
                                    onChange={this.onTitleChange}/>
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control   type="textarea" as="textarea"
                                    placeholder="Describe the story in a few sentences. No spoilers!"
                                    onChange={this.onDescriptionChange}/>
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