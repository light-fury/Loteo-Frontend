import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import {Grid} from "ui/components";

import "./unlockButton.scss";

type Props = {
    onClick?();
};

const UnlockButton = ({onClick}: Props) => {
    const {t} = useTranslation();

    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <button
            onMouseEnter={() => !!onClick && setHovered(true)}
            onMouseLeave={() => !!onClick && setHovered(false)}
            onClick={onClick}
            className={`unlockButton ${hovered ? "hovered" : ""} ${onClick ? "clickable" : ""}`}
        >
            <Grid align="center" justify="center">
                <img
                    src={hovered ? "icons/unlocked.svg" : "icons/locked.svg"}
                    alt={hovered ? t("global.unlock") : t("global.locked")}
                />
                {hovered ? t("global.unlock") : t("global.locked")}
            </Grid>
        </button>
    );
};

export default UnlockButton;
