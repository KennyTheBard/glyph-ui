import React from 'react';
import StoryCard from './StoryCard';
import { Form, FormControl, Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            token: null,
            stories: [],
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}/story`).then((res) => {
            this.setState({stories: res.body})
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <>
                <Form inline>
                    <Button variant="success" onClick={() => this.props.history.push("/story")}>New story</Button>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
                {this.state.stories.map((s) => {
                    return <StoryCard story={s}/>
                })}
            </>
        )
    }
}

export default Dashboard