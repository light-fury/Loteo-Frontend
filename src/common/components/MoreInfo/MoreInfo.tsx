import React from "react";
import {useTranslation} from "react-i18next";
import SVG from "react-inlinesvg";

import {Grid} from "ui/components";

import "./moreInfo.scss";

type Props = {
    text?: string;
    onClick?();
    theme?: string;
};

const MoreInfo = ({text = "", onClick, theme = "pink"}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "global";

    if (!text) {
        text = t(`${TRANSLATE}.moreInfo`);
    }

    return (
        <Grid align="center" className={`moreInfo ${theme} ${onClick ? "clickable" : ""}`} noWidth onClick={onClick}>
            <SVG src="icons/info.svg" className="moreInfo__icon">
                <img src="icons/info.svg" alt={t("messagePanel.alts.0.alt")} />
            </SVG>
            <div className="moreInfo__text">{text}</div>
        </Grid>
    );
};
export default MoreInfo;
