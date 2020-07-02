import React from "react";
import {Trans} from "react-i18next";
import {useTranslation} from "react-i18next";
import {Parallax} from "react-scroll-parallax";

import "./weeklyLottery.scss";

type Props = {
    children?: React.ReactNode;
};

const WeeklyLottery = ({children}: Props) => {
    const TRANSLATE = "backgroundBanners";
    const {t} = useTranslation();

    return (
        <div className="weeklyLottery-game game-banner">
            <Parallax className="moon">
                <img src="images/loteo-moon.png" alt={t(`${TRANSLATE}.alts.0.alt`)} />
            </Parallax>
            <div className="weeklyLottery-game__content">
                <div className="title"><h1><Trans i18nKey={`${TRANSLATE}.weekly.gamesSection.title`} /></h1></div>
                <div className="detail">
                    <Trans i18nKey={`${TRANSLATE}.weekly.gamesSection.text`} />
                </div>
            </div>
            <div className="weeklyLottery-game__tab game-banner-tab">
                {children}
            </div>
        </div>
    );
};

export default WeeklyLottery;
