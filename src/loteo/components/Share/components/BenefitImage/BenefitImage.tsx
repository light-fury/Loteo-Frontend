import React from "react";

import {Grid} from "ui/components";

import "./benefitImage.scss";

type Props = {
    image: string;
    icon?: string;
    title?: React.ReactNode | string;
    price?: string;
};

const BenefitImage = ({image, icon, title, price}: Props) => (
    <div className="benefitImage">
        <Grid
            direction="column"
            align="center"
            justify="center"
            className="benefitImage__inner"
            style={{
                background: `url(${image}) center / contain no-repeat`
            }}
        >
            {icon && <img src={icon} alt={icon} />}
            {title && <span className="benefitImage__inner__title">{title}</span>}
            {price && <span className="benefitImage__inner__price">{price}</span>}
        </Grid>
        <div className="benefitImage__shadow" />
    </div>
);

export default BenefitImage;
