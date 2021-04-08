import React, { useState } from 'react';
import { Button, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import firebase from 'firebase';

import '../App.css';

function Signup() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async event => {
        event.preventDefault();

        firebase.database().ref(`users`).push().set({
          email: formState.email,
          firstName: formState.firstName,
          lastName: formState.lastName
      });

        const mutationResponse = await addUser({
            variables: {
                email: formState.email, password: formState.password,
                firstName: formState.firstName, lastName: formState.lastName
            }
        });
        
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);

       
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
                Sign Up
            </h2>
            <form 
            onSubmit={handleFormSubmit}
            className='create-form'
            >
                <div className='ui input create-user'>
                    <label 
                    htmlFor='firstName'
                    className='user-first-label'
                    >
                        First Name:
                    </label>
                    <Input
                        placeholder='First'
                        name='firstName'
                        type='firstName'
                        id='firstName'
                        onChange={handleChange}
                    />
                </div>
                <div className='create-user'>
                    <label 
                    htmlFor='lastName'
                    className='user-last-label'
                    >
                        Last Name:
                    </label>
                    <Input
                        placeholder='Last'
                        name='lastName'
                        type='lastName'
                        id='lastName'
                        onChange={handleChange}
                    />
                </div>
                <div className='create-user'>
                    <label 
                    htmlFor='email'
                    className='create-email-label'
                    >
                        Email Address:
                    </label>
                    <Input
                        placeholder='youremail@test.com'
                        name='email'
                        type='email'
                        id='email'
                        onChange={handleChange}
                    />
                </div>
                <div className='create-user'>
                    <label 
                    htmlFor='pwd'
                    className='create-password-label'
                    >
                        Password:
                    </label>
                    <Input
                        placeholder='••••••'
                        name='password'
                        type='password'
                        id='pwd'
                        onChange={handleChange}
                    />
                </div>
                <div className='login-btn-container'>
                    <Button animated id='login-btn'>
                        <Button.Content visible>Create Account</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow right' />
                        </Button.Content>
                    </Button>
                </div>
            </form>
            <div>
                <Link to='/login' >
                    <p className='login-createUser'>
                        &larr; Back to Login Page
                    </p>
                </Link>
            </div>
            {/* <Link to='/login'>
                ← Back to Login Page
<<<<<<< HEAD
            </Link>

            <h2>Sign Up</h2>
            <form onSubmit={handleFormSubmit}>
        <div className=''>
          <label htmlFor='firstName'>First Name:</label>
          <input
            placeholder='First'
            name='firstName'
            type='firstName'
            id='firstName'
            onChange={handleChange}
          />
        </div>
        <div className=''>
          <label htmlFor='lastName'>Last Name:</label>
          <input
            placeholder='Last'
            name='lastName'
            type='lastName'
            id='lastName'
            onChange={handleChange}
          />
        </div>
        <div className=''>
          <label htmlFor='email'>Email:</label>
          <input
            placeholder='youremail@test.com'
            name='email'
            type='email'
            id='email'
            onChange={handleChange}
          />
        </div>
        <div className=''>
          <label htmlFor='pwd'>Password:</label>
          <input
            placeholder='••••••'
            name='password'
            type='password'
            id='pwd'
            onChange={handleChange}
          />
        </div>
        <div className=''>
          <button type='submit'>
            Submit
          </button>
        </div>
      </form>
        <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-database.js"></script>
=======
        </Link> */}
>>>>>>> 64b0a0fc761c973727a622dc03c985fc0cada9b1
        </div>
    );
}

export default Signup;