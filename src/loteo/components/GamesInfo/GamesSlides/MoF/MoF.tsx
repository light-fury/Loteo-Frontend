import React from "react";
import {Trans} from "react-i18next";
import {useTranslation} from "react-i18next";
import {Parallax} from "react-scroll-parallax";

import "./moF.scss";

type Props = {
    children?: React.ReactNode;
};

const Dice = ({children}: Props) => {
    const TRANSLATE = "backgroundBanners";
    const {t} = useTranslation();

    return (
        <div className="moF-game game-banner">
            <Parallax className="moon">
                <img src="images/loteo-moon.png" alt={t(`${TRANSLATE}.alts.0.alt`)} />
            </Parallax>
            <div className="moF-game__content">
                <div className="title"><h1><Trans i18nKey={`${TRANSLATE}.mof.gamesSection.title`} /></h1></div>
                <div className="detail">
                    <Trans i18nKey={`${TRANSLATE}.mof.gamesSection.text`} />
                </div>
            </div>
            <div className="moF-game__tab game-banner-tab">
                {children}
            </div>
        </div>
    );
};

export default Dice;
