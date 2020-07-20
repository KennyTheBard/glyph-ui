import React from 'react';
import { Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';
import EditTextarea from './edit/EditTextarea.js';
import EditSelect from './edit/EditSelect.js';

const axios = require('axios');

class ViewChoice extends React.Component {

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
            choice: props.choice,         
            scenes: [],
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}/story/${this.state.storyId}/scene`)
        .then((res) => {
            this.setState({scenes: res.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    onContentChange = (e) => {
        let choice = this.state.choice;
        choice.content = e.target.value;
        this.setState({choice: choice});
    }

    onNextSceneChange = (e) => {
        let choice = this.state.choice;
        choice.nextSceneId = parseInt(e.target.value);
        this.setState({choice: choice});
    }

    onSave = () => {
        axios.put(`${API_URL}/story/${this.state.storyId}/choice/${this.state.choice.id}/details`, this.state.choice)
        .then(() => {
            this.state.popHook();
        }).catch((error) => {
            console.log(error);
        });

        axios.put(`${API_URL}/story/${this.state.storyId}/choice/${this.state.choice.id}/next`, this.state.choice)
        .then(() => {
            this.state.popHook();
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <>
                <div>
                    <p className="title">Choice-{this.state.choice.id}</p>
                    <EditTextarea   value={this.state.choice.content}
                                    onChangeHook={this.onContentChange}/>
                    <EditSelect key={this.state.scenes.length}
                                keys={this.state.scenes.map((s) => s.id)}
                                values={this.state.scenes.map((s) => s.id)}
                                selected={this.state.choice.nextSceneId}
                                onChangeHook={this.onNextSceneChange}/>
                    <p>
                        {this.state.scenes
                            .filter((s) => s.id === this.state.choice.nextSceneId)
                            .map((s) => s.content)
                        }
                    </p>
                </div>
                <Button variant="danger" onClick={() => this.state.popHook()}>Cancel</Button>
                &nbsp;
                <Button variant="success" onClick={this.onSave}>Save</Button>
            </>
        )
    }

}

export default ViewChoice