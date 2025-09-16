import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import ProfileDisplay from '../components/ProfileDisplay';

const Home = () => {


    return (
        <div className="d-flex flex-column align-items-center">
            <div className="custom-main-header">
                <ProfileDisplay/>
                <Navbar/>
            </div>
            <section className="banner">
                
                <div className="banner-content">
                    <h1>QuickBasket</h1>

                    <h3>Shop Smart... Shop Fast.</h3>
                </div>
            </section>

            <section className='products-section'>
                <div>
                    <h3 className='fs-1'>Products</h3>
                    <p>
                    Shop our range of products, from fragrances to mobile phones, computers and much more!  
                    </p>
                    <p>Hurry, shop quickly due to limited stock!</p>
                    <Link to="/products"><button>View Products</button></Link>
                </div>
                <img className='products-banner' src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80" alt="products-banner"/>
                
            </section>
            <Footer/>
        </div>
    )
}

export default Home;