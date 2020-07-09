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
                {this.state.stories.map((s) => {
                    return <div>
                        <h3>{s.title}</h3>
                        <p>{s.description}</p>
                    </div>
                })}
            </>
        )
    }
}

export default StoryCard