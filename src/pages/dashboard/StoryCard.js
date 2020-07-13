import React from 'react';
import { Button } from 'react-bootstrap';

class StoryCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: props.history,
            story: props.story,
        }
    }

    render() {
        return (
            <>
                <div>
                    <h3>{this.state.story.title}</h3>
                    <p>{this.state.story.description}</p>
                </div>
                <Button onClick={() => this.state.history.push(`/story/${this.state.story.id}/edit`)}>
                    Edit
                </Button>
            </>
        )
    }
}

export default StoryCard