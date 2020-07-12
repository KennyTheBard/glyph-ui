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
            storyId: props.storyId,
            scene: null,
            choices: [],
        }
    }

    onChoiceFactory = (choiceId) => {
        return (e) => {
            axios.post(`${API_URL}/story/choose`, {
                choiceId: choiceId,
            }).then((res) => {
                this.setState({
                    scene: res.body.scene,
                    choices: res.body.choices,
                })
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    
    render() {
        return (
            <>
                <div className="sceneTitle">
                    {this.state.scene.title}
                </div>
                <div className="sceneContent">
                    {this.state.scene.content}
                </div>
                <ListGroup>
                    {this.state.choices.map((choice) => {
                        <ListGroup.Item onClick={onChoiceFactory(choice.id)}>
                            {choice.content}
                        </ListGroup.Item>
                    })}
                </ListGroup>
            </>
        )
    }

}

export default PlayStory