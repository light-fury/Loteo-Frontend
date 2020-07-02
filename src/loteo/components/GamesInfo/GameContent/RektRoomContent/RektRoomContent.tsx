import React, {useContext} from "react";
import {Trans} from "react-i18next";
import {useTranslation} from "react-i18next";

import {login} from "auth/api";
import {Grid} from "ui/components";
import {AuthContext} from "auth/contexts";
import {MixButton} from "ui/components";
import {NavigationContext} from "app/contexts";

import "./rektRoomContent.scss";

const RektRoomContent = () => {
    const TRANSLATE = "gameDetails";
    const {t} = useTranslation();

    const {loggedIn} = useContext(AuthContext);
    const {showApolloDailyLottery} = useContext(NavigationContext);

    const handlePlay = () => {
        if (loggedIn) {
            showApolloDailyLottery();
        } else {
            login(undefined, true);
        }
    };

    return (
        <div className="rektRoom-section">
            <Grid className="rektRoom-section__content" wrap noPadding noWidth justify="space-between">
                <Grid wrap noWidth justify="center" className="currencies">
                    <div className="rektRoom-section__content__currencies">
                        <div className="start">
                            <div className="day">{t(`${TRANSLATE}.time.day`)}</div>
                            <div className="separator" />
                            <div className="time">{t(`${TRANSLATE}.time.time`)}</div>
                        </div>
                        <div className="item">
                            <div className="item--currency">{t(`${TRANSLATE}.currencyTag.minBET`)}:</div>
                            <div className="item--value">100 LOTEU</div>
                        </div>
                        <div className="item">
                            <div className="item--currency">{t(`${TRANSLATE}.currencyTag.maxBet`)}:</div>
                            <div className="item--value">10 000LOTEU</div>
                        </div>
                        <div className="item">
                            <div className="item--currency">{t(`${TRANSLATE}.currencyTag.accepted`)}:</div>
                            <div className="item--value">LOTEU</div>
                        </div>
                    </div>
                    <div className="rektRoom-section__content__chart">
                        <img src="/images/game/chart.png" alt="game-chart"/>
                        <div className="smallInfo">
                            <Trans i18nKey={`${TRANSLATE}.time.info`} />
                        </div>
                    </div>
                </Grid>
                <Grid className="rektRoom-section__content__button" noWidth align="center" justify="center">
                    <MixButton text="PLAY" style="red" onClick={handlePlay}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default RektRoomContent;
