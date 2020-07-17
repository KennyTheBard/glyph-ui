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

    load = () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        return (e) => {
            axios.get(`${API_URL}/current`, config).then((res) => {
                this.setState({
                    scene: res.data.scene,
                    choices: res.data.choices,
                })
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    onChoice = (choiceId) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.post(`${API_URL}/choose`, {
            choiceId: choiceId,
        }, config).then((res) => {
            this.setState({
                scene: res.data.scene,
                choices: res.data.choices,
            })
        }).catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        return (
            <>
                <div>
                    <p>{this.state.scene.title}</p>
                    <p>{this.state.scene.content}</p>
                </div>
                <ListGroup>
                    {this.state.choices.map((choice) => {
                        <ListGroup.Item onClick={() => this.onChoice(choice.id)}>
                            {choice.content}
                        </ListGroup.Item>
                    })}
                </ListGroup>
            </>
        )
    }

}

export default PlayStory