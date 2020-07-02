import React, {useContext} from "react";
import {Trans} from "react-i18next";
import {useTranslation} from "react-i18next";

import {login} from "auth/api";
import {Grid} from "ui/components";
import {AuthContext} from "auth/contexts";
import {MixButton} from "ui/components";
import {NavigationContext} from "app/contexts";

import "./weeklyLotteryContent.scss";

const WeeklyLotteryContent = () => {
    const TRANSLATE = "gameDetails";
    const {t} = useTranslation();

    const {loggedIn} = useContext(AuthContext);
    const {showWeeklyLottery} = useContext(NavigationContext);

    const handlePlay = () => {
        if (loggedIn) {
            showWeeklyLottery();
        } else {
            login(undefined, true);
        }
    };

    return (
        <div className="weeklyLottery-section">
            <Grid className="weeklyLottery-section__content" wrap noPadding noWidth justify="space-between">
                <Grid wrap noWidth justify="center" className="currencies">
                    <div className="weeklyLottery-section__content__currencies">
                        <div className="start">
                            <div className="day">EVERY SUNDAY</div>
                            <div className="separator" />
                            <div className="time">12:00 CET</div>
                        </div>
                        <div className="item">
                            <div className="item--currency">{t(`${TRANSLATE}.currencyTag.specialPower`)}:</div>
                            <div className="item--value">100LOTEU</div>
                        </div>
                        <div className="item">
                            <div className="item--currency">{t(`${TRANSLATE}.currencyTag.minBET`)}:</div>
                            <div className="item--value">10Eur/Eth</div>
                        </div>
                        <div className="item">
                            <div className="item--currency">{t(`${TRANSLATE}.currencyTag.maxBet`)}:</div>
                            <div className="item--value">No limit</div>
                        </div>
                        <div className="item">
                            <div className="item--currency">{t(`${TRANSLATE}.currencyTag.accepted`)}:</div>
                            <div className="item--value">ETH, BTC</div>
                        </div>
                    </div>
                    <div className="weeklyLottery-section__content__chart">
                        <img src="/images/game/weekly-chart.png" alt="game-chart"/>
                        <div className="smallInfo">
                            <Trans i18nKey={`${TRANSLATE}.time.info`} />
                        </div>
                    </div>
                </Grid>
                <Grid className="apolloLottery-section__content__button" noWidth align="center" justify="center">
                    <MixButton text="PLAY" style="red" onClick={handlePlay}/>
                </Grid>
            </Grid>
            <div className="apolloLottery-section__button"><MixButton text="PLAY" style="red" onClick={handlePlay}/></div>
        </div>
    );
};

export default WeeklyLotteryContent;
