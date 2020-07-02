import React from "react";
import {useTranslation} from "react-i18next";

import {Grid, Button, ButtonStyle} from "ui/components";

import "./progressInfoCTA.scss";

type Props = {
    text: string;
    buttonStyle: string;
    theme?: string;
    available?: boolean;
    unlocked?: boolean;
    onClick?();
};

const ProgressInfoCTA = ({text, buttonStyle, theme = "white", available = true, unlocked = false, onClick}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "myAffiliate.progressInfo";

    return (
        <Grid
            align="center"
            justify="center"
            className={`progressInfoCTA ${theme} ${unlocked ? "unlocked" : "locked"} ${
                !available ? "unavailable" : ""
            }`}
        >
            {!unlocked && available && (
                <Button
                    text={text}
                    style={ButtonStyle[buttonStyle]}
                    onClick={onClick}
                    disabled={!onClick}
                    className="progressInfoCTA__button"
                />
            )}
            <Grid align="center" justify="space-between" direction="column" className="progressInfoCTA__info">
                <div className="progressInfoCTA__info__decor" />
                {available && <span>{t(`${TRANSLATE}.unlocked`)}</span>}
                <div className="progressInfoCTA__info__decor" />
            </Grid>
        </Grid>
    );
};

export default ProgressInfoCTA;
