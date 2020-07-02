import React from "react";

import {Grid} from "ui/components";
import {
    LoteoPlatform,
    SocialNetworks,
    Finance
} from "loteo/components";
import NavBar from "./NavBar";

import "./statistics.scss";

const Statistics = () => {
    return (
        <Grid className="statistics">
            <NavBar />
            <div className="statistics__content">
                <SocialNetworks />
                <LoteoPlatform />
                <Finance />
            </div>
        </Grid>
    );
};

export default Statistics;
