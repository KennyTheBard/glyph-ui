import React from 'react';

class EditCheckbox extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: props.value,
            checked: props.checked,
            onChangeHook: props.onChangeHook,
            active: props.active,
        }
    }

    render() {
        return (
            <>
                <input  type="checkbox"
                        checked={!!this.state.checked}
                        id={this.state.value}
                        value={this.state.value}/>
            </>
        )
    }

}

export default EditCheckbox