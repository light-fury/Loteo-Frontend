import React, {useContext, useRef, useState, lazy} from "react";
import {useTranslation, Trans} from "react-i18next";
import {useSpring, animated} from "react-spring";
import {Helmet} from "react-helmet";

import {NavigationContext} from "app/contexts";
const AcceptedCurrencies = lazy(() => import("loteo/components/AcceptedCurrencies"));
const BackgroundTexture = lazy(() => import("loteo/components/BackgroundTexture"));
const Footer = lazy(() => import("loteo/components/Footer"));
const Header = lazy(() => import("loteo/components/Header"));
const HomeTopBackground = lazy(() => import("loteo/components/HomeTopBackground"));
const LoteuTokens = lazy(() => import("loteo/components/LoteuTokens"));
const LotteryInfo = lazy(() => import("loteo/components/LotteryInfo"));
const LoteoGames = lazy(() => import("loteo/components/LoteoGames"));
const InviteFriends = lazy(() => import("loteo/components/InviteFriends"));
const Partners = lazy(() => import("loteo/components/Partners"));
const Roadmap = lazy(() => import("loteo/components/Roadmap"));
const NetworksSidebar = lazy(() => import("loteo/components/NetworksSidebar"));

import {AuthContext} from "auth/contexts";
import {useReduxLoad, useStyleByScrollVisibility} from "hooks";
import {login} from "auth/api";
import {loadWeeklyLotteryInfo} from "loteo/actions";
import {getWeeklyLotteryInfo, getWeeklyLotteryInfoLoading} from "loteo/selectors";
import {Grid} from "ui/components";

import {Advantage} from "./components";

import "./home.scss";

