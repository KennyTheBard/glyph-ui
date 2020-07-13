import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class EditScene extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
            pushHook: props.pushHook,
            storyId: props.storyId,
            scene: props.scene,
            choices: [],
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}/story/${this.state.storyID}/scene/${this.state.scene.id}/choices`)
        .then((res) => {
            this.setState({choices: res.data});
        }).catch((error) => {
            console.log(error);
        })
    }

    onSceneContentChange = (e) => {
        let scene = this.state.scene;
        scene.content = e.target.value;
        this.setState({scene: scene});
    }

    onChoiceContentChange = (choiceId) => {
        return (e) => {
            let choices = this.state.choices;
            for (let c of choices) {
                if (c.id === choiceId) {
                    c.content = e.target.value;
                }
            }

            this.setState({choices: choices});
        }
    }

    onAddChoice = (e) => {
        let choice = {
            id: null,
            content: "",
        };

        this.setState({choices: [...this.state.choices, choice]});
    }

    onSave = (e) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.put(`${API_URL}/story/${this.state.storyID}/scene/${this.state.scene.id}`,
        this.state.scene, config).then((res) => {

        }).catch((error) => {
            console.log(error);
        });

        this.state.choices.forEach((choice) => {
            if (!choice.id) {
                axios.post(`${API_URL}/story/${this.state.storyId}/choice`,
                            {...choice, parentSceneId: this.state.scene.id},
                config).then((res) => {

                }).catch((error) => {
                    console.log(error);
                });
            } else {
                axios.put(`${API_URL}/story/${this.state.storyId}/choice/${choice.id}/details`,
                choice, config).then((res) => {

                }).catch((error) => {
                    console.log(error);
                });
            }
        })
    }

    render() {
        return (
            <Form>
                <Form.Label>Scene-{this.state.scene.id} content</Form.Label>
                <Form.Control   type="textarea" size="lg" as="textarea" plaintext readOnly
                                defaultValue={this.state.scene.content}
                                onChange={this.onSceneContentChange}/>
                {this.state.choices.map((choice) => {
                    return (
                    <>
                        <Form.Label>Choice content</Form.Label>
                        <Form.Control   type="textarea" plaintext readOnly
                                        defaultValue={choice.content}
                                        onChange={this.onChoiceContentChange(choice.id)}/>
                    </>)
                })}
                <Button variant="info" onClick={this.onAddChoice}>Add Choice</Button>
                <Button variant="succes" onClick={this.onSave}>Save</Button>
            </Form>
        )
    }

}

export default EditScene