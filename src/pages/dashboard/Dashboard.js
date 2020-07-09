import React from 'react';
import StoryCard from './StoryCard';
import { Form, FormControl, Button } from 'react-bootstrap';

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
        axios.get('test/story/').then((res) => {
            this.setState({stories: res.body})
        }).catch((err) => {
            console.log(err)
        })
    }

    onNewStory = (e) => {

    }

    render() {
        return (
            <>
                <Form inline>
                    <Button variant="success" onclick={this.onNewStory}>New story</Button>
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