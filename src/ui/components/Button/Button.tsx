import React from "react";
import {useTranslation} from "react-i18next";

import {useBooleanState} from "hooks";

import "./button.scss";

export enum ButtonStyle {
    None = "",
    Default = "default",
    White = "white",
    TransparentWhite = "transparentWhite",
    Borderless = "borderless",
    BorderlessShadowBox = "borderlessShadowBox",
    WhiteOutline = "whiteOutline",
    Gold = "gold",
    RedOutline = "redOutline",
    Grey = "grey",
    RedCondensed = "redCondensed",
    GoldCondensed = "goldCondensed",
    GoldBright = "goldBright",
    Yellow = "yellow",
    YellowCondensed = "yellowCondensed",
    Pink = "pink",
    PinkCondensed = "pinkCondensed",
    Facebook = "facebook",
    Twitter = "twitter"
}

type Props = {
    text: string;
    className?: string;
    style?: ButtonStyle;
    iconURL?: string;
    hoverIconURL?: string;
    rightIconURL?: string;
    onClick?();
    [key: string]: any;
};

const Button = ({
    text,
    className = "",
    style = ButtonStyle.Default,
    iconURL,
    hoverIconURL,
    onClick,
    rightIconURL,
    ...other
}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "button";

    const [hovered, setHovered, unsetHovered] = useBooleanState();

    return (
        <button
            className={`button ${className} ${style}`}
            onClick={onClick}
            onMouseEnter={setHovered}
            onMouseLeave={unsetHovered}
            {...other}
        >
            {iconURL && (!hovered || !hoverIconURL) && (
                <img className="icon" src={iconURL} alt={t(`${TRANSLATE}.alts.0.alt`)} />
            )}
            {text}
            {rightIconURL && <img className="icon rightIcon" src={rightIconURL} alt={t(`${TRANSLATE}.alts.0.alt`)} />}
            {hoverIconURL && hovered && <img className="icon" src={hoverIconURL} alt={t(`${TRANSLATE}.alts.0.alt`)} />}
        </button>
    );
};

export default Button;
