import React from 'react';

const Login = () => {


    return (
        <div className='custom-login-page'>
            <form className='custom-login-form'>
                <h4 className="fw-bold">Welcome to QuickBasket</h4>
                <p>Login with your email address & password</p>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">Email address</label>
                    <input type="email" className="form-control border-black" id="email" placeholder="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">Password</label>
                    <input type="password" className="form-control border-black" id="password" placeholder="*************"/>
                </div>
                <button type="submit" className="custom-login-btn">Submit</button>
            </form>
        </div>
    )
}


export default Login;