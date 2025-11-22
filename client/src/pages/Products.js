//Libraries/frameworks
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import { Link } from 'react-router-dom';
import { addToCart } from "../State/cartSlice";
import { useSelector, useDispatch } from "react-redux";

//Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDisplay from "../components/ProfileDisplay";
import SearchResult from "./SearchResult";

//Helper functions
import { priceFormatter } from "../utils/helpers";
import Auth from "../utils/auth";


//Returns the "Products" page which displays all products

const Products = () => {

  const cart = useSelector(state => state.cart);
  const searchTerm = useSelector((state) => state.searchTerm);
  const dispatch = useDispatch();

  const [loggedInStatus, setLoggedInStatus] = useState(true);
  
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const products = data?.products || [];
 
  // const handleAddToCart = () => {
  //     if (!Auth.loggedIn()) {
  //       setLoggedInStatus(false)
  //     } else {
        
  //       dispatch(addToCart(product));
  //     }
  //   };
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="custom-main-header">
        <ProfileDisplay/>
        <Navbar />
      </div>
      { searchTerm &&        
          <SearchResult/>
        
      }
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
                              <p className="product-rating text-body-secondary">Rating: {!product.averageRating ? "No ratings yet" : product.averageRating} <i style={!product.averageRating ? {color: "white"} : {color: 'gold'}}class="bi bi-star-fill"></i></p>
      
                          </div>
                          
                          <button onClick={() => dispatch(addToCart(product))} className="custom-addToCart-btn align-self-center"> Add to cart</button>

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
