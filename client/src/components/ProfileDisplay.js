import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const ProfileDisplay = ({ cart }) => {

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
      <i className="cart-icon bi bi-basket2-fill">{Auth.loggedIn() ? (<span className="cart-length">{cart?.length}</span>) : (<span></span>)}</i>
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
              <Link className="dropdown-item text-primary-emphasis">Dashboard</Link>
            </li>
            <li>
              <Link className="dropdown-item text-primary-emphasis">Cart</Link>
            </li>
            <li className="dropdown-item text-primary-emphasis" onClick={logout}>
              Logout
            </li>
          </ul>
        ) : (
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item text-primary-emphasis" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className="dropdown-item text-primary-emphasis" to="/signup">
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
