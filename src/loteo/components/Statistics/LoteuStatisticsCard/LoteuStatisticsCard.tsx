import React from "react";

import "./loteuStatisticsCard.scss";

type Props = {
    type: string;
    value: number | string;
    barColor: string;
    className?: string;
};

const LoteuStatisticsCard = ({type, value, barColor, className}: Props) => (
    <div className={`loteuStatisticsCard ${className}`}>
        <div className="loteuStatisticsCard__bar" style={{backgroundColor: barColor, height: "8px"}} />
        <div className="loteuStatisticsCard__value">{value}</div>
        <div className="loteuStatisticsCard__type">{type}</div>
    </div>
);

export default LoteuStatisticsCard;
