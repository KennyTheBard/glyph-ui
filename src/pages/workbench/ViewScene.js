import React from 'react';
import { Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';
import ViewChoice from './ViewChoice.js';
import NewChoice from './NewChoice.js';
import EditTextarea from './edit/EditTextarea.js';

import './ViewScene.scss';

const axios = require('axios');

class ViewScene extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
            pushHook: props.pushHook,
            popHook: props.popHook,
            breadId: props.breadId,
            storyId: props.storyId,
            scene: props.scene,
            choices: [],            
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}/story/${this.state.storyId}/choice/all/${this.state.scene.id}`)
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

    onAddChoice = () => {
        this.state.pushHook(
            this.state.breadId + 1,
            'New choice',
            <NewChoice user={this.state.user}
                        pushHook={this.state.pushHook}
                        popHook={this.state.popHook}
                        breadId={this.state.breadId + 1}
                        storyId={this.state.storyId}
                        choice={{id: null, content: null, parentSceneId: this.state.scene.id}}/>
        );
    }

    onSave = () => {
        axios.put(`${API_URL}/story/${this.state.storyId}/scene/${this.state.scene.id}`, this.state.scene)
        .then(() => {
            this.state.popHook();
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <>
                <div className="scene">
                    <p className="title">Scene-{this.state.scene.id}</p>
                    <EditTextarea   value={this.state.scene.content}
                                    onChangeHook={this.onSceneContentChange}/>
                </div>
                {this.state.choices.map((choice, index) => {
                    return (
                        <div key={index} className="choice" onClick={() => {
                            this.state.pushHook(
                                this.state.breadId + 1,
                                `Choice-${choice.id}`,
                                <ViewChoice user={this.state.user}
                                            pushHook={this.state.pushHook}
                                            popHook={this.state.popHook}
                                            breadId={this.state.breadId + 1}
                                            storyId={this.state.storyId}
                                            choice={choice}/>
                            );
                        }}>
                            <p className="title">Choice-{choice.id}</p>
                            <p>{choice.content}</p>
                        </div>)
                })}
                <Button variant="danger" onClick={() => this.state.popHook()}>
                    Cancel
                </Button>
                &nbsp;
                <Button variant="success" onClick={this.onSave}>
                    Save
                </Button>
                &nbsp;
                <Button variant="info" onClick={this.onAddChoice}>
                    Add Choice
                </Button>
            </>
        )
    }

}

export default ViewScene