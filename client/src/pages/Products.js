//Libraries/frameworks
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";

//Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDisplay from "../components/ProfileDisplay";

//Returns the "Products" page which displays all products

const Products = () => {
  const { loading, data, error } = useQuery(QUERY_ALL_PRODUCTS);
  const products = data?.products || [];


  return (
    <div className="d-flex flex-column align-items-center">
      <div className="custom-main-header">
        <ProfileDisplay />
        <Navbar />
      </div>
      <div className="custom-product-page">
        {loading ? (
            <h3>Loading...</h3>
        ) : (
            
                products.map((product, index) => (
                    
                    <div className="product-card mt-5" key={index}>
                        <img className="product-image"src={product.images[0]} alt=""/>
                        <div className="product-details">
                            <p className="product-price">${product.price}</p>
                            <p className="product-name">{product.productName}</p>
                            <p className="product-rating">Rating: {product.averageRating} stars</p>
    
                        </div>
                        <button className="custom-addToCart-btn bi bi-plus-square"> Add to cart</button>

                    </div>

                ))
            
        )

        }
      </div>

      <Footer />
    </div>
  );
};

export default Products;
