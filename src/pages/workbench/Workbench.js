import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

import BrowseStories from './BrowseStories.js';

import './Workbench.scss';

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
            breadcrumbs: [`My stories`],
            components: [(
                <BrowseStories  pushHook={this.pushComponent}
                                popHook={this.popComponent}
                                breadId={0}
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
                <Breadcrumb className="simple-breadcrumb">
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
                    {this.state.components.slice(-2).map((c, index) => 
                        <div key={index} className={"panel-container " + ((index !== 0) ? "last" : "previous")}>
                            {c}
                        </div>
                    )}
                </div>
            </>
        )
    }

}

export default Editor