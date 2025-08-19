import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Home = () => {
    
    return (

        <div className="home-page">
            <Navbar/>
            <div class="slideshow">
                <div class="slide fade">
                    <img src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="City at night"/>
                </div>
                <div class="slide fade">
                    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80" alt="Beach sunrise"/>
                </div>
                <div class="slide fade">
                    <img src="https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1350&q=80" alt="Abstract waves"/>
                </div>
            </div>


        </div>
    )
}

export default Home;