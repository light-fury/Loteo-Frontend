import React, {ReactNode} from "react";
import {useTranslation} from "react-i18next";

import "./countInfo.scss";

type Props = {
    text?: string;
    valueText?: string | ReactNode;
    value: number;
    total: number;
};

const CountInfo = ({text, value, valueText, total}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "countInfo";

    return (
        <div className="countInfo">
            <div className="info">
                <div className="text">{text || ""}</div>
                <div className="remaining">{valueText ? valueText : `${value} ${t(`${TRANSLATE}.valueLeft`)}`}</div>
            </div>
            <div className="progressBar">
                <div className="bar" style={{width: `${value / Math.max(total, value) * 100}%`}}/>
            </div>
        </div>
    );
};
export default CountInfo;
