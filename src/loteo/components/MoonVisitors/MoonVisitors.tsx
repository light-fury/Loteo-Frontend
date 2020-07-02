import React from "react";
import {useTranslation} from "react-i18next";

import {LastWinners} from "loteo/components";

import "./moonVisitors.scss";

const MoonVisitors = () => {
    const {t} = useTranslation();
    const TRANSLATE = "moonVisitors";

    return (
        <div className="moonVisitors">
            <div className="gameTitle">{t(`${TRANSLATE}.gameTitle`)}</div>
            <div className="title">{t(`${TRANSLATE}.title`)}</div>
            <LastWinners />
        </div>
    );
};
export default MoonVisitors;
