import React, {useContext} from "react";
import {Trans} from "react-i18next";

import {login} from "auth/api";
import {AuthContext} from "auth/contexts";
import {NavigationContext} from "app/contexts";
import {MixButton} from "ui/components";

import "./loteoPass.scss";

type Props = {
    children?: React.ReactNode;
    promotion?: boolean;
};

const LoteoPass = ({children, promotion = false}: Props) => {
    const TRANSLATE = "backgroundBanners";
    const {loggedIn} = useContext(AuthContext);
    const {showWeeklyLottery} = useContext(NavigationContext);

    const handlePlay = () => {
        if (loggedIn) {
            showWeeklyLottery(true, {loteu: 0, loteoPass: 1});
        } else {
            login(undefined, true);
        }
    };

    return (
        <div className={`loteoPassBanner banner ${promotion ? "promotion" : ""}`}>
            {!promotion && (
                <>
                    <div className="loteoPassBanner__content loteo-banner">
                        <div className="title"><h1><Trans i18nKey={`${TRANSLATE}.loteoPass.title`} /></h1></div>
                        <div className="detail">
                            Year-long Entry into Weekly Lottery
                        </div>
                        <div className="lists lists-desktop">
                            <p className="lists--desktop">Double chance BONUS</p>
                            <p className="lists--desktop">Affiliate Space Program BONUS</p>
                            <p>Become a Premium Partner</p>
                            <p>Apollo 11 Daily Lottery FREE Entry Until The End of 2019</p>
                        </div>
                        <div className="lists lists-mobile">
                            <p>Become a Premium Partner</p>
                            <p>Apollo 11 Daily Lottery FREE Entry</p>
                        </div>
                    </div>
                    <div className="loteoPassBanner__bottom loteo-banner">
                        <div className="action">
                            <MixButton text="BUY LOTEOPASS" style="red" onClick={handlePlay}/>
                        </div>
                        {children}
                    </div>
                </>
            )}
            {promotion && (
                <>
                    <div className="loteoPassBanner__content">
                        <div className="title"><h1 className="promotion"><Trans i18nKey={`${TRANSLATE}.loteoPass.title`} /></h1></div>
                        <div className="detail promotion">
                            <Trans i18nKey={`${TRANSLATE}.loteoPass.promotionDetail`} />
                        </div>
                    </div>
                    <div className="loteoPassBanner__promotionAction">
                        <MixButton text="BUY LOTEOPASS" style="red" onClick={handlePlay}/>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoteoPass;
