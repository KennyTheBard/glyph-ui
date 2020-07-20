import React from 'react';
import { Form, FormControl, Button, ListGroup, } from 'react-bootstrap';

import NewStory from './NewStory.js';
import ViewStory from './ViewStory.js';

import { API_URL } from '../../config.js';

import './Browse.scss';

const axios = require('axios');

class BrowseStories extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: props.history,
            pushHook: props.pushHook,
            popHook: props.popHook,
            breadId: props.breadId,
            activeStoryId: null,
            stories: [],
        }
    }

    componentDidMount() {
        this.search();
    }

    search = (phrase) => {
        axios.get(`${API_URL}/story` + (!!phrase ? `?search=${phrase}` : ''))
        .then((res) => {
            this.setState({stories: res.data});
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary" onClick={this.search}>
                        Search
                    </Button>
                    &nbsp;
                    <Button variant="success" onClick={() => {
                        this.state.pushHook(
                            this.state.breadId + 1,
                            `New story`,
                            <NewStory   user={this.state.user}
                                        pushHook={this.state.pushHook}
                                        popHook={this.state.popHook}
                                        breadId={this.state.breadId + 1}/>
                            );
                    }}>
                        New story
                    </Button>
                </Form>
                <ListGroup>
                    {(!this.state.stories.length ||this.state.stories.length === 0) && 
                        <p className="empty">You have no stories</p>
                    }
                    {this.state.stories.map((story) => {
                        return (
                            <ListGroup.Item key={story.id}
                                        active={this.state.activeStoryId === story.id}
                                        onClick={() => {
                                            this.setState({activeStoryId: story.id});
                                            this.state.pushHook(
                                                this.state.breadId + 1,
                                                `Story-${story.id}`,
                                                <ViewStory  user={this.state.user}
                                                            pushHook={this.state.pushHook}
                                                            popHook={this.state.popHook}
                                                            breadId={this.state.breadId + 1}
                                                            key={story.id}
                                                            story={story}/>
                                            );
                            }}>
                                <div>
                                    <p><b>Story-{story.id}</b></p>
                                    <p>{story.title}</p>
                                </div>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </>
        )
    }
}

export default BrowseStories