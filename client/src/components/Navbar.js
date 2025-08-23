import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        window.location.assign("/");
    }
    return (
        
        <nav>
            <h4 className="header-logo">QuickBasket</h4>
            <ul className="nav-menu">
                <li className="nav-link">Home</li>
                <li className="nav-link">Products</li>
                <li className="nav-link">Categories</li>
                <li className="nav-link">About Us</li>

            </ul>
            <ul className="nav-menu">
                {Auth.loggedIn() ? (<li className='nav-link' onClick={logout}>Logout</li>) : ( <li ><Link className="nav-link" to="/login">Login</Link></li>) }
                <li ><Link className="nav-link" to="/signup">Sign Up</Link></li>
            </ul> 
        </nav>
    )
}

export default Navbar;