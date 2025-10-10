import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_REVIEW } from "../utils/mutations";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";

import Auth from "../utils/auth";

const ReviewForm = ( { productId }) => {

  const [formState, setFormState] = useState({ reviewText: '', rating: '' });
  // This state controls showing a thank-you message after successful submission
  const [successMessage, setSuccessMessage] = useState("");
  const [addReview, { error, data, loading }] = useMutation(ADD_REVIEW, {
    //This update method allows us to update existing product review list in the cache
    update(cache, { data: { addReview }}){

      try {
        //Retrieve existing product data that is stored in the cache under 'QUERY_SINGLE_PRODUCT'
        const { existingData } = cache.readQuery({ 
          query: QUERY_SINGLE_PRODUCT,
          variables: { productId }
        });

        // If there's no product data in cache yet, skip updating
        if (!existingData?.product) return;

        //Update the cache
        cache.writeQuery({
          query: QUERY_SINGLE_PRODUCT,
          variables: { productId },
          data: { 
            product: {
              ...existingData.product,
              reviews: [...existingData.product.reviews, addReview],
            }
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  })

  const profile = Auth.loggedIn() ? Auth.getProfile().data : null;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!Auth.loggedIn()) {
      alert('You need to be logged in to submit a review');
      return false;
    }
    try {
      const { data, error } = await addReview({
        variables: { ...formState, 
          reviewAuthor: profile.username,
          productId: productId
        }
      })
      //clear form values
    setFormState({
      reviewText: '',
      rating: ''
    });
    } catch (e) {
      console.log(e)
    }

    
    
    //Show thank you message
    setSuccessMessage('🙏 Thank you for your review');
    setTimeout(() => setSuccessMessage(''), 3000);
  }
  
  // Updates state as the user types into form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      //This syntax copies all existing key-value pairs in formState into the new object being created.
      ...formState,
      // Updates the specific key (name) with the new value from the input field.
      [name]: name === 'rating' ? parseInt(value) : value,
    });
  }
  return (
    <>
      
    
        {/* <!-- Review Modal --> */}
        
          <div
            className="modal fade"
            id="reviewModal"
            tabIndex="-1"
            aria-labelledby="reviewModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="reviewModalLabel">
                    Review
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body d-flex flex-column">
                  <div className="mb-3">
                    <label>Add Review</label>
                    <textarea name="reviewText" onChange={handleInputChange} value={formState.reviewText} className="form-control" rows="3"></textarea>
                  </div>
                  <div className="mb-3">
                    <label>Rating</label>
                    <select className="form-select form-control" aria-label="Default select example" name="rating" onChange={handleInputChange} value={formState.rating} >
                      <option value="">Select Rating</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                </div>
                {/* Display thank-you message if review is successfully submitted */}
              {successMessage && (
                <p className="text-success text-center mt-2">{successMessage}</p>
              )}

              {/* Display loading or error messages */}
              {loading && <p className="text-muted text-center">Submitting...</p>}
              {error && (
                <p className="text-danger text-center">
                  Something went wrong. Please try again.
                </p>
              )}
                <div className="modal-footer">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" onClick={handleFormSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
       
    </>
  );
};

export default ReviewForm;