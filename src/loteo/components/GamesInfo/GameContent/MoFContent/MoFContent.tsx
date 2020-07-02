import React, {useContext} from "react";
import {useTranslation} from "react-i18next";

import {login} from "auth/api";
import {Grid} from "ui/components";
import {AuthContext} from "auth/contexts";
import {MixButton} from "ui/components";
import {NavigationContext} from "app/contexts";

import "./moFContent.scss";

const MoFContent = () => {
    const TRANSLATE = "gameDetails";
    const {t} = useTranslation();

    const {loggedIn} = useContext(AuthContext);
    const {navigateTo} = useContext(NavigationContext);

    const handlePlay = () => {
        if (loggedIn) {
            navigateTo("/moon-of-fortune");
        } else {
            login(undefined, true);
        }
    };

    return (
        <div className="moF-section">
            <Grid className="moF-section__content" wrap noPadding noWidth justify="space-between">
                <Grid wrap noWidth justify="center" className="currencies">
                    <div className="moF-section__content__currencies">
                        <div className="item">
                            <div className="item--currency edge">{t(`${TRANSLATE}.currencyTag.edge`)}:</div>
                            <div className="item--value">3% - Distributed to Apollo 11</div>
                        </div>
                        <div className="item">
                            <div className="item--currency">{t(`${TRANSLATE}.currencyTag.minBET`)}:</div>
                            <div className="item--value">1 LOTEU</div>
                        </div>
                        <div className="item">
                            <div className="item--currency">{t(`${TRANSLATE}.currencyTag.maxBet`)}:</div>
                            <div className="item--value">1 000 000 LOTEU</div>
                        </div>
                        <div className="item">
                            <div className="item--currency">{t(`${TRANSLATE}.currencyTag.accepted`)}:</div>
                            <div className="item--value">LOTEU</div>
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

export default MoFContent;
