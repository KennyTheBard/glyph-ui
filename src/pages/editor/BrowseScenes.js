import React from 'react';
import { Form, FormControl, Button, ListGroup } from 'react-bootstrap';

import EditScene from './EditScene.js';
import NewScene from './NewScene.js';

import { API_URL } from '../../config.js';

const axios = require('axios');

class BrowseScenes extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
            storyId: props.storyId,
            pushHook: props.pushHook,
            popHook: props.popHook,
            breadId: props.breadId,
            scenes: [],
            searchPhrase: null,
        }
    }

    componentDidMount() {
        this.search();
    }

    search = (phrase) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.get(`${API_URL}/story/${this.state.storyId}/scene` + (!!phrase ? `?search=${phrase}` : ''),
        config).then((res) => {
            this.setState({scenes: res.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <>
                <Form inline>
                    <FormControl    type="text"
                                    placeholder="Search scene title"
                                    className="mr-sm-2"
                                    onChange={(e) => this.setState({searchPhrase: e.target.value})}/>
                    <Button variant="outline-primary"
                            onClick={() =>
                                this.search(this.state.searchPhrase)
                            }>
                        Search
                    </Button>
                    &nbsp;
                    <Button variant="primary" onClick={() =>
                        this.state.pushHook(this.state.breadId + 1,
                                            'new scene',
                                            <NewScene   pushHook={this.state.pushHook}
                                                        popHook={this.state.popHook}
                                                        breadId={this.state.breadId + 1}
                                                        storyId={this.state.storyId}/>
                        )
                    }>
                        New scene
                    </Button>
                </Form>
                <ListGroup>
                    {this.state.scenes.map((scene) => {
                        return (
                            <ListGroup.Item key={scene.id} 
                                            onClick={() =>
                                                this.state.pushHook(this.state.breadId + 1,
                                                                    `Scene-${scene.id}`,
                                                                    <EditScene  storyId={this.state.storyId} 
                                                                                scene={scene}
                                                                                key={scene.id}
                                                                                breadId={this.state.breadId + 1}
                                                                                pushHook={this.state.pushHook}
                                                                                popHook={this.state.popHook}/>)
                                            }>
                                <div className="scene-title">
                                    <b>{scene.id}</b>
                                    {scene.content}
                                </div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </>
        )
    }

}

export default BrowseScenes