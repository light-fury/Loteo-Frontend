import React from "react";
import {useTranslation} from "react-i18next";

import {Prizes} from "loteo/components";

import "./prize.scss";

const Prize = () => {

    const {t} = useTranslation();
    const TRANSLATE = "gameDetails.prize";

    return (
        <div className="gamesInfo__weeklyLottery__prize section">
            <div className="title">{t(`${TRANSLATE}.t1`)}</div>
            <Prizes/>
        </div>
    );
};
export default Prize;
