//Libraries/frameworks
import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';

//Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDisplay from "../components/ProfileDisplay";

import { QUERY_SINGLE_PRODUCT } from "../utils/queries";


const ProductPage = () => {

    //Get the product id from the URL params
    const { productId } = useParams();
    //Fetch the product data using Apollo's useQuery hook

    const { loading, data } = useQuery(QUERY_SINGLE_PRODUCT, {
        //pass the product id as a variable to the query
        variables: { productId: productId }
    });
    
    const product = data?.product || {};

    return (

        <div className="d-flex flex-column align-items-center">
           <div className="custom-main-header">
                <ProfileDisplay />
                <Navbar />
            </div> 
            <div className="custom-singleProduct-page">
                {loading ? (
                    <p>Loading....</p>
                ) : (
                    <div className="product-layout">
                        <img className="product-image-gallery" src={product.images[0]}/>
                        <section className="product-info">
                            <p>{product.productName}</p>
                            <p>${product.price}</p>
                            <p>{product.description}</p>
                            <p>Rating: {product.averageRating}🌟</p>
                            <p>Stock Left: {product.stock}</p>
                            <p>Reviews: {product.reviews.length}</p>
                            <p>Write a review</p>
                            <button className="custom-addToCart-btn"> Add to cart</button>

                        </section>
                        <section className="reviews-section">
                            <h3>Reviews</h3>
                        </section>
                    </div>
                )}
            </div>
            <Footer />

        </div>
    )
}

export default ProductPage;