import React from 'react';
import { Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class StoryPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: props.history,
            storyId: props.match.params.storyId,
            story: null,
            storyInstance: null,
        }
    }

    componentDidMount() {
        this.loadStory();
        this.loadStoryInstance();
    }

    loadStory = () => {
        axios.get(`${API_URL}/story/${this.state.storyId}`)
        .then((res) => {
            let story = res.data;
            this.setState({story: story});
            // this.loadAuthor(story.authorId);
        }).catch((error) => {
            console.log(error);
        });
    }

    // loadAuthor = ( id) => {
    //     axios.get(`${API_URL}/story/${this.state.storyId}`)
    //     .then((res) => {
    //         let story = res.data;
    //         this.setState({story: story});

    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }

    loadStoryInstance = () => {
        axios.get(`${API_URL}/story/${this.state.storyId}/story-instance`)
        .then((res) => {
            this.setState({storyInstance: res.data});
        });
    }

    onStart = () => {
        axios.post(`${API_URL}/story/${this.state.storyId}/story-instance`)
        .then(() => {
            this.state.history.push(`/play/${this.state.storyId}`);
        }).catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        return (
            <>
                {!!this.state.story &&
                    <>
                        {/* Splash Art */}
                        <div>
                            <p>{this.state.story.title}</p>
                            <p>{this.state.story.description}</p>
                            {/* Author */}
                            {(!!this.story && !!this.storyInstance)
                                ?   <Button onClick={() => this.state.history.push(`/play/${this.state.storyId}`)}>
                                        Continue
                                    </Button>
                                :   <Button onClick={this.onStart}>
                                        Start
                                    </Button>
                            }
                        </div>
                        {/* Reviews */}
                    </>
                }
            </>
        )
    }
}

export default StoryPage