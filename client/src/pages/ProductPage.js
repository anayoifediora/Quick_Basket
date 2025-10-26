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
import ReviewForm from "../components/ReviewForm";

//Utility functions
import { priceFormatter } from "../utils/helpers";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";

import { ratingConverter } from "../utils/helpers";

const ProductPage = ({ cart, dispatch }) => {
  let [imageIndex, setImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

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

  const handleAddToCart = () => {
    if (!Auth.loggedIn()) {
      alert(`kindly log in to proceed with purchase!`);
    } else {
      
      dispatch(addToCart(product));
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
                {/* Image gallery section */}
                <div className="image-gallery-section">
                    <i
                        className="custom-left-image-btn bi bi-chevron-left"
                        onClick={handleImageIndexDecrease}
                    ></i>
                    
                    <img
                        className="product-image-gallery"
                        src={product.images[imageIndex]}
                        alt="product-image"
                    />
                    <i
                        className="custom-right-image-btn bi bi-chevron-right"
                        onClick={handleImageIndexIncrease}
                    ></i>
                    

                </div>
              <section className="product-info">
                <p>{product.productName}</p>
                <p className='fs-1'>${priceFormatter(product.price)}</p>
                <p>Rating: {product.averageRating}<span className="m-1"><i style={{color: 'gold'}}class="bi bi-star-fill"></i></span></p>
                <p>Stock Left: {product.stock}</p>
                <p>Reviews: {product.reviews.length}

                  {/* <!-- Button that triggers review modal --> */}
                  <span
                    type="button"
                    className="custom-review-btn btn"
                    data-bs-toggle="modal"
                    data-bs-target="#reviewModal"
                  >
                    Write a review
                  </span>
                </p>

                
                <button
                  onClick={handleAddToCart}
                  className="custom-addToCart-btn"
                >
                  {" "}
                  Add to cart
                </button>
              </section>
            </div>

            <section className="reviews-section">
              <h3
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab("description")}
              >
                Product Description
              </h3>
              {activeTab === "description" && <p className="m-3">{product.description}</p>}
              
              <h3
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </h3>
              {activeTab === "reviews" && product.reviews?.length > 0
                ? product.reviews.map((review, index) => (
                    <div className="user-review" key={index}>
                      <p className="user-initial text-light">
                        {review.reviewAuthor.charAt(0).toUpperCase()}
                      </p>
                      <em>
                        {review.reviewAuthor}
                        <span> on {(review.createdAt)}</span>
                      </em>
                      <p className="review-text">{review.reviewText}</p>
                      <p>Rating: {ratingConverter(review.rating)}</p>
                    
                    </div>
                  ))
                : activeTab === "reviews" && <p>No reviews yet.</p>}
            </section>
          </div>
        )}
        <ReviewForm productId = {productId}/>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
