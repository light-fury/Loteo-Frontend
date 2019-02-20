import React from "react";

import "./linkButton.scss";

type Props = {
    text: string;
    className?: string;
    active?: boolean;
    onClick: () => void;
};

const LinkButton = ({text, className = "", active, onClick}: Props) => (
    <div className={`linkButton ${className} ${active ? "active" : ""}`} onClick={onClick}>
        {text}
    </div>
);
export default LinkButton;
