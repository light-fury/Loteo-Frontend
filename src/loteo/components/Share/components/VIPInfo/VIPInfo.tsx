import React from "react";
import {useTranslation} from "react-i18next";

import {Grid} from "ui/components";

import "./VIPInfo.scss";

const VIPInfo = () => {
    const {t} = useTranslation();
    const TRANSLATE = "share.affiliatePrograms.VIPInfo";

    const tiers = [
        {
            image: "images/share/VIPInfo/bronze.svg",
            title: t(`${TRANSLATE}.tiers.bronze.title`),
            text: t(`${TRANSLATE}.tiers.bronze.text`)
        },
        {
            image: "images/share/VIPInfo/silver.svg",
            title: t(`${TRANSLATE}.tiers.silver.title`),
            text: t(`${TRANSLATE}.tiers.silver.text`)
        },
        {
            image: "images/share/VIPInfo/gold.svg",
            title: t(`${TRANSLATE}.tiers.gold.title`),
            text: t(`${TRANSLATE}.tiers.gold.text`)
        },
        {
            image: "images/share/VIPInfo/platinum.svg",
            title: t(`${TRANSLATE}.tiers.platinum.title`),
            text: t(`${TRANSLATE}.tiers.platinum.text`)
        },
        {
            image: "images/share/VIPInfo/diamond.svg",
            title: t(`${TRANSLATE}.tiers.diamond.title`),
            text: t(`${TRANSLATE}.tiers.diamond.text`)
        },
        {
            image: "images/share/VIPInfo/moonStone.svg",
            title: t(`${TRANSLATE}.tiers.moonStone.title`),
            text: t(`${TRANSLATE}.tiers.moonStone.text`)
        }
    ];

    return (
        <Grid wrap className="VIPInfo">
            {tiers.map(item => (
                <Grid
                    key={`VIPInfo-tier-${item.title}`}
                    align="center"
                    className="col-xs-12 col-sm-6 col-md-4 VIPInfo__item"
                >
                    <img src={item.image} alt={item.title} />
                    <div className="VIPInfo__item__info">
                        <strong>{item.title}</strong>
                        <div>{item.text}</div>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
};

export default VIPInfo;
