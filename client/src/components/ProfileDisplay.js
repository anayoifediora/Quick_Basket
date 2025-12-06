import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../utils/auth";
import { addSearchTerm } from "../State/searchTermSlice";

const ProfileDisplay = () => {
  //Function that enables user logout
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.assign("/");
  };

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const cart = useSelector((state) => state.cart);

  const handleSearchInputChange = (e) => {
    dispatch(addSearchTerm(e.target.value));
  };

  return (
    <div className="profile-display">
      <Link className="logo-image" to="/"></Link>

      <div>
        <input
          className="custom-search-bar"
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <i className=" custom-search-icon bi bi-search"></i>
      </div>
      <div className="d-flex align-items-center">
        <i className="cart-icon bi bi-basket2-fill">
          {Auth.loggedIn() ? (
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <span
                className={
                  cart.length === 0 ? "cart-length d-none" : "cart-length"
                }
              >
                {cart?.length}
              </span>
            </Link>
          ) : (
            <span></span>
          )}
        </i>
        <div className="dropdown m-2">
          <i
            className="m-2 bi bi-person dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ color: "black" }}
          ></i>
          {Auth.loggedIn() ? (
            <ul className="dropdown-menu">
              <li>
                <Link
                  to="/dashboard"
                  className="dropdown-item text-primary-emphasis"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="dropdown-item text-primary-emphasis"
                >
                  Cart
                </Link>
              </li>
              <li
                className="dropdown-item text-primary-emphasis"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          ) : (
            <ul className="dropdown-menu">
              <li>
                <Link
                  className="dropdown-item text-primary-emphasis"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item text-primary-emphasis"
                  to="/signup"
                >
                  SignUp
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
