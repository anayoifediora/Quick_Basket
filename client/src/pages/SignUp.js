import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: {
      street: "",
      suburb: "",
      state: "",
      postCode: "",
    },
  });

  //Apollo mutation hook to create a new user
  const [addUser, { data, loading, error }] = useMutation(ADD_USER);

  //Function that handles signup completion
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      //Execute the signup mutation with the form values
      const { data } = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
          phone: formState.phone,
          address: {
            street: formState.address.street,
            suburb: formState.address.suburb,
            state: formState.address.state,
            postCode: formState.address.postCode,
          },
        },
      });
      //saves the generated token to local storage
      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error);
    }
    //clear form values
    setFormState({
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: {
        street: "",
        suburb: "",
        state: "",
        postCode: "",
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // check if input belongs to address
    if (["street", "suburb", "state", "postCode"].includes(name)) {
      setFormState({
        ...formState,
        address: {
          ...formState.address,
          [name]: value,
        },
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  return (
    <div className="custom-signup-page">
      {data?.addUser ? (
        window.location.assign("/")
      ) : (
        <form className="custom-signup-form">
          <h4 className="fw-bold ">Welcome to QuickBasket</h4>
          <p>Sign up with your username, email and password.</p>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="username"
              className="form-control "
              id="username"
              placeholder="username"
              name="username"
              value={formState.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control "
              id="email"
              placeholder="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control "
              id="password"
              placeholder="*************"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
            />
            <div id="emailHelp" class="form-text">
              Password must contain at least one uppercase letter and one
              number.
            </div>
          </div>
          <button
            type="button"
            className="custom-signup-btn"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Register
          </button>
        </form>
      )}
      {/* Sign Up Modal */}

      <div
        class="modal fade modal-lg"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            {error && (
              <div className="alert alert-danger m-3" role="alert">
                {error.message}
              </div>
            )}
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Sign Up Form
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="username"
                  placeholder="Username"
                  name="username"
                  value={formState.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="email"
                  placeholder="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control "
                  id="password"
                  placeholder="*************"
                  name="password"
                  value={formState.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="firstName"
                  className="form-control "
                  id="firstName"
                  placeholder="First Name"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="lastName"
                  className="form-control "
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Mobile Phone
                </label>
                <input
                  type="phone"
                  className="form-control  "
                  id="phone"
                  placeholder="Mobile phone number"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                />
              </div>

              {/* Address Input */}

              <div className="mb-3">
                <label htmlFor="street" className="form-label">
                  Street
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="street"
                  placeholder="Street/House number including street name"
                  name="street"
                  value={formState.address.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="suburb" className="form-label">
                  Suburb
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="suburb"
                  placeholder="Suburb"
                  name="suburb"
                  value={formState.address.suburb}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postCode" className="form-label">
                  Post Code
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="postCode"
                  placeholder="Post Code"
                  name="postCode"
                  value={formState.address.postCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="state"
                  placeholder="State"
                  name="state"
                  value={formState.address.state}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" onClick={handleFormSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
