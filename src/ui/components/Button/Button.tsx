import React from "react";

import {useBooleanState} from "hooks";

import "./button.scss";

export enum ButtonStyle {
    Default = "default",
    WhiteOutline = "whiteOutline",
    RedOutline = "redOutline",
    Grey = "grey"
}

type Props = {
    text: string;
    className?: string;
    style?: ButtonStyle;
    iconURL?: string;
    hoverIconURL?: string;
    onClick?: () => void;
    [key: string]: any;
};

const Button = ({text, className = "", style = ButtonStyle.Default, iconURL, hoverIconURL, onClick, ...other}: Props) => {
    const [hovered, setHovered, unsetHovered] = useBooleanState();

    return (
        <button
            className={`button ${className} ${style}`}
            onClick={onClick}
            onMouseEnter={setHovered}
            onMouseLeave={unsetHovered}
            {...other}
        >
            {text}
            {iconURL && (!hovered || !hoverIconURL) && <img className="icon" src={iconURL} alt="button icon"/>}
            {hoverIconURL && hovered && <img className="icon" src={hoverIconURL} alt="button icon"/>}
        </button>
    );
};

export default Button;
