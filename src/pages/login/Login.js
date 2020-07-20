import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { API_URL } from '../../config.js';
import { parseJwt } from '../../utils/parseJwt.js';

const axios = require('axios');

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: props.history,
            setUserHook: props.setUserHook,
            identificator: null,
            password: null,
            triedSubmit: false,
        }
    }

    onIdentificatorChange = (e) => {
        this.setState({identificator: e.target.value});
    }

    onPasswordChange = (e) => {
        let passwordsMatch = true;
        if (!!this.state.retypePassword && this.state.retypePassword !== e.target.value) {
            passwordsMatch = false;
        }
        this.setState({password: e.target.value, passwordsMatch: passwordsMatch});
    }

    validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    onSubmit = (e) => {
        this.setState({triedSubmit: true});
        let that = this;
        setTimeout(() => {
            that.setState({triedSubmit: false})
        }, 3500);

        if (!this.state.identificator || !this.state.password) {
            return;
        }

        const handleResult = (res) => {
            that.state.setUserHook(parseJwt(res.data));
            localStorage.setItem('jwt', res.data);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`;
            that.state.history.push("/");
        }

        if (this.validateEmail(this.state.identificator)) {
            axios.post(`${API_URL}/user/login-email`, {
                email: this.state.identificator,
                password: this.state.password,
            }).then(handleResult).catch((error) => {
                console.log(error);
            })
        } else {
            axios.post(`${API_URL}/user/login-username`, {
                username: this.state.identificator,
                password: this.state.password,
            }).then(handleResult).catch((error) => {
                console.log(error);
            })
        }
    }

    render() {
        return (
            <>
                <Form>
                    <Form.Group controlId="formIdentificator">
                        <Form.Label>Username/Email</Form.Label>
                        <Form.Control   type="text"
                                        placeholder="username / email"
                                        onChange={this.onIdentificatorChange}/>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control   type="password"
                                        placeholder="password"
                                        onChange={this.onPasswordChange}/>
                    </Form.Group>
                    <Button variant="primary"
                            onClick={this.onSubmit}>
                        Login
                    </Button>
                </Form>
            </>
        )
    }
}

export default Login