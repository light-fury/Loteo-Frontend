import React, {useContext} from "react";
import {Trans} from "react-i18next";

import {login} from "auth/api";
import {AuthContext} from "auth/contexts";
import {MixButton} from "ui/components";
import {NavigationContext} from "app/contexts";

import "./apollo11Lottery.scss";

type Props = {
    children?: React.ReactNode;
    promotion?: boolean;
};

const Apollo11Lottery = ({children, promotion = false}: Props) => {
    const TRANSLATE = "backgroundBanners";

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
        <div className={`apollo11Lottery banner ${promotion ? "promotion" : ""}`}>
            {!promotion && (
                <>
                    <div className="apollo11Lottery__content  loteo-banner">
                        <div className="title"><h1><Trans i18nKey={`${TRANSLATE}.apollo.title`} /></h1></div>
                        <div className="detail">
                            Become Hero of Apollo 11 Lottery<br/>
                            & get FREE LoteoPass
                        </div>
                    </div>
                    <div className="apollo11Lottery__bottom  loteo-banner">
                        <div className="action">
                            <MixButton text="PLAY" style="red" onClick={handlePlay}/>
                        </div>
                        {children}
                    </div>
                </>
            )}
            {promotion && (
                <>
                    <div className="apollo11Lottery__content">
                        <div className="title"><h1 className="promotion"><Trans i18nKey={`${TRANSLATE}.apollo.title`} /></h1></div>
                        <div className="detail promotion">
                            <Trans i18nKey={`${TRANSLATE}.apollo.promotionDetail`} />
                        </div>
                    </div>
                    <div className="apollo11Lottery__promotionAction">
                        <MixButton text="PLAY" style="red" onClick={handlePlay}/>
                    </div>
                </>
            )}
        </div>
    );
};

export default Apollo11Lottery;
