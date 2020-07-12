import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { API_URL } from '../../config.js';

import './Editor.scss';
import BrowseScenes from './BrowseScenes.js';

const axios = require('axios');

class Editor extends React.Component {

    constructor(props) {
        super(props)

        this.pushComponent = this.pushComponent.bind(this);

        this.state = {
            history: props.history,
            user: props.user,
            storyId: props.storyId,
            breadcrumbs: ['story'],
            components: [(<BrowseScenes pushHook={this.pushComponent}/>)]
        }
    }

    pushComponent = (name, component) => {
        this.setState({
            breadcrumbs: [...breadcrumbs, name],
            components: [...components, component],
        });
    }

    render() {
        return (
            <>
                <Breadcrumb>
                    {this.state.breadcrumbs.map((bc, index) => {
                        <Breadcrumb.Item onClick={() => this.setState({
                            components: this.state.components.slice(index),
                            breadcrumbs: this.state.breadcrumbs.slice(index)
                        })}>
                            {bc}
                        </Breadcrumb.Item>
                    })}
                </Breadcrumb>
                <div className="horizontal-flex-container">
                    {this.state.components.slice(-2)}
                </div>
            </>
        )
    }

}

export default Editor