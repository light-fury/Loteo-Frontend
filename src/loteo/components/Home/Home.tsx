import React from "react";

import {Header, Footer, Background, Dashboard} from "loteo/components";

import "./home.scss";

const Home = () => (
    <div className="home">
        <Background/>
        <Header/>
        <div className="homeCenter">
            <Dashboard/>
        </div>
        <Footer showSubscribe/>
    </div>
);
export default Home;
