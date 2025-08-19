import React, { useState } from 'react';


const Navbar = () => {


    return (
        
        <nav>
            <h2>QuickBasket</h2>
            <ul className="nav-menu">
                <li className="nav-link">Home</li>
                <li className="nav-link">Products</li>
                <li className="nav-link">Categories</li>
                <li className="nav-link">About Us</li>
            </ul>
            <ul className="nav-menu">
                <li className="nav-link">Login</li>
                <li className="nav-links">Sign Up</li>
            </ul>
        </nav>
    )
}

export default Navbar;