const Home = () => {
    const {t} = useTranslation();
    const TRANSLATE = "home";
    const {showDashboard} = useContext(NavigationContext);
    const {loggedIn} = useContext(AuthContext);
    const [weeklyLotteryInfo, weeklyLotteryInfoLoading] = useReduxLoad(
        [loadWeeklyLotteryInfo()],
        [getWeeklyLotteryInfo, getWeeklyLotteryInfoLoading]
    );
    const digitalEraLotteryTitlesRef = useRef(null);
    const leftMoonRef = useRef(null);
    const {showShare} = useContext(NavigationContext);
    const [digitalEraLotteryTitlesStyle] = useStyleByScrollVisibility([digitalEraLotteryTitlesRef], visible => ({
        opacity: visible ? 1 : 0
    }));
    const [leftMoonStyle] = useStyleByScrollVisibility(
        [leftMoonRef],
        visible => ({
            opacity: visible ? 1 : 0,
            transform: visible ? "translate3d(0%, 0, 0)" : "translate3d(-50%, 0, 0)"
        }),
        0.25
    );

    const [renderAdvantageCount, setRenderAdvantageCount] = useState<number>(3);

    // Desktop advantages
    const advantage1Ref = useRef(null);
    const advantage2Ref = useRef(null);
    const advantage3Ref = useRef(null);
    const advantage4Ref = useRef(null);
    const advantage5Ref = useRef(null);
    const advantage6Ref = useRef(null);
    const [
        advantage1Style,
        advantage2Style,
        advantage3Style,
        advantage4Style,
        advantage5Style,
        advantage6Style
    ] = useStyleByScrollVisibility(
        [advantage1Ref, advantage2Ref, advantage3Ref, advantage4Ref, advantage5Ref, advantage6Ref],
        visible => ({
            opacity: visible ? 1 : 0,
            transform: `translate3d(${visible ? 0 : 200}px, 0, 0)`
        })
    );

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

    const showMoreMobileRef = useRef<HTMLDivElement>(null);

    const style = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    });

    if (loggedIn) {
        showDashboard();
        return null;
    }

    const desktopAdvantages = [
        {
            ref: advantage1Ref,
            i18nKey: "chancesToWin",
            style: advantage1Style
        },
        {
            ref: advantage2Ref,
            i18nKey: "trustworthy",
            style: advantage2Style
        },
        {
            ref: advantage3Ref,
            i18nKey: "transparency",
            style: advantage3Style
        },
        {
            ref: advantage4Ref,
            i18nKey: "winnerEveryDrawing",
            style: advantage4Style
        },
        {
            ref: advantage5Ref,
            i18nKey: "biggestSliceForTheWinner",
            style: advantage5Style
        },
        {
            ref: advantage6Ref,
            i18nKey: "speed",
            style: advantage6Style
        }
    ];

    const mobileAdvantages = [
        {
            ref: advantage1MobileRef,
            i18nKey: "chancesToWin",
            style: advantage1MobileStyle
        },
        {
            ref: advantage2MobileRef,
            i18nKey: "trustworthy",
            style: advantage2MobileStyle
        },
        {
            ref: advantage3MobileRef,
            i18nKey: "transparency",
            style: advantage3MobileStyle
        },
        {
            ref: advantage4MobileRef,
            i18nKey: "winnerEveryDrawing",
            style: advantage4MobileStyle
        },
        {
            ref: advantage5MobileRef,
            i18nKey: "biggestSliceForTheWinner",
            style: advantage5MobileStyle
        },
        {
            ref: advantage6MobileRef,
            i18nKey: "speed",
            style: advantage6MobileStyle
        }
    ];

    const showMoreButtonClick = () => {
        if (showMoreMobileRef.current) {
            const node = showMoreMobileRef.current;
            node.style.opacity = "0";
            setRenderAdvantageCount(6);
            setTimeout(() => {
                node.style.display = "none";
            }, 1000);
        }
    };
    return (
        <animated.div className="home" style={style}>
            <Helmet>
                <title>{t(`${TRANSLATE}.welcomeToLOTEO`)}</title>
            </Helmet>
            <NetworksSidebar />
            <HomeTopBackground>
                <Header />
            </HomeTopBackground>
            <div className="centerContent">
                <LotteryInfo
                    info={weeklyLotteryInfo}
                    loading={weeklyLotteryInfoLoading}
                    buy={() => login(undefined, true)}
                    play={() => login(undefined, true)}
                />
                <LoteoGames playMOF={() => login(undefined, true)} />
                <InviteFriends showInviteFriends={showShare} />
                <LoteuTokens />
                <BackgroundTexture useAdditionalElements />

                <div className="digitalEraLottery">
                    <animated.div
                        className="titles"
                        ref={digitalEraLotteryTitlesRef}
                        style={digitalEraLotteryTitlesStyle}
                    >
                        <h2>
                            <Trans i18nKey={`${TRANSLATE}.digitalEraLottery`} />
                        </h2>
                        <h5>{t(`${TRANSLATE}.advantages.title`)}</h5>
                    </animated.div>
                    <animated.img
                        ref={leftMoonRef}
                        className="leftMoon"
                        style={leftMoonStyle}
                        src="images/loteo-moon.png"
                        alt={t(`${TRANSLATE}.alts.3.alt`)}
                    />
                    <Grid direction="column" className="advantages desktopAdvantages hidden-xs hidden-sm">
                        {desktopAdvantages.map((item, idx) => (
                            <Advantage
                                key={`desktopAdvantage-${idx}`}
                                ref={item.ref}
                                title={t(`${TRANSLATE}.advantages.${item.i18nKey}.title`)}
                                text={t(`${TRANSLATE}.advantages.${item.i18nKey}.text`)}
                                style={item.style}
                            />
                        ))}
                    </Grid>
                    <Grid direction="column" className="advantages hidden-md hidden-lg hidden-xl">
                        {mobileAdvantages.slice(0, renderAdvantageCount).map((item, idx) => (
                            <Advantage
                                key={`desktopAdvantage-${idx}`}
                                ref={item.ref}
                                title={t(`${TRANSLATE}.advantages.${item.i18nKey}.title`)}
                                text={t(`${TRANSLATE}.advantages.${item.i18nKey}.text`)}
                                style={item.style}
                            />
                        ))}
                        <div className="advantages__load-more" ref={showMoreMobileRef} onClick={showMoreButtonClick}>
                            {t("global.showMore")}
                            <span className="icon" />
                        </div>
                    </Grid>
                </div>
                <Roadmap />
                <div className="darkBackground">
                    <Partners />
                    <AcceptedCurrencies />
                </div>
            </div>
            <Footer />
        </animated.div>
    );
};
export default Home;
