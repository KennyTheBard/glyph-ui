import React from 'react';
import { Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';
import EditChoice from './EditChoice.js';

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

    render() {
        return (
            <>
                <div className="scene">
                    <p className="title">Story-{this.state.story.id}</p>
                    <p>{this.state.story.title}</p>
                    <p>{this.state.story.description}</p>
                </div>
                <Button variant="info" onClick={() => {
                    this.state.pushHook(
                        this.state.breadId + 1,
                        'Browse scenes',
                        <BrowseScenes   pushHook={this.state.pushHook}
                                        popHook={this.state.popHook}
                                        breadId={this.state.breadId + 1}
                                        storyId={this.state.story.id}/>
                    );
                }}>
                    Browse scenes
                </Button>
                {/* &nbsp;
                <Button variant="info" onClick={() => {
                    this.state.pushHook(
                        this.state.breadId + 1,
                        'Browse scenes',
                        <BrowseScenes   pushHook={this.state.pushHook}
                                        popHook={this.state.popHook}
                                        breadId={this.state.breadId + 1}
                                        storyId={this.state.storyId}/>
                    );
                }}>
                    Browse scenes
                </Button> */}
            </>
        )
    }

}

export default ViewScene