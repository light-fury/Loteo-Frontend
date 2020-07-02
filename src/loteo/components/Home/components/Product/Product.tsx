import React from "react";

import {Grid, Button} from "ui/components";

import "./product.scss";

type Props = {
    theme?: string;
    image?: string;
    title: string;
    text: React.ReactNode | string;
    amountLeftText: string[] | null;
    maxAmount: number | null;
    amountLeft: number | null;
    cta: string;
    onClick: (() => void) | null;
    onInfoClick: (() => void) | null;
};

const Product = ({
    theme = "yellow",
    image,
    title,
    text,
    amountLeftText,
    maxAmount,
    amountLeft,
    cta,
    onClick,
    onInfoClick
}: Props) => (
    <div className={`product ${theme}`}>
        {image && <img src={image} alt={title} className="product__logo" />}
        <Grid align="center" className="product__title">
            {title}
            {onInfoClick && <img src="icons/info.svg" alt={title} className="infoIcon" onClick={onInfoClick} />}
        </Grid>
        <div className="product__text">{text}</div>
        {amountLeft && (
            <div className="product__amountLeft">
                <div className="product__amountLeft__text">
                    {amountLeftText && amountLeftText[0]}
                    <strong>
                        {amountLeft}
                        {amountLeftText && amountLeftText[1]}
                    </strong>
                </div>
                {amountLeft && maxAmount && (
                    <div className="product__amountLeft__progress">
                        <div
                            className="product__amountLeft__progress__inner"
                            style={{width: `${amountLeft / (maxAmount / 100)}%`}}
                        />
                    </div>
                )}
            </div>
        )}
        {onClick && <Button className="product__button" text={cta} onClick={onClick} />}
    </div>
);

export default Product;
