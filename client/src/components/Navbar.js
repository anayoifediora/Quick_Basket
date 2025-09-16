import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.assign("/");
  };
  return (
    <div className="custom-header container-fluid">
      <Link className="title-section" to="/">
        <div className="logo-image"></div>
        <h4 className="title m-3">QuickBasket</h4>
      </Link>
      
      <nav className="navbar navbar-expand-lg">
        <div className="custom-navbar">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse ms-5"
            id="navbarSupportedContent"
          >
            <ul className="custom-nav-menu nav nav-pills">
              <li className=" custom-nav-item nav-item">
                <Link className="custom-nav-link nav-link" to='/'>Home</Link>
              </li>
              <li className="custom-nav-item nav-item">
                <Link className="custom-nav-link nav-link" to="/products">Products</Link>
              </li>
              <li className="custom-nav-item nav-item dropdown">
                <Link
                  className="custom-nav-link nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item fs-6 " to="/fragrances">
                      Fragrances
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item fs-6 " to="/fragrances">
                      Phones
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="custom-nav-item nav-item">
                <Link className="custom-nav-link nav-link">About Us</Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      {Auth.loggedIn() ? (
        <h5 className="m-3">Welcome {Auth.getProfile().data.username}!</h5>
      ) : (
      <ul className="custom-nav-menu nav nav-pills">
        <li className="custom-nav-item nav-item">
          <Link className="custom-nav-signup-btn" to="/signup">
            Sign Up
          </Link>
        </li>
      </ul>
      )}
    </div>
  );
};

export default Navbar;
