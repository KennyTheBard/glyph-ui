import React from 'react';
import StoryCard from './StoryCard';
import { Form, FormControl, Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: props.history,
            token: null,
            stories: [],
        }
    }

    componentDidMount() {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.get(`${API_URL}/story`, config).then((res) => {
            this.setState({stories: res.data});
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <>
                <Form inline>
                    <Button variant="success" onClick={() => this.props.history.push("/story/new")}>New story</Button>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
                {this.state.stories.map((story, index) => {
                    return <StoryCard history={this.state.history} key={index} story={story}/>
                })}
            </>
        )
    }
}

export default Dashboard