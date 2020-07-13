import React from 'react';

class StoryCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            story: props.story
        }
    }

    render() {
        return (
            <>
                <div>
                    <h3>{this.state.story.title}</h3>
                    <p>{this.state.story.description}</p>
                </div>
            </>
        )
    }
}

export default StoryCard