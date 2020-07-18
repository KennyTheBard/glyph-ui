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
            instanceId: null,
            scene: null,
            choices: [],
        }
    }

    componentDidMount() {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.get(`${API_URL}/story/${this.state.storyId}/story_instance`, config).then((res) => {
            let instances = res.data;
            if (instances.length !== 0) {
                this.setState({
                    instanceId: res.data[0].id
                }).then(this.load);
            } else {
                this.startNewPlaythough()
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    startNewPlaythough = () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.post(`${API_URL}/story/${this.state.storyId}/story_instance/`, config)
        .then((res) => {
            this.setState({instanceId: res.data.id});
            this.load();
        }).catch((error) => {
            console.log(error);
        });
    }

    load = () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.get(`${API_URL}/story/${this.state.storyId}/story_instance/${this.state.instanceId}/current`, config).then((res) => {
            this.setState({
                scene: res.data.scene,
                choices: res.data.choices,
            })
        }).catch((error) => {
            console.log(error);
        });
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
                        return (
                            <ListGroup.Item onClick={() => this.onChoice(choice.id)}>
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