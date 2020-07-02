import React from "react";
import {useTranslation} from "react-i18next";

import "./rules.scss";

const Rules = () => {

    const {t} = useTranslation();
    const TRANSLATE = "gameDetails.rules";

    return (
        <div className="gamesInfo__weeklyLottery__rules section">
            <div className="title">{t(`${TRANSLATE}.t1`)}</div>
            <p>
                {t(`${TRANSLATE}.p1`)}
            </p>
            <p>
                {t(`${TRANSLATE}.p2`)}
            </p>
            <p>
                {t(`${TRANSLATE}.p3`)}
            </p>
        </div>
    );
};

export default Rules;
