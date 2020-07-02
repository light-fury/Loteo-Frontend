import React from "react";
import {useTranslation} from "react-i18next";
import SVG from "react-inlinesvg";

import {Grid} from "ui/components";
import {getNumberFormattedString} from "common/utils";

import "./affiliateVIPStatus.scss";

type Tier = {
    theme: string;
    image: string;
    title: string;
    amount: number;
    bonus: number | null;
};

type Props = {
    amount: number;
    tiers: Tier[];
};

const AffiliateVIPStatus = ({amount, tiers}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "myAffiliate.VIPInfo";

    return (
        <Grid wrap className="affiliateVIPStatus">
            {tiers.map(item => (
                <Grid
                    key={`affiliateVIPInfo-${item.theme}`}
                    className="col-xs-12 col-sm-6 col-md-4 affiliateVIPStatus__item"
                >
                    <Grid
                        align="center"
                        className={`affiliateVIPStatus__item__inner ${item.theme} ${
                            amount >= item.amount ? "active" : ""
                        }`}
                    >
                        <SVG
                            src={item.image}
                            className={`affiliateVIPStatus__item__inner__icon ${amount >= item.amount ? "active" : ""}`}
                        >
                            <img src={item.image} alt={item.theme} />
                        </SVG>
                        <div className="affiliateVIPStatus__item__inner__text">
                            <Grid align="baseline" justify="space-between">
                                <strong>{item.title}</strong>
                                {item.bonus && <span>+ {getNumberFormattedString(item.bonus)} LOTES</span>}
                            </Grid>
                            <span>
                                {amount <= item.amount
                                    ? getNumberFormattedString(amount)
                                    : getNumberFormattedString(item.amount)}{" "}
                                / {getNumberFormattedString(item.amount)} {t(`${TRANSLATE}.toGet`)}{" "}
                                {getNumberFormattedString(item.amount * 10)} LOTEU
                            </span>
                        </div>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

export default AffiliateVIPStatus;
