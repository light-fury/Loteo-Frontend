import React, {useContext} from "react";
import {Trans} from "react-i18next";

import {login} from "auth/api";
import {AuthContext} from "auth/contexts";
import {NavigationContext} from "app/contexts";
import {MixButton} from "ui/components";

import "./ticketBonus.scss";

type Props = {
    children?: React.ReactNode;
    promotion?: boolean;
};

const TicketBonus = ({children, promotion = false}: Props) => {
    const TRANSLATE = "backgroundBanners";

    const {loggedIn} = useContext(AuthContext);
    const {showWeeklyLottery} = useContext(NavigationContext);

    const handlePlay = () => {
        if (loggedIn) {
            showWeeklyLottery(true, {loteu: 0, tickets: 1});
        } else {
            login(undefined, true);
        }
    };

    return (
        <div className={`ticketBonus ${promotion ? "promotion" : ""}`}>
            {!promotion && (
                <>
                    <div className="ticketBonus__content loteo-banner">
                        <div className="title"><h1><Trans i18nKey={`${TRANSLATE}.ticketBonus.title`} /></h1></div>
                        <div className="detail">
                            Get bonus 100 LOTEU to double your chances!
                        </div>
                    </div>
                    <div className="ticketBonus__bottom loteo-banner">
                        <div className="action">
                            <MixButton text="BUY TICKET" style="gold" onClick={handlePlay}/>
                        </div>
                        {children}
                    </div>
                </>
            )}
            {promotion && (
                <>
                    <div className="ticketBonus__content">
                        <div className="title"><h1 className="promotion"><Trans i18nKey={`${TRANSLATE}.ticketBonus.title`} /></h1></div>
                        <div className="detail promotion">
                            <Trans i18nKey={`${TRANSLATE}.ticketBonus.promotionDetail`} />
                        </div>
                    </div>
                    <div className="ticketBonus__promotionAction">
                        <MixButton text="BUY TICKET" style="gold" onClick={handlePlay}/>
                    </div>
                </>
            )}
        </div>
    );
};

export default TicketBonus;
