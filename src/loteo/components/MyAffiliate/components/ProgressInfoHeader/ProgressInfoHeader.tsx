import React from "react";
import {useTranslation} from "react-i18next";
import SVG from "react-inlinesvg";

import {Grid} from "ui/components";

import "./progressInfoHeader.scss";

type Props = {
    theme?: string;
    unlocked?: boolean;
    available?: boolean;
    title: string;
    subtitle: string;
    icon: string;
    unlockedIcon: string;
};

const ProgressInfoHeader = ({
    theme = "red",
    unlocked = false,
    available = false,
    title,
    subtitle,
    icon,
    unlockedIcon
}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "myAffiliate.progressInfo";

    return (
        <Grid
            align="center"
            className={`progressInfoHeader ${theme} ${unlocked ? "unlocked" : "locked"} ${
                available ? "available" : ""
            }`}
        >
            {unlocked ? (
                <div className="progressInfoHeader__unlockedIcon">
                    <img src={unlockedIcon} alt={title} />
                </div>
            ) : (
                <SVG src={icon} className={`progressInfoIcon ${available ? theme : "pink"}`}>
                    <img src={icon} alt={title} />
                </SVG>
            )}
            <div className="progressInfoHeader__text">
                {unlocked && <span>{t(`${TRANSLATE}.unlockedHeader`)}</span>}
                <strong>{title}</strong>
                {!unlocked && <small>{subtitle}</small>}
            </div>
        </Grid>
    );
};

export default ProgressInfoHeader;
