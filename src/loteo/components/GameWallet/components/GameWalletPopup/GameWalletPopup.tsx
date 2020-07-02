import React from "react";

import {Button, ButtonStyle} from "ui/components";

type Props = {
    className?: string;
    title?: string;
    text: string;
    buttonText: string;
    onClick();
};

const GameWalletPopup = ({
    className = "",
    title,
    text,
    buttonText,
    onClick
}: Props) => {
    return (
        <div className={`gameWallet__popup ${className}`} data-arrowpos={10}>
            {title && <strong>{title}</strong>}
            <span>{text}</span>
            <Button
                text={buttonText}
                style={ButtonStyle.RedCondensed}
                onClick={onClick}
            />
        </div>
    );
};

export default GameWalletPopup;
