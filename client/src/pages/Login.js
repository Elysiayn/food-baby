import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { useMutation} from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import '../App.css';

function Login() {

    const [formState, setFormState] = useState({ email: '', password: ''});
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
            <form onSubmit={handleFormSubmit}>
                <div className='ui input'>
                    <label htmlFor='email'>Email Address:</label>
                    <Input
                    placeholder='example@email.com'
                    name='name'
                    type='email'
                    id='email'
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
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
                <div className='ui button'>
                    <Button type='submit'>
                        Submit
                    </Button>
                </div>
            </form>
            <Link to='/signup'>
                <p className='login-createUser'>
                    Don't have an account? Sign up &rarr;
                </p>
            </Link>
        </div>
    );
}

export default Login;