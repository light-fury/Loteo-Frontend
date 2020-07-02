import React from "react";

import {getNumberFormattedString} from "common/utils";

import "./trendCard.scss";

type Props = {
    name: string;
    value: number | null;
    currency?: string | null;
    percent?: string | null;
    showDetail?: boolean;
    onOpen?(string);
    dialog?: string | null;
};

const TrendCard = ({name, value, currency, percent = null, showDetail = false, onOpen, dialog = null}: Props) => (
    <div className="trendCard">
        <div className="trendCard__name">{name}{percent ? <span>{percent}</span> : ""}</div>
        {(value !== null) && (
            <div className="trendCard__value">
                {getNumberFormattedString(value)}{currency ? <span className="trendCard__value__currency">{currency}</span> : ""}
                {showDetail && (
                    <span className="trendCard__value__detail" onClick={onOpen ? () => onOpen(dialog) : () => {}}>
                        show details
                    </span>
                )}
            </div>
        )}
    </div>
);

export default TrendCard;
