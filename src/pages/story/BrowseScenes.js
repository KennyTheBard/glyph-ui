import React from 'react';

const axios = require('axios');

class BrowseScenes extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            history: props.history,
            user: props.user,
            storyId: props.storyId,
            scenes: [],
            searchPhrase: null,
        }
    }

    onSearchChange = (e) => {
        this.setState({searchPhrase: e.target.value});
    }

    onSearch = (e) => {
        axios.get(`${process.env.SERVER_URL}/story/${this.state.storyId}/scene?search=${this.state.searchPhrase}`)
        .then((res) => {
            this.setState({scenes: res.body});
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
                            <ListGroup.Item>
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