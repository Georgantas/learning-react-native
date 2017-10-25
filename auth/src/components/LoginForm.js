
import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        isLoading: false
    };

    onButtonPress() {
        this.setState({ error: '', isLoading: true });

        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
                .then(this.onLoginSuccess.bind(this))
                .catch(() => {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then(this.onLoginSuccess.bind(this))
                            .catch(this.onLoginFailure.bind(this));
                });
    }

    onLoginFailure() {
        this.setState({
            error: 'Authentication Failed',
            isLoading: false
        });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            isLoading: false,
            error: '' //redundant
        });
    }

    renderButton() {
        if (this.state.isLoading) {
            return (<Spinner size={'small'} />);
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)} >
                Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder='email@example.com'
                        label='Email'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder='password'
                        label='Password'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;
