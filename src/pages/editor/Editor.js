import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

import BrowseScenes from './BrowseScenes.js';

import './Editor.scss';

class Editor extends React.Component {

    constructor(props) {
        super(props)

        this.pushComponent = this.pushComponent.bind(this);
        this.popComponent = this.popComponent.bind(this);

        const storyId = props.match.params.storyId;
        this.state = {
            history: props.history,
            user: props.user,
            storyId: storyId,
            breadcrumbs: [`Story-${storyId}`],
            components: [(
                <BrowseScenes   pushHook={this.pushComponent}
                                popHook={this.popComponent}
                                breadId={0}
                                key={0}
                                storyId={storyId}/>
            )],
        }
    }

    pushComponent = (breadId, name, component) => {
        this.setState({
            breadcrumbs: [...this.state.breadcrumbs.slice(0, breadId), name],
            components: [...this.state.components.slice(0, breadId), component],
        });
    }

    popComponent = () => {
        this.setState({
            breadcrumbs: this.state.breadcrumbs.slice(0, this.state.breadcrumbs.length - 1),
            components: this.state.components.slice(0, this.state.components.length - 1),
        });
    }

    render() {
        return (
            <>
                <Breadcrumb>
                    {this.state.breadcrumbs.map((bc, index) => {
                        return (
                            <Breadcrumb.Item key={bc} onClick={() => this.setState({
                                components: this.state.components.slice(0, index + 1),
                                breadcrumbs: this.state.breadcrumbs.slice(0, index + 1)
                            })}>
                                {bc}
                            </Breadcrumb.Item>
                        )
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