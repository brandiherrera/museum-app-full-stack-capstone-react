import React from 'react';
import ValidationError from '../../validation-error';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import config from '../../config';


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: '',
                touched: false
            },
            password: {
                value: '',
                touched: false
            },
            error: null,
        }
    }

    handleLoginSuccess = () => {
        window.location = '/dashboard'
    }

    updateEmail(email) {
        this.setState({ email: { value: email, touched: true } });
    }

    updatePassword(password) {
        this.setState({ password: { value: password, touched: true } });
    }

    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { email, password } = ev.target
        console.log(password.value)
        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(res => {
                email.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                TokenService.saveUserId(res.userId)
                fetch(`${config.API_ENDPOINT}/met/interval`)
                window.location = '/dashboard'
            })
            .then()
            .catch(res => {
                console.log({ error: res.error })
                this.setState({ error: res.error })
                this.formError();
            })
    }

    formError = () => {

    }

    validateEmail() {
        const email = this.state.email.value.trim();
        if (email.length === 0) {
            return 'Email is required';
        } else if (email.length < 5) {
            return 'Email must be at least 5 characters long';
        }
    }

    validatePassword() {
        const password = this.state.password.value.trim();
        if (password.length === 0) {
            return 'Password is required';
        } else if (password.length < 6 || password.length > 72) {
            return 'Password must be between 6 and 72 characters long';
        } else if (!password.match(/[0-9]/)) {
            return 'Password must contain at least one number';
        }
    }

    render() {

        return (
            <div className='login-page'>
                <h2>Log in</h2>
                <form className='login-form' onSubmit={this.handleSubmitJwtAuth}>
                    <div className='login-form-entry'>
                        <label htmlFor='email'>Email</label>
                        <input className='login-control' type='text' name='email' id='email' onChange={e => this.updateEmail(e.target.value)}
                        // value='demo@test.com' 
                        />
                        {this.state.email.touched && (<ValidationError message={this.validateEmail()} />)}
                    </div>
                    <div className='login-form-entry'>
                        <label htmlFor='password'>Password</label>
                        <input className='login-control' type='password' name='password' id='password' onChange={e => this.updatePassword(e.target.value)}
                        // value='password1' 
                        />
                        {this.state.password.touched && (<ValidationError message={this.validatePassword()} />)}
                    </div>
                    <button type='submit'>
                        Log in
                    </button>
                    <div className='error-message'>
                        {this.state.error}
                    </div>
                    <div className='demo-info'>
                        <p className='login-form-p'><b>To view a demo use:</b></p>
                        <p className='login-form-p'><b>Email:</b> artlover3000@test.com</p>
                        <p className='login-form-p'><b>Password:</b> password1</p>
                    </div>
                </form>
            </div>
        )
    }
}