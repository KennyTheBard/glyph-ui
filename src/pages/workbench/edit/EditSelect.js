import React from 'react';
import { Form } from 'react-bootstrap';

class EditSelect extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            values: props.values,
            onChangeHook: props.onChangeHook,

            focused: null,
        }
    }

    render() {
        return (
            <>
                <Form.Control   as="select" custom
                                onChange={this.state.onChangeHook}
                                onFocus={() => this.setState({focused: true})}
                                onBlur={() => this.setState({focused: false})}
                                plaintext={!this.state.focused}>
                    {this.state.values.map((value, index) => {
                        <option value="index">{value}</option>
                    })}
                </Form.Control>
            </>
        )
    }

}

export default EditSelect