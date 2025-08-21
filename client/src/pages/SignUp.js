import React from 'react';

const SignUp = () => {

    return (

        <div className='custom-signup-page'>
            <form className='custom-signup-form'>
                <h4 className="fw-bold ">Welcome to QuickBasket</h4>
                <p >Register with your username, email and password</p>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-bold">Username</label>
                    <input type="username" className="form-control border-black" id="username" placeholder="username"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">Email address</label>
                    <input type="email" className="form-control border-black" id="email" placeholder="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">Password</label>
                    <input type="password" className="form-control border-black" id="password" placeholder="*************"/>
                </div>
                <button type="submit" className="custom-signup-btn">Register</button>
            </form>
        </div>
    )
}

export default SignUp;