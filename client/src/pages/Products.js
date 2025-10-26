//Libraries/frameworks
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import { Link } from 'react-router-dom';

//Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDisplay from "../components/ProfileDisplay";

//Helper functions
import { priceFormatter } from "../utils/helpers";

//Returns the "Products" page which displays all products

const Products = ({ cart, dispatch }) => {
  const { loading, data, error } = useQuery(QUERY_ALL_PRODUCTS);
  const products = data?.products || [];
 
  
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="custom-main-header">
        <ProfileDisplay cart={cart}/>
        <Navbar />
      </div>
      <div className="custom-product-page">
        {loading ? (
            <h3>Loading...</h3>
        ) : (
            
                products.map((product, index) => (
                    
                    
                      <div className="product-card mt-5" key={index}>
                          <Link to={`/products/${product._id}`}><img className="product-image"src={product.images[0]} alt=""/></Link>
                          <div className="product-details">
                              <p className="product-price">${priceFormatter(product.price)}</p>
                              <p className="product-name">{product.productName}</p>
                              <p className="product-rating text-body-secondary">Rating: {product.averageRating} <i style={{color: 'gold'}}class="bi bi-star-fill"></i></p>
      
                          </div>
                          <button className="custom-addToCart-btn align-self-center"> Add to cart</button>

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
