import React from "react";
import {useTranslation} from "react-i18next";

import "./etherscanLink.scss";

type Props = {
    url: string;
};

const EtherscanLink = ({url}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "etherscanLink";

    return (
        <a href={url} className="etherscanLink" target="_blank" rel="noopener noreferrer">
            <img src="icons/etherscan.svg" alt={t(`${TRANSLATE}.alts.0.alt`)}/>
            <div className="text">{t(`${TRANSLATE}.check`)}</div>
        </a>
    );
};
export default EtherscanLink;
