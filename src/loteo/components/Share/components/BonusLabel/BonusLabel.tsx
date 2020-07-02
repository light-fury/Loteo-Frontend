import React from "react";

import "./bonusLabel.scss";

type Props = {
    label?: string;
    text?: string;
    description?: string;
    theme?: string;
    id?: string;
};

const BonusLabel = ({label, text, description, theme = "yellow", id}: Props) => (
    <div className={`bonusLabel ${theme}`} id={id}>
        {label && <span>{label}</span>}
        {text && <strong>{text}</strong>}
        {description && <div>{description}</div>}
    </div>
);

export default BonusLabel;
