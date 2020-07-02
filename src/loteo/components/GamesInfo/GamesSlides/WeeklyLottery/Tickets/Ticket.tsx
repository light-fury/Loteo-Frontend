import React from "react";
import {useTranslation} from "react-i18next";

import {Button} from "ui/components";

type Props = {
    icon: string;
    title: string;
    showFrom?: boolean;
    priceEUR: string;
    priceETH: string;
    expanded: boolean;
    children: React.ReactNode;
    toggle();
    buy();
}

const Ticket = ({icon, title, showFrom = false, priceEUR, priceETH, expanded, children, toggle, buy}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "gameDetails.tickets.ticket";

    return (
        <div className={`ticket ${expanded ? "expanded" : "collapsed"}`} onClick={!expanded ? toggle : undefined}>
            <div className="header">
                <img className="icon" src={icon} alt={t(`${TRANSLATE}.alts.0.alt`)}/>
                <div className="titleWrapper">
                    <div className="title">{title}</div>
                    <div className="showDetails">{t(`${TRANSLATE}.showDetails`)}</div>
                    <img className="closeButton" src="icons/close.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} onClick={toggle}/>
                </div>
            </div>
            <div className="content">
                <div className="pricesRow">
                    <div className="prices">
                        {showFrom && <div className="from small">{t(`${TRANSLATE}.from`)}</div>}
                        <div className="price">{priceEUR}</div>
                        <div className="price small">{priceETH}</div>
                    </div>
                </div>
                {children}
                <div className="bottomPanel">
                    <div className="text">{t(`${TRANSLATE}.buyTicketsAndPlay`)}</div>
                    <Button className="buyButton" text={t(`${TRANSLATE}.buyNow`)} onClick={buy}/>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
