import React from "react";
import {useTranslation} from "react-i18next";

import "./quitButton.scss";

type Props = {
    onClick();
    iconAlt?: string;
    text?: string;
    bold?: boolean;
};

const QuitButton = ({onClick, iconAlt, text, bold}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "quitButton";

    return (
        <div className="quitButton" onClick={onClick}>
            <img src={bold ? "icons/close-bold.svg" : "icons/close.svg"} alt={iconAlt || t(`${TRANSLATE}.alt`)} />
            {text && <div className="text">{text}</div>}
        </div>
    );
};

export default QuitButton;
