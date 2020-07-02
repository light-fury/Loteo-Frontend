import React from "react";

import "./mixButton.scss";

type Props = {
    text: string;
    style?: string;
    onClick?();
};

const MixButton = ({
    text = "",
    style = "default",
    onClick
}: Props) => {
    const realStyle = text === "INCREASE MY CHANCE" ? "green" : style;
    return (
        <div
            className={`mixButton ${realStyle}`}
            onClick={onClick}
        >
            <div className={`mixButton--top-${realStyle}`}></div>
            <div className={`mixButton--bottom-${realStyle}`}></div>
            <div className={`mixButton--out-${realStyle}`}></div>
            <div className={`mixButton--bottom-${realStyle}-spread`}></div>
            <div className={`mixButton--text ${text === "INCREASE MY CHANCE" ? "smaller" : ""}`}>{text}</div>
        </div>
    );
};

export default MixButton;
