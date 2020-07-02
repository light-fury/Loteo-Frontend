import React from "react";

import {Grid} from "ui/components";

import "./loading.scss";

const Loading = () => (
    <Grid align="center" justify="center" className="loading">
        <video autoPlay muted loop playsInline>
            <source src="videos/loading.mp4" type="video/mp4" />
        </video>
    </Grid>
);

export default Loading;
