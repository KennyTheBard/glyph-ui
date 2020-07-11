import React from 'react';
import { Form } from 'react-bootstrap';

const axios = require('axios');

class EditScene extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
            storyId: props.storyId,
            scene: props.scene,
            choices: props.choices,
        }
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
        axios.put(`${process.env.SERVER_URL}/story/${this.state.storyID}/scene/${this.state.scene.id}`, this.state.scene)
        .then((res) => {

        }).catch((error) => {
            console.log(error);
        });

        this.state.choices.map((choice) => {
            if (!chocie.id) {
                axios.post(`${process.env.SERVER_URL}/story/${this.state.storyId}/choice`,
                            {...choice, parentSceneId: this.state.scene.id})
                .then((res) => {
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                axios.put(`${process.env.SERVER_URL}/story/${this.state.storyId}/choice/${choice.id}/details`, choice)
                .then((res) => {

                }).catch((error) => {
                    console.log(error);
                });
            }
        })
    }

    render() {
        return (
            <Form>
                <Form.Label>Scene content</Form.Label>
                <Form.Control   type="textarea" size="lg" as="textarea"
                                defaultValue={this.state.scene.content}
                                onChange={this.onSceneContentChange}/>
                {this.state.choices.map((choice) => {
                    return (
                    <>
                        <Form.Label>Choice content</Form.Label>
                        <Form.Control   type="textarea"
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