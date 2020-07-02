import React from "react";

import "./affiliateCard.scss";

type Props = {
    percent: number;
    value: number;
    currency: string;
};

const AffiliateCard = ({percent, value, currency}: Props) => (
    <div className="affiliateCard">
        <div className="affiliateCard__pool">{percent}<span>% Pool</span></div>
        <div className="affiliateCard__value">{value} {currency}</div>
    </div>
);

export default AffiliateCard;
