import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import ProfileDisplay from "../components/ProfileDisplay";

const Home = () => {
  let photoArray = [
    "https://res.cloudinary.com/ddn6rojif/image/upload/v1757724334/Giorgio_Armani_Acqua_di_gio_EDP_1_vr2wne.jpg",
    "https://res.cloudinary.com/ddn6rojif/image/upload/v1757723665/Sony_WH-1000XM5_1_tdgpqy.webp",
    "https://res.cloudinary.com/ddn6rojif/image/upload/v1757722975/Apple_Iphone_14_pro_2_tdqxar.jpg",
  ];
  
  

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="custom-main-header">
        <ProfileDisplay />
        <Navbar />
      </div>
      <section className="banner">
        <div className="banner-content">
          <h1>QuickBasket</h1>

          <h3>Shop Smart... Shop Fast.</h3>
        </div>
      </section>

      <section className="products-section">
        <div>
          <h3 className="fs-1">Products</h3>
          <p>
            Shop our range of products, from fragrances to mobile phones,
            computers and much more!
          </p>
          <p>Hurry, shop quickly due to limited stock!</p>
          <Link to="/products">
            <button>View Products</button>
          </Link>
        </div>
        <img
          className="products-banner"
          src="https://res.cloudinary.com/ddn6rojif/image/upload/v1757722975/Apple_Iphone_14_pro_2_tdqxar.jpg"
          alt="products-banner"
        />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
