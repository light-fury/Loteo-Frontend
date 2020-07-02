import React, {useRef, useContext, useState} from "react";
import {Trans} from "react-i18next";

import {login} from "auth/api";
import {AuthContext} from "auth/contexts";
import {MessageContext} from "app/contexts";
import {MixButton} from "ui/components";
import {ConversionRates} from "loteo/types";
import {getConversionRates} from "loteo/selectors";
import {animated} from "react-spring";
import {useStyleByScrollVisibility, useReduxStore} from "hooks";

import "./loteuTokens.scss";

const LoteuTokens = () => {
    const TRANSLATE = "loteuTokens";

    const scrollView = useRef<HTMLDivElement>(null);
    let _loadMore = useRef<HTMLDivElement>(null);
    let _rightSection = useRef<HTMLDivElement>(null);
    const {loggedIn} = useContext(AuthContext);
    const {showPayment} = useContext(MessageContext);
    const [conversionRates]: [ConversionRates | null] = useReduxStore([getConversionRates]);
    // Mobile advantages
    const advantage1MobileRef = useRef(null);
    const advantage2MobileRef = useRef(null);
    const advantage3MobileRef = useRef(null);
    const advantage4MobileRef = useRef(null);
    const advantage5MobileRef = useRef(null);
    const advantage6MobileRef = useRef(null);
    const [advantage1MobileStyle, advantage3MobileStyle, advantage5MobileStyle] = useStyleByScrollVisibility(
        [advantage1MobileRef, advantage3MobileRef, advantage5MobileRef],
        visible => ({
            opacity: visible ? 1 : 0,
            transform: `translate3d(${visible ? 0 : -200}px, 0, 0)`
        })
    );
    const [advantage2MobileStyle, advantage4MobileStyle, advantage6MobileStyle] = useStyleByScrollVisibility(
        [advantage2MobileRef, advantage4MobileRef, advantage6MobileRef],
        visible => ({
            opacity: visible ? 1 : 0,
            transform: `translate3d(${visible ? 0 : 200}px, 0, 0)`
        })
    );
    const [renderTokenCount, setRenderTokenCount] = useState<number>(3);
    const leftTokens = [
        {
            i18nKey: "doubleChance",
            ref: advantage1MobileRef,
            style: advantage1MobileStyle
        },
        {
            i18nKey: "mof",
            ref: advantage2MobileRef,
            style: advantage2MobileStyle
        },
        {
            i18nKey: "specialGame",
            ref: advantage3MobileRef,
            style: advantage3MobileStyle
        }
    ];

    const rightTokens = [
        {
            i18nKey: "quarter",
            ref: advantage4MobileRef,
            style: advantage4MobileStyle
        },
        {
            i18nKey: "payment",
            ref: advantage5MobileRef,
            style: advantage5MobileStyle
        },
        {
            i18nKey: "staking",
            ref: advantage6MobileRef,
            style: advantage6MobileStyle
        }
    ];

    const handlePlay = () => {
        if (loggedIn) {
            showPayment({loteu: conversionRates ? Number((conversionRates.loteuBuy * 10).toFixed(0)) : 4000}, scrollView.current || undefined);
        } else {
            login(undefined, true);
        }
    };
    const changeStyle = () => {
        const node = _loadMore.current;
        if (node) {
            node.style.opacity = "0";
            setRenderTokenCount(6);
            setTimeout(() => {
                node.style.display = "none";
            }, 1000);
        }
    };
    return (
        <div ref={scrollView} className="loteuTokens">
            <div className="loteuTokens__header-desktop">
                <div className="coin">
                    <img src="/images/dashboard/loteuTokens/coin.png" alt="coin" />
                </div>
                <h1 className="header">LOTEU tokens</h1>
                <p className="question">DOUBLE YOUR CHANCE</p>
            </div>
            <div className="loteuTokens__section desktop-view">
                <div className="loteuTokens__section__left">
                    {leftTokens.map((token, index) => (
                        <div className={`item lLoteu-${index} ${index === 1 ? "left" : ""}`} key={index}>
                            <div className="item--name"><Trans i18nKey={`${TRANSLATE}.leftTokens.${token.i18nKey}.name`} /></div>
                            <div className="item--description"><Trans i18nKey={`${TRANSLATE}.leftTokens.${token.i18nKey}.description`} /></div>
                        </div>
                    ))}
                </div>
                <div className="loteuTokens__section--coin">
                    <img src="/images/dashboard/loteuTokens/coin.png" alt="coin" />
                </div>
                <div className="loteuTokens__section__right" ref={_rightSection}>
                    {rightTokens.map((token, index) => (
                        <div className={`item rLoteu-${index} ${index === 1 ? "right" : ""}`} key={index}>
                            <div className="item--name"><Trans i18nKey={`${TRANSLATE}.rightTokens.${token.i18nKey}.name`} /></div>
                            <div className="item--description"><Trans i18nKey={`${TRANSLATE}.rightTokens.${token.i18nKey}.description`} /></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="loteuTokens__section mobile-view">
                <div className="loteuTokens__section__left">
                    {[...leftTokens, ...rightTokens].slice(0, renderTokenCount).map((token, index) => (
                        <animated.div className="item" key={index} ref={token.ref} style={token.style}>
                            <div className="item--name"><Trans i18nKey={`${TRANSLATE}.mobileLeftTokens.${token.i18nKey}.name`} /></div>
                            <div className="item--description"><Trans i18nKey={`${TRANSLATE}.mobileLeftTokens.${token.i18nKey}.description`} /></div>
                        </animated.div>
                    ))}
                </div>
                <div className="loteuTokens__section--coin">
                    <img src="/images/dashboard/loteuTokens/coin.png" alt="coin" />
                </div>
                <div className="loteuTokens__section__load-more" ref={_loadMore} onClick={changeStyle}>
                    SHOW MORE
                    <span className="icon" />
                </div>
            </div>
            <div className="loteuTokens__buy-loteu">
                <MixButton text="Buy LOTEU" style="gold" onClick={handlePlay} />
            </div>
        </div>
    );
};

export default LoteuTokens;
