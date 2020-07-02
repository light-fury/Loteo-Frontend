import React from "react";
import {Trans} from "react-i18next";
import {useTranslation} from "react-i18next";
import {Parallax} from "react-scroll-parallax";

import Unavailable from "../Unavailable";

import "./fomo.scss";

type Props = {
    children?: React.ReactNode;
};

const Dice = ({children}: Props) => {
    const TRANSLATE = "backgroundBanners";
    const {t} = useTranslation();

    return (
        <div className="fomo-game game-banner">
            <Parallax className="moon">
                <img src="images/loteo-moon.png" alt={t(`${TRANSLATE}.alts.0.alt`)} />
            </Parallax>
            <div className="fomo-game__content">
                <div className="title"><h1><Trans i18nKey={`${TRANSLATE}.fomo.gamesSection.title`} /></h1></div>
                <Unavailable />
            </div>
            <div className="fomo-game__tab game-banner-tab">
                {children}
            </div>
        </div>
    );
};

export default Dice;
