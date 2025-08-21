import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Home = () => {
    
    return (
        <div>
            {/* <Navbar/> */}
            <section className="banner">
                <Navbar/>
                <div className="banner-content">
                    <h1>QuickBasket</h1>

                    <h3>Shop Smart... Shop Fast.</h3>
                </div>

            </section>

            <section className='products-section'>
                <div>
                    <h3 className='fs-1'>Products</h3>
                    <p>
                    Shop our range of products, from fragrances to mobile phones, computes and much more!  
                    </p>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</p>
                    <button>View Products</button>
                </div>
                <img className='products-banner' src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80" alt="products-banner"/>
                
            </section>
        
        </div>
    )
}

export default Home;