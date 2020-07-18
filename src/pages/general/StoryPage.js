import React from 'react';
import { Form, FormControl, Button, Card } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class StoryPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: props.history,
            storyId: props.match.params.storyId,
            story: null,
        }
    }

    search = () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.get(`${API_URL}/story/${this.state.storyId}`, config).then((res) => {
            this.setState({story: res.data});
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.search();
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
                            <Button onClick={() => this.state.history.push(`/play/${this.state.storyId}`)}>
                                Play
                            </Button>
                        </div>
                        {/* Reviews */}
                    </>
                }
            </>
        )
    }
}

export default StoryPage