//Libraries
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { CREATE_ORDER } from "../utils/mutations";
import { useSelector, useDispatch } from "react-redux";

//Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDisplay from "../components/ProfileDisplay";
import SearchResult from "./SearchResult";

//Helper functions
import Auth from "../utils/auth";
import { priceFormatter } from "../utils/helpers";
import { removeFromCart, clearCart } from "../State/cartSlice";

const CartPage = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.searchTerm);
    

  const { data } = useQuery(QUERY_SINGLE_USER, {
    variables: {
      username: Auth.getProfile().data.username,
    },
  });

  const user = data?.user;
  console.log(user);

  //Form State
  const [formState, setFormState] = useState({
    phone: "",
    address: {
      street: "",
      suburb: "",
      state: "",
      postCode: "",
    },
  });
  //Personal details notification
  const [personalDetailsError, setPersonalDetailsError] = useState(" ");
  //Successful order creation notification
  const [successMessage, setSuccessMessage] = useState("");
  // Once user data is loaded, update formState
  useEffect(() => {
    if (user) {
      setFormState({
        phone: user.phone,
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
  const [createOrder, { result, loading }] = useMutation(CREATE_ORDER);

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
    const { street, suburb, state, postCode } = formState.address;

    // Check for blank address fields
    if (!street || !suburb || !state || !postCode || !formState.phone) {
      setPersonalDetailsError("errorMessage");
      return;
    }

    try {
      const userAddress = { street, suburb, state, postCode };
      //Execute the createOrder mutation
      const { data, error } = await createOrder({
        variables: {
          userId: Auth.getProfile().data._id,
          products: cartItems,
          totalPrice: grandTotalPrice,
          deliveryAddress: userAddress,
        },
      });
      setSuccessMessage("successMessage");
     
      //Clear cart in Redux and localStorage
      dispatch(clearCart());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="custom-main-header">
        <ProfileDisplay />
        <Navbar />
      </div>
      <h2 className="mt-3">Cart</h2>
      { searchTerm &&        
          <SearchResult/>
        
      }
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
    
                  <img src={product.images[0]} alt="" />
                  <div>
                    <p className="">{product.productName}</p>
                    <p>Quantity: 1</p>
                  </div>
                  <div className="align-items-end">
                    <i
                      onClick={() => dispatch(removeFromCart(product))}
                      className="bi bi-trash text-danger"
                    ></i>
                    <p className="">
                      ${priceFormatter(Number(product.price))}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div
            className={
              cart.length === 0 ? `order-summary d-none` : "order-summary"
            }
          >
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
              <p className="fw-bold">Total</p>
              <p className="fw-bold">
                $
                {priceFormatter(
                  Math.round(
                    cart
                      .map((product) => product.price)
                      .reduce((acc, val) => acc + val, 0) * 100
                  ) / 100
                )}
              </p>
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
            {personalDetailsError === "errorMessage" && (
              <div
                className="alert bg-danger-subtle border-danger-subtle border-5 d-flex justify-content-between align-items-center"
                role="alert"
              >
                <i class="bi bi-dash-circle fs-1 text-danger"></i>
                <p className="mt-3 fs-5 text-danger">
                  Please complete personal details!
                </p>
                <i
                  class="bi bi-x-lg fs-2 text-danger"
                  onClick={() => setPersonalDetailsError("")}
                ></i>
              </div>
            )}
            {successMessage === "successMessage" && (
              <div
                className="alert bg-success-subtle border-success-subtle border-5 d-flex justify-content-between align-items-center"
                role="alert"
              >
                <i class="bi bi-check-circle fs-1 text-success"></i>
                <p className="mt-3 fs-5 text-success">
                  Order created successfully. Thanks for your patronage!
                </p>
                <i
                  class="bi bi-x-lg fs-2 text-success"
                  onClick={() => { 
                    setSuccessMessage("");
                    setInterval(() => window.location.reload(), 1000);
                }}
                ></i>
              </div>
            )}
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
            <div className="modal-body" id="checkout-modal">
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
      <Footer />
    </div>
  );
};

export default CartPage;
