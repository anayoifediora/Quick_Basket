import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {

    //State to manage form input values
    const [formState, setFormState] = useState({ email: '', password: ''});
    //Apollo mutation hook for logging in the user
    const [login, { data, loading, error }] = useMutation(LOGIN_USER);

    //Function that Handles form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // Execute the login mutation with the form values
            const { data } = await login({
                variables: {
                    email: formState.email,
                    password: formState.password,
                }
            })
            //saves the generated token to local storage
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e)
        }
        //clear form values 
        setFormState({
            email: '',
            password: ''
        })
    }
    // Updates state as the user types into form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value,
        })
    };

    return (
        <div className='custom-login-page'>

            {data ? (
                <p>
                    Success! Proceed to the <Link to="/">Homepage</Link>
                </p>
            ) : (
            <form className='custom-login-form' onSubmit={handleFormSubmit}>
                <h4 className="fw-bold">Welcome to QuickBasket</h4>
                <p>Login with your email address & password</p>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">Email address</label>
                    <input type="email" 
                           className="form-control border-black" 
                           id="email" 
                           placeholder="email"
                           name="email"
                           value={formState.email}
                           onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">Password</label>
                    <input type="password" 
                           className="form-control border-black" 
                           id="password" 
                           placeholder="*************"
                           name="password"
                           value={formState.password}
                           onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="custom-login-btn">Submit</button>
            </form>
            )}
        </div>
    )
}


export default Login;