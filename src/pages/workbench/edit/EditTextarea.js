import React from 'react';
import { Button, Form } from 'react-bootstrap';


class EditTextarea extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: props.value,
            onChangeHook: props.onChangeHook,

            focused: null,
        }
    }

    render() {
        return (
            <>
                <Form.Control   as="textarea"
                                defaultValue={this.state.value}
                                onChange={this.state.onChangeHook}
                                onFocus={() => this.setState({focused: true})}
                                onBlur={() => this.setState({focused: false})}
                                readOnly={!this.state.focused}
                                plaintext={!this.state.focused}
                                wrap="soft"/>                
            </>
        )
    }

}

export default EditTextarea