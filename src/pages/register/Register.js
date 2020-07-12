import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';

const axios = require('axios');

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: props.history,
            username: null,
            email: null,
            password: null,
            retypePassword: null,
            passwordsMatch: true,
            triedSubmit: false,
        }
    }

    onUsernameChange = (e) => {
        this.setState({username: e.target.value});
    }

    onEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    onPasswordChange = (e) => {
        let passwordsMatch = true;
        if (!!this.state.retypePassword && this.state.retypePassword !== e.target.value) {
            passwordsMatch = false;
        }
        this.setState({password: e.target.value, passwordsMatch: passwordsMatch});
    }

    onRetypePasswordChange = (e) => {
        let passwordsMatch = true;
        if (!!this.state.password && this.state.password !== e.target.value) {
            passwordsMatch = false;
        }
        this.setState({retypePassword: e.target.value, passwordsMatch: passwordsMatch});
    }

    onSubmit = (e) => {
        this.setState({triedSubmit: true});
        let that = this;
        setTimeout(() => {
            that.setState({triedSubmit: false})
        }, 3500);

        if (!this.state.username || !this.state.email || !this.state.password || !this.state.retypePassword) {
            return;
        }

        axios.post(`${API_URL}/user/register`, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }).then((res) => {
            this.state.history.push("/activate")
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        let matchingError;
        if (!this.state.password) {
            matchingError =
                <Form.Text muted="true">
                    Passwords do not match.
                </Form.Text>
        }

        let unfilledField = 
            <Form.Text muted="true">
                This field is mandatory.
            </Form.Text>;

        return (
            <>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control   type="text"
                                        placeholder="username"
                                        onChange={this.onUsernameChange}/>
                        {this.state.triedSubmit && unfilledField}
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control   type="email"
                                        placeholder="your.email@example.com"
                                        onChange={this.onEmailChange}/>
                        {this.state.triedSubmit && unfilledField}
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control   type="password"
                                        placeholder="password"
                                        onChange={this.onPasswordChange}/>
                        {matchingError}
                        {this.state.triedSubmit && unfilledField}
                    </Form.Group>
                    <Form.Group controlId="formRetypePassword">
                        <Form.Label>Retype Password</Form.Label>
                        <Form.Control   type="password"
                                        placeholder="password"
                                        onChange={this.onRetypePasswordChange}/>
                        {matchingError}
                        {this.state.triedSubmit && unfilledField}
                    </Form.Group>
                    <Button variant="primary"
                            onClick={this.onSubmit}>
                        Register
                    </Button>
                </Form>
            </>
        )
    }
}

export default Register