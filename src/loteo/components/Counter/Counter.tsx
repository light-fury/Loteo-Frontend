import React from "react";
import {useTranslation} from "react-i18next";

import Number from "./Number";

import "./counter.scss";

type Props = {
    seconds: number;
    daily?: boolean;
};

const Counter = ({seconds, daily}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "counter";

    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    return (
        <div className="counter">
            {!daily && (
                <>
                    <Number value={days} text={t(`${TRANSLATE}.d`)} />
                    <div className="separator">:</div>
                </>
            )}
            <Number value={hours} text={t(`${TRANSLATE}.h`)} />
            <div className="separator">:</div>
            <Number value={minutes} text={t(`${TRANSLATE}.m`)} />
            <div className="separator">:</div>
            <Number value={seconds} text={t(`${TRANSLATE}.s`)} />
        </div>
    );
};
export default React.memo(Counter);
