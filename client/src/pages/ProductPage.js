//Libraries/frameworks
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../State/cartSlice";

//Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDisplay from "../components/ProfileDisplay";
import Auth from "../utils/auth";

import { QUERY_SINGLE_PRODUCT } from "../utils/queries";

import { ratingConverter } from "../utils/helpers";

const ProductPage = ({ cart, dispatch }) => {
  let [imageIndex, setImageIndex] = useState(0);
//   let [cart, setCart] = useState(
//     JSON.parse(localStorage.getItem("cart")) || []
//   );
  //Functions to handle image gallery index increase/decrease
  const handleImageIndexIncrease = () => {
    if (imageIndex >= 0 && imageIndex < 2) {
      setImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleImageIndexDecrease = () => {
    if (imageIndex > 0 && imageIndex <= 3) {
      setImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  //Get the product id from the URL params
  const { productId } = useParams();
  //Fetch the product data using Apollo's useQuery hook

  const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    //pass the product id as a variable to the query
    variables: { productId: productId },
  });

  const product = data?.product || {};

  // Function to add to cart
  // let cartArray = JSON.parse(localStorage.getItem('cart')) || [];

  const handleAddToCart = () => {
    if (!Auth.loggedIn()) {
      alert(`kindly log in to proceed with purchase!`);
    } else {
        //Q: I'm getting a TypeError that says "dispatch is not a function" here. Why?
        //A: You need to pass dispatch as a prop from the parent component (App.js) to this component (ProductPage.js) and then use it here.
      dispatch(addToCart(product));
      console.log(cart);
    }
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="custom-main-header">
        <ProfileDisplay cart={cart} />
        <Navbar />
      </div>
      <div className="custom-singleProduct-page">
        {loading ? (
          <p>Loading....</p>
        ) : (
          <div className="product-layout">
            <div>
              <i
                className="custom-left-image-btn bi bi-arrow-left-circle"
                onClick={handleImageIndexDecrease}
              ></i>
              <img
                className="product-image-gallery"
                src={product.images[imageIndex]}
                alt="product-image"
              />
              <i
                className="custom-right-image-btn bi bi-arrow-right-circle"
                onClick={handleImageIndexIncrease}
              ></i>
              <section className="product-info">
                <p>{product.productName}</p>
                <p>${product.price}</p>
                <p>{product.description}</p>
                <p>Rating: {product.averageRating}🌟</p>
                <p>Stock Left: {product.stock}</p>
                <p>Reviews: {product.reviews.length}</p>
                <p>Write a review</p>
                <button onClick={handleAddToCart} className="custom-addToCart-btn">
                  {" "}
                  Add to cart
                </button>
              </section>
            </div>

            <section className="reviews-section">
              <h3>Reviews</h3>
              {product.reviews.map((review, index) => (
                <div className="user-review" key={index}>
                  <p className="user-initial text-light">
                    {review.reviewAuthor.split("").shift().toUpperCase()}
                  </p>
                  <em>
                    {review.reviewAuthor}
                    <span> on {review.createdAt}</span>
                  </em>

                  <p className="review-text">{review.reviewText}</p>
                  <p>Rating: {ratingConverter(review.rating)}</p>
                </div>
              ))}
            </section>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
