import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const ProfileDisplay = () => {

  //Function that enables user logout
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.assign("/");
  };


  return (
    <div className="profile-display">
      <h2>Logo</h2>
      
      <input className="custom-search-bar" placeholder="Search Products" />
      <i className="cart-icon bi bi-basket2-fill"></i>
      <div className="dropdown m-2">
        <i
          className="m-2 bi bi-person dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
        
        </i>
        {Auth.loggedIn() ? (
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item">Dashboard</Link>
            </li>
            <li>
              <Link className="dropdown-item">Cart</Link>
            </li>
            <li className="dropdown-item" onClick={logout}>
              Logout
            </li>
          </ul>
        ) : (
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/signup">
                SignUp
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileDisplay;
