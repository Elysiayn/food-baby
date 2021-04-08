import React, { useState } from 'react';
import { Button, Input, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import '../App.css';

function Login() {

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e)
        }
    };

    const handleChange = event => {

        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <div className='login-container'>
            <h2 className='login-title'>
                Login
            </h2>
            <form
                className='login-form'
                onSubmit={handleFormSubmit}>
                <div className='ui input login-email'>
                    <label
                        htmlFor='email'
                        className='login-email-label'
                    >Email Address:</label>
                    <Input
                        placeholder='example@email.com'
                        name='name'
                        type='email'
                        id='email'
                        onChange={handleChange}
                    />
                </div>
                <div className='login-password'>
                    <label
                        htmlFor='password'
                        className='login-password-label'
                    >Password:</label>
                    <Input
                        placeholder='••••••'
                        name='password'
                        type='password'
                        id='pwd'
                        onChange={handleChange}
                    />
                </div>
                {
                    error ? <div>
                        <p className='login-error'>Incorrect login credentials. Please try again.</p>
                    </div> : null
                }
                <div className='login-btn-container'>
                    <Button animated id='login-btn'>
                        <Button.Content visible>Login</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />
                        </Button.Content>
                    </Button>
                    {/* <Button.Content animated='arrow right'
                        type='submit'
                        className='login-btn' >
                        Submit
                    </Button.Content> */}
                </div>
            </form>
            <div>
                <Link to='/signup' >
                    <p className='login-createUser'>
                        Don't have an account? Sign up &rarr;
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default Login;