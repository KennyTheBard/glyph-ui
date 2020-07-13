import React from 'react';
import EditScene from './EditScene.js';

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
            scenes: [],
            searchPhrase: null,
        }
    }

    onSearchChange = (e) => {
        this.setState({searchPhrase: e.target.value});
    }

    onSearch = (e) => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.get(`${API_URL}/story/${this.state.storyId}/scene?search=${this.state.searchPhrase}`,
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
                                    onChange={this.onSearchChange}/>
                    <Button variant="outline-primary" onClick={this.onSearch}>Search</Button>
                </Form>
                <ListGroup>
                    {this.state.scenes.map((scene) => {
                        return (
                            <ListGroup.Item onClick={() => this.state.pushHook('scene', <EditScene scene={scene} pushHook={this.state.pushHook}/>)}>
                                <div className="scene-title">{scene.title}</div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </>
        )
    }

}

export default BrowseScenes