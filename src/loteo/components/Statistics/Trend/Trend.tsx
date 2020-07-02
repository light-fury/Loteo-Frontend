import React from "react";

import {Grid} from "ui/components";

import "./trend.scss";

type Props = {
    children?: React.ReactNode;
    className?: string;
    backgroundImg?: string | null;
};

const Trend = ({children, className, backgroundImg = null}: Props) => (
    <Grid className={className} noPadding noWidth>
        {backgroundImg && (<div className="trend__content__icon"><img src={`/images/statistics/${backgroundImg}`} alt="trend-icon"/></div>)}
        <Grid align="start" wrap noPadding noWidth>
            {children}
        </Grid>
    </Grid>
);

export default Trend;
