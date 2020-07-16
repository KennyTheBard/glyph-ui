import React from 'react';
import { Form } from 'react-bootstrap';

class EditSelect extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            keys: props.keys,
            values: props.values,
            selected: props.selected,
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
                                plaintext={!this.state.focused}
                                defaultValue={!this.state.selected ? 'default' : this.state.selected}>
                    <option hidden disabled value="default">select an option</option>
                    {this.state.values.map((value, index) => {
                        let id = this.state.keys[index];
                        return (
                            <option key={id}
                                    value={id}>
                                {value}
                            </option>
                        );
                    })}
                </Form.Control>
            </>
        )
    }

}

export default EditSelect