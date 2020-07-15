import React from 'react';
import { Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';
import EditTextarea from './edit/EditTextarea.js';

import './ViewScene.scss';
import BrowseScenes from './BrowseScenes.js';

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
        }
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

    onSave = () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };
        
        axios.put(`${API_URL}/story/${this.state.story.id}/details`,
        this.state.story, config).then(() => {
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