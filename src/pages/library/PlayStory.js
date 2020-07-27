import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class PlayStory extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
            storyId: props.match.params.storyId,
            instanceId: null,
            scene: null,
            error: null,
            choices: [],
        }
    }

    componentDidMount() {
        this.loadInstance();
    }

    loadInstance = () => {
        axios.get(`${API_URL}/story/${this.state.storyId}/story-instance`)
        .then((res) => {
            return this.setState({
                instanceId: res.data.id
            });
        }).then(() => {
            this.loadCurrentScene();
        }).catch((error) => {
            console.log(error);
        });
    }

    loadCurrentScene = () => {
        axios.get(`${API_URL}/story/${this.state.storyId}/story-instance/${this.state.instanceId}/current`)
        .then((res) => {
            this.setState({
                scene: res.data.scene,
                choices: res.data.choices,
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    onMakeChoice = (choiceId) => {
        axios.post(`${API_URL}/story/${this.state.storyId}/story-instance/${this.state.instanceId}/choose`, {
            choiceId: choiceId,
        }).then(() => {
            this.loadCurrentScene();
        }).catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        return (
            <>
                <div>
                    {!!this.state.scene &&
                        <>
                            <p>{this.state.scene.title}</p>
                            <p>{this.state.scene.content}</p>
                        </>
                    }
                </div>
                <ListGroup>
                    {this.state.choices.map((choice) => {
                        return (
                            <ListGroup.Item onClick={() => this.onMakeChoice(choice.id)}>
                                {choice.content}
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </>
        )
    }

}

export default PlayStory