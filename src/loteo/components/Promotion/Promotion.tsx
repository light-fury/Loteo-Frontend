import React, {useEffect, useRef} from "react";

import {
    Header,
    Apollo11Lottery,
    DepositBonus,
    LoteoPass,
    TicketBonus
} from "loteo/components";
import {getUser} from "auth/selectors";
import {getWallet} from "loteo/selectors";
import {Wallet} from "loteo/types";
import {User} from "auth/types";
import {useReduxStore, useBooleanState} from "hooks";

import "./promotion.scss";

const Promotion = () => {
    const ticketShopContainerRef = useRef<HTMLDivElement>(null);
    const [wallet]: [Wallet | null, User | null] = useReduxStore([getWallet, getUser]);
    const [nextMoonVisitorInfoVisible, hideNextMoonVisitorInfo] = useBooleanState();
    const [stickyWalletEnabled] = useBooleanState();

    useEffect(() => {
        if (location.hash === "#buy") {
            scrollToTicketShop();
        }
    }, [location.hash]);

    const scrollToTicketShop = () => {
        const ticketShopContainer = ticketShopContainerRef.current;

        if (nextMoonVisitorInfoVisible) {
            hideNextMoonVisitorInfo();
        }

        if (ticketShopContainer) {
            ticketShopContainer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    return (
        <div className="promotions">
            <div className="headerPromotion">
                <Header
                    wallet={wallet}
                    nextMoonVisitorInfoVisible={nextMoonVisitorInfoVisible}
                    hideNextMoonVisitorInfo={hideNextMoonVisitorInfo}
                    buy={scrollToTicketShop}
                    stickyDisabled={!stickyWalletEnabled}
                />
            </div>
            <div className="promotions__content">
                <div className="promotions__content__deposit">
                    <DepositBonus promotion/>
                    <div className="deposit-gradient" />
                </div>
                <div className="promotions__content__lotepass">
                    <LoteoPass promotion/>
                    <div className="lotepass-gradient" />
                </div>
                <div className="promotions__content__ticketBonus">
                    <TicketBonus promotion/>
                    <div className="ticketBonus-gradient" />
                </div>
                <div className="promotions__content__apollo">
                    <Apollo11Lottery promotion/>
                    <div className="apollo-gradient" />
                </div>
            </div>
        </div>
    );
};
export default Promotion;
