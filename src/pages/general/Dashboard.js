import React from 'react';
import { Form, FormControl, Button, Card } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: props.history,
            stories: [],
            searchPhrase: null,
        }
    }

    search = () => {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
        };

        axios.get(`${API_URL}/story`, config).then((res) => {
            this.setState({stories: res.data});
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
                {(!this.state.stories) && 
                    <p className="empty">It seems there are no stories yet</p>
                }
                {this.state.stories.map((story) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body>
                                <Card.Title>{story.title}</Card.Title>
                                <Card.Text>
                                    {story.description}
                                </Card.Text>
                                <Button variant="primary"
                                        onClick={() => this.state.history.push(`/story/${story.id}`)}>
                                    Play
                                </Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </>
        )
    }
}

export default Dashboard