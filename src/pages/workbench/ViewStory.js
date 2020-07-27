import React from 'react';
import { Button } from 'react-bootstrap';

import EditTextarea from './edit/EditTextarea.js';
import EditSelect from './edit/EditSelect.js';
import BrowseScenes from './BrowseScenes.js';

import { API_URL } from '../../config.js';

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
            story: props.story,
            scenes: [],
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}/story/${this.state.story.id}/scene`, this.state.story)
        .then((res) => {
            this.setState({scenes: res.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    onStoryTitleChange = (e) => {
        let story = this.state.story;
        story.title = e.target.value;
        this.setState({story: story});
    }

    onStoryDescriptionChange = (e) => {
        let story = this.state.story;
        story.description = e.target.value;
        this.setState({story: story});
    }

    onBrowseScenes = () => {
        this.state.pushHook(
            this.state.breadId + 1,
            'Browse scenes',
            <BrowseScenes   user={this.state.user}
                            pushHook={this.state.pushHook}
                            popHook={this.state.popHook}
                            breadId={this.state.breadId + 1}
                            storyId={this.state.story.id}/>
        );
    }

    onStartingSceneChange = (e) => {
        let story = this.state.story;
        story.startingSceneId = parseInt(e.target.value);
        this.setState({story: story});
    }

    onSave = () => {
        Promise.all([
            axios.put(`${API_URL}/story/${this.state.story.id}/details`, this.state.story),
            axios.put(`${API_URL}/story/${this.state.story.id}/starting-scene`, this.state.story),
        ])
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
                    <p className="title">Story-{this.state.story.id}</p>
                    <EditTextarea   value={this.state.story.title}
                                    onChangeHook={this.onStoryTitleChange}/>
                    <EditTextarea   value={this.state.story.description}
                                    onChangeHook={this.onStoryDescriptionChange}/>
                    <EditSelect key={this.state.scenes.length}
                                keys={this.state.scenes.map((s) => s.id)}
                                values={this.state.scenes.map((s) => s.content)}
                                selected={this.state.story.startingSceneId}
                                onChangeHook={this.onStartingSceneChange}/>
                </div>
                <br/>
                <Button variant="danger" onClick={() => this.state.popHook()}>
                    Cancel
                </Button>
                &nbsp;
                <Button variant="success" onClick={this.onSave}>
                    Save
                </Button>
                &nbsp;
                <Button variant="info" onClick={this.onBrowseScenes}>
                    Browse scenes
                </Button>
            </>
        )
    }

}

export default ViewScene