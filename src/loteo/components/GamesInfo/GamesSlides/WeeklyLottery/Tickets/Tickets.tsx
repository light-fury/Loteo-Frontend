import React, {useContext, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";

import {NavigationContext} from "app/contexts";
import {ConversionRates} from "loteo/types";
import {getETHString} from "common/utils";
import {useReduxStore} from "hooks";
import {getUser} from "auth/selectors";
import {login} from "auth/api";

import Ticket from "./Ticket";

import "./tickets.scss";

type Props = {
    location: Location;
    conversionRates: ConversionRates | null;
}

const Tickets = ({location, conversionRates}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "gameDetails.tickets";
    const [user] = useReduxStore([getUser]);
    const componentRef = useRef<HTMLDivElement>(null);
    const {showDashboardBuy} = useContext(NavigationContext);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        switch (location.hash) {
            case "#loteopass":
                setExpandedIndex(1);
                scrollToComponent();
                break;
            case "#loteomaxx":
                setExpandedIndex(2);
                scrollToComponent();
                break;
        }
    }, [location.hash]);

    const scrollToComponent = () => {
        const component = componentRef.current;
        if (component) {
            component.scrollIntoView();
        }
    };

    const renderLoteoMaxxCard = (title, entries, price) => (
        <div className="loteoMaxxCard">
            <div>
                <div className="title">{title}</div>
                <div className="entries">{entries} {t(`${TRANSLATE}.entries`)}</div>
            </div>
            <div className="price">{price} €</div>
        </div>
    );

    const toggle = (index: number) => () => {
        if (index === expandedIndex) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    return (
        <div ref={componentRef} className="gamesInfo__weeklyLottery__tickets section">
            <div className="title">{t(`${TRANSLATE}.t1`)}</div>
            <div className="cards">
                <Ticket
                    icon="images/tickets-card-icon.png"
                    title={t(`${TRANSLATE}.title1`)}
                    priceEUR={`${t(`${TRANSLATE}.price1`)} €`}
                    priceETH={`${conversionRates ? getETHString(conversionRates.eth * 10) : "-"} ${t(`${TRANSLATE}.eth`)}`}
                    buy={user ? showDashboardBuy : () => login()}
                    expanded={expandedIndex === 0}
                    toggle={toggle(0)}
                >
                    <p>
                        {t(`${TRANSLATE}.ticket.card.0.p1`)}
                    </p>
                    <p>
                        {t(`${TRANSLATE}.ticket.card.0.p2`)}
                    </p>
                </Ticket>
                <Ticket
                    icon="images/loteopass-card-icon.png"
                    title={t(`${TRANSLATE}.title2`)}
                    priceEUR={`${t(`${TRANSLATE}.price2`)} €`}
                    priceETH={`${conversionRates ? getETHString(conversionRates.eth * 520) : "-"} ETH`}
                    buy={user ? showDashboardBuy : () => login()}
                    expanded={expandedIndex === 1}
                    toggle={toggle(1)}
                >
                    <p>
                        {t(`${TRANSLATE}.ticket.card.1.p1`)}
                    </p>
                    <p>
                        {t(`${TRANSLATE}.ticket.card.1.p2`)}
                    </p>
                </Ticket>
                <Ticket
                    icon="images/loteomaxx-card-icon.png"
                    title={t(`${TRANSLATE}.title3`)}
                    showFrom
                    priceEUR={`${t(`${TRANSLATE}.price3`)} €`}
                    priceETH={`${conversionRates ? getETHString(conversionRates.eth * 100) : "-"} ${t(`${TRANSLATE}.eth`)}`}
                    buy={user ? showDashboardBuy : () => login()}
                    expanded={expandedIndex === 2}
                    toggle={toggle(2)}
                >
                    <p>
                        {t(`${TRANSLATE}.ticket.card.2.p1`)}
                    </p>
                    <div className="loteoMaxxCards">
                        {renderLoteoMaxxCard(t(`${TRANSLATE}.loteoMaxxCards.0.text`), 10, 100)}
                        {renderLoteoMaxxCard(t(`${TRANSLATE}.loteoMaxxCards.1.text`), 20, 200)}
                        {renderLoteoMaxxCard(t(`${TRANSLATE}.loteoMaxxCards.2.text`), 50, 500)}
                        {renderLoteoMaxxCard(t(`${TRANSLATE}.loteoMaxxCards.3.text`), 100, 1000)}
                    </div>
                </Ticket>
            </div>
        </div>
    );
};
export default Tickets;
