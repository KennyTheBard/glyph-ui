import React from 'react';
import { Form, FormControl, Button, Card } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class Library extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
            storyInstances: [],
            storiesMap: {},
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

        axios.get(`${API_URL}/story/${this.state.storyId}/story-instance` + (!!phrase ? `?search=${phrase}` : ''),
        config).then((res) => {
            this.setState({storyInstances: res.data});
        }).catch((error) => {
            console.log(error);
        });

        axios.get(`${API_URL}/story`, config).then((res) => {
            let storiesMap = {};
            res.data.forEach((story) => storiesMap[`${story.id}`] = story);
            this.setState({storiesMap: storiesMap});
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
                </Form>
                {(!this.state.storyInstances.length ||this.state.storyInstances.length === 0) && 
                    <p className="empty">Your library is empty</p>
                }
                {this.state.storyInstances.map((instance) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                    {!!this.state.storiesMap[`${instance.storyId}`] &&
                                        <>
                                            <Card.Title>
                                                {this.state.storiesMap[`${instance.storyId}`].title}
                                            </Card.Title>
                                            <Card.Text>
                                                {this.state.storiesMap[`${instance.storyId}`].description}
                                            </Card.Text>
                                        </>
                                    }
                                <Button variant="primary" onClick={() => this.state.history.push(`/play/${instance.storyId}`)}>Continue</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </>
        )
    }
}


export default Library