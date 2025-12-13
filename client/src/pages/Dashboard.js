//Libraries
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { useSelector } from "react-redux";

//Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfileDisplay from "../components/ProfileDisplay";
import SearchResult from "./SearchResult";

//Helper functions
import Auth from "../utils/auth";
import { priceFormatter } from "../utils/helpers";

const Dashboard = () => {

    const cart = useSelector(state => state.cart);
    const searchTerm = useSelector((state) => state.searchTerm);
    
    // const dispatch = useDispatch();
  const { data, loading} = useQuery(QUERY_SINGLE_USER, {
    variables: {
      username: Auth.getProfile().data.username,
    },
  });

  const userOrders = data?.user?.orders || [];
    
    console.log(userOrders);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="custom-main-header">
        <ProfileDisplay/>
        <Navbar />
      </div>
      { searchTerm &&        
          <SearchResult/>
        
      }
      <div className="custom-dashboard-page">
        <h2>My Orders</h2>
        <div className="mb-4 p-3 border bg-secondary-subtle rounded-3">
            {loading ? ( <p>Loading...</p>) : (
                userOrders.length === 0 ? (
                    <p className="text-muted fs-4">You have no orders yet.</p>
                ) : (
                    userOrders.map((order, index) => (
                        <div key={index} className="mb-4 p-3 border border-black bg-white rounded-3">
                            <h5 className="fs-3 mb-3">Order ID: {order._id.substring(16, 24)}</h5>
                            <p className="text-muted">Order date: {order.createdAt}</p>
                            <p className="fs-4 fw-bold text-success">Total: ${priceFormatter(order.totalPrice.toFixed(2))}</p>
                            <h4 style={{textDecoration: "underline"}}>Products</h4>
                            {order.products.map((item, idx) => (
                                <div key={idx} className="mb-2 p-2 border-bottom d-flex justify-content-between">
                                    <p className="m-1 fs-5">{idx + 1}. {item.productName}</p>
                                    <div className="d-flex flex-column m-1">
                                        <p className="fw-bold fs-5">${priceFormatter(item.price.toFixed(2))}</p>
                                        <p className="text-muted">Qty: 1</p>
                                    </div>
                                </div>
                            ))}
                            <div className="m-3">
                                <h5>Delivery Address</h5>
                                <p className="text-muted">{order.deliveryAddress.street},<br></br>
                                {order.deliveryAddress.suburb}<br></br>
                                {order.deliveryAddress.state} {order.deliveryAddress.postCode}
                                </p>
                            </div>
                        </div>
                    ))
                )
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
