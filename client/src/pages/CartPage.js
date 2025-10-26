//Libraries
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { CREATE_ORDER } from "../utils/mutations";

//Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDisplay from "../components/ProfileDisplay";

//Helper functions
import Auth from "../utils/auth";
import { priceFormatter } from "../utils/helpers";
import { removeFromCart } from "../State/cartSlice";

const CartPage = ({ cart, dispatch }) => {
  console.log(cart);

  const { data } = useQuery(QUERY_SINGLE_USER, {
    variables: {
      username: Auth.getProfile().data.username,
    },
  });

  const user = data?.user;
  

  const [formState, setFormState] = useState({
    phone: "",
    address: {
      street: "",
      suburb: "",
      state: "",
      postCode: "",
    },
  });

  // Once user data is loaded, update formState
  useEffect(() => {
    if (user) {
      setFormState({
        phone: "",
        address: {
          street: user.address?.street,
          suburb: user.address?.suburb,
          state: user.address?.state,
          postCode: user.address?.postCode,
        },
      });
    }
  }, [user]);
  const grandTotalPrice =
    Math.round(
      cart.map((product) => product.price).reduce((acc, val) => acc + val, 0) *
        100
    ) / 100;
  console.log(Auth.getProfile());

  const cartItems = cart.map((item, index) => ({
    productId: item._id,
    productName: item.productName,
    price: item.price,
    quantity: 1,
  }));
  console.log(cartItems);
  //Apollo mutation hook for creating an order
  const [createOrder, { result, loading, error }] = useMutation(CREATE_ORDER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //check if input belongs to address
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
  //Function that handles order creation
  const handleOrderCreation = async (event) => {
    event.preventDefault();

    try {
      //Execute the createOrder mutation
      const { data } = await createOrder({
        variables: {
          userId: Auth.getProfile().data._id,
          products: cartItems,
          totalPrice: grandTotalPrice,
          deliveryAddress: {
      postCode: "10001",
      state: "NY",
      street: "123 Main St",
      suburb: "New York",
    },
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="custom-main-header">
        <ProfileDisplay cart={cart} />
        <Navbar />
      </div>
      {Auth.loggedIn() && (
        <div className="cart-page">
          <div className="all-cart-items">
            {cart.length === 0 ? (
              <div className="text-center text-body-tertiary mt-5">
                <h4>Your cart is empty.</h4>
                <p>Start adding some products to your cart!</p>
              </div>
            ) : (
              cart.map((product, index) => (
                <div className="cart-item" key={index}>
                  {/* <p className="ms-4">{index + 1}</p> */}
                  <img src={product.images[0]} alt="" />
                  <div>
                    <p className="me-3 fs-6">{product.productName}</p>
                    <p>Quantity: 1</p>
                  </div>
                  <div className="align-items-end">
                    <i
                      onClick={() => dispatch(removeFromCart(product))}
                      className="bi bi-trash text-danger"
                    ></i>
                    <p className="fs-5">
                      ${priceFormatter(Number(product.price))}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="order-summary">
            <h5>Order Summary</h5>
            <div>
              <p>
                {cart.length > 1
                  ? `${cart.length} items`
                  : `${cart.length} item`}
              </p>
              <p>
                $
                {cart.length > 0
                  ? priceFormatter(
                      Math.round(
                        cart
                          .map((product) => product.price)
                          .reduce((acc, val) => acc + val, 0) * 100
                      ) / 100
                    )
                  : 0}
              </p>
            </div>
            <div>
              <h5 className="fw-bold">Total</h5>
              <h5 className="fw-bold">
                $
                {priceFormatter(
                  Math.round(
                    cart
                      .map((product) => product.price)
                      .reduce((acc, val) => acc + val, 0) * 100
                  ) / 100
                )}
              </h5>
            </div>
            <button data-bs-toggle="modal" data-bs-target="#checkoutModal">
              Checkout
            </button>
          </div>
        </div>
      )}

      <div
        class="modal fade"
        id="checkoutModal"
        tabindex="-1"
        aria-labelledby="checkoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="checkoutModalLabel">
                Checkout Form
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="personal-details m-3">
                <h3>Personal Details</h3>
                <div className="mb-3">
                  <label htmlFor="street" className="form-label">
                    Street
                  </label>
                  <input
                    type="text"
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
                    id="state"
                    placeholder="State"
                    name="state"
                    value={formState.address.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Phone number"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="payment-details m-3">
                <h3>Payment details</h3>
                <div className="border border-tertiary d-flex justify-content-center">
                  <p className="text-body-tertiary fs-2 p-4 ">
                    Insert Payment details here
                  </p>
                </div>
              </div>
            </div>
            <p className="fst-italic fs-5 m-3 text-danger">
              Please confirm address and payment details!
            </p>
            <div className="modal-footer d-flex justify-content-center">
              <button type="button" className="fw-bold" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                type="button"
                className="fw-bold"
                onClick={handleOrderCreation}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
