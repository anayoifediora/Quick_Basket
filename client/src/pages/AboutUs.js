import React from "react";
import { useSelector, useDispatch } from "react-redux";

//Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDisplay from "../components/ProfileDisplay";
import SearchResult from "./SearchResult";

const AboutUs = () => {
  const searchTerm = useSelector((state) => state.searchTerm);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="custom-main-header">
        <ProfileDisplay />
        <Navbar />
      </div>
      {searchTerm && <SearchResult />}
      <div className="custom-aboutUs-page">
        <h3>About Us</h3>
        <p>
          QuickBasket was born from a belief that shopping should be more than
          just a task — it should be an <strong>effortless, elevated experience.</strong>
        </p>
        <p>
          We understand that true luxury today is time, simplicity, and
          reliability. That’s why we’ve created a platform that offers carefully
          selected products, seamless navigation, and trusted service — all
          designed to fit beautifully into your lifestyle.
        </p>
        <p>
            Every item on QuickBasket is chosen with intention. From daily
            essentials to premium finds, our collection is curated to meet the
            highest standards of quality, value, and sophistication. No clutter. No
            compromises. Only what truly deserves a place in your basket.
        </p>
        <p>
            At the heart of QuickBasket is a commitment to excellence:
            <ul>
                <li>A smooth and refined shopping journey</li>
                <li>A thoughtfully curated product range</li>
                <li>Secure, trusted transactions</li>
                <li>Reliable fulfillment and customer care</li>
            </ul>
        </p>
        <p>We are not just here to sell products - we are here to <strong>simplify your life with elegance and precision.</strong></p>
        <p>QuicBasket is where convenience meets class.</p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
