import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

import { QUERY_ALL_PRODUCTS } from "../utils/queries";

import ProfileDisplay from "../components/ProfileDisplay";
import SearchResult from "./SearchResult";
//Helper functions
import { priceFormatter } from "../utils/helpers";

const Home = () => {
  let photoArray = [
    "https://res.cloudinary.com/ddn6rojif/image/upload/v1757724334/Giorgio_Armani_Acqua_di_gio_EDP_1_vr2wne.jpg",
    "https://res.cloudinary.com/ddn6rojif/image/upload/v1757723665/Sony_WH-1000XM5_1_tdgpqy.webp",
    "https://res.cloudinary.com/ddn6rojif/image/upload/v1757722975/Apple_Iphone_14_pro_2_tdqxar.jpg",
  ];

  const searchTerm = useSelector((state) => state.searchTerm);
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  const products = data?.products || [];

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="custom-main-header">
        <ProfileDisplay />
        <Navbar />
      </div>
      {searchTerm && <SearchResult />}
      <section className="banner">
        <div className="banner-content">
          <h1>QuickBasket</h1>

          <h3>Shop Smart... Shop Fast.</h3>
        </div>
      </section>

      <section className="products-section">
        <div className="products-comment">
          <h3 className="fs-1">Products</h3>
          <p>
            Shop our range of products, from fragrances to mobile phones,
            computers and much more!
          </p>
          <p>Hurry, shop quickly due to limited stock!</p>
          <Link to="/products">
            <button>View All Products</button>
          </Link>
        </div>
        <div className="products">
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            products.slice(3, 6).map((product, index) => (
              <div className="product-card mt-5" key={index}>
                <Link to={`/products/${product._id}`}>
                  <img
                    className="product-image"
                    src={product.images[0]}
                    alt=""
                  />
                </Link>
                <div className="product-details">
                  <p className="product-price">
                    ${priceFormatter(product.price)}
                  </p>
                  <p className="product-name">{product.productName}</p>
                  <p className="product-rating text-body-secondary">
                    Rating:{" "}
                    {!product.averageRating
                      ? "No ratings yet"
                      : product.averageRating}{" "}
                    <i
                      style={
                        !product.averageRating
                          ? { color: "white" }
                          : { color: "gold" }
                      }
                      class="bi bi-star-fill"
                    ></i>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
