import React, {useCallback, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import throttle from "lodash/throttle";

import {NavigationContext} from "app/contexts";
import {AuthContext} from "auth/contexts";
import {login} from "auth/api";

import {Button, ButtonStyle, LinkButton, Grid} from "ui/components";
import {WalletPanel, WalletPanelTheme, LangSwitcher, UserInfo as UserInfoComponent} from "loteo/components";

import {useBooleanState, useReduxActions, useReduxLoad} from "hooks";
import {User} from "auth/types";
import {loadUser} from "auth/actions";
import {getUser, getUserLoading} from "auth/selectors";
import {loadWallet} from "loteo/actions";
import {Wallet} from "loteo/types";

import "./header.scss";

type Props = {
    wallet?: Wallet | null;
    nextMoonVisitorInfoVisible?: boolean;
    hideNextMoonVisitorInfo?();
    buy?();
    forceWalletOpen?: boolean;
    stickyDisabled?: boolean;
    hideBottomSeparator?: boolean;
    location?: Location;
};

const Header = ({
    wallet,
    nextMoonVisitorInfoVisible,
    hideNextMoonVisitorInfo,
    buy,
    forceWalletOpen,
    stickyDisabled,
    hideBottomSeparator,
    location
}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "header.navigation";
    const {loggedIn, loginLoading} = useContext(AuthContext);
    const {showHome, showDashboard, showPromotions} = useContext(NavigationContext);
    const [user, userLoading]: [User | null, boolean] = useReduxLoad([loadUser()], [getUser, getUserLoading]);
    const [refreshWallet] = useReduxActions([loadWallet]);

    const shouldStick = () => (document.scrollingElement && document.scrollingElement.scrollTop > 700) || false;
    const shouldShowUserMenu = (e) => {
        if (document.getElementsByClassName("userInfo__avatar").length === 0) {
            return;
        }
        if (e && (
            document.getElementsByClassName("userInfo__avatar")[0].contains(e.target) || document.getElementsByClassName("userInfo__avatar")[1].contains(e.target)
        )){
            if (document.getElementsByClassName("userInfo__avatar__nameActions").length > 0) {
                document.getElementsByClassName("userInfo__avatar__nameActions")[0]["style"]["display"]="block";
                document.getElementsByClassName("userInfo__avatar__nameActions")[1]["style"]["display"]="block";
            }
        } else {
            if (document.getElementsByClassName("userInfo__avatar__nameActions").length > 0) {
                document.getElementsByClassName("userInfo__avatar__nameActions")[0]["style"]["display"]="none";
                document.getElementsByClassName("userInfo__avatar__nameActions")[1]["style"]["display"]="none";
            }
        }
    };
    const shouldShowBonusBox = (e) => {
        if (document.getElementsByClassName("myBonus").length === 0) {
            return;
        }
        if (e && document.getElementsByClassName("myBonus")[0].contains(e.target)){
            document.getElementsByClassName("myBonus__list")[0]["style"]["display"]="block";
        } else if (document.getElementsByClassName("myBonus")[0]){
            document.getElementsByClassName("myBonus__list")[0]["style"]["display"]="none";
        }
    };
    const shouldSlideDownBanner = (e) => {
        const bannersSlickDots = document.getElementsByClassName("background-banner__slick__dots__inner");

        if (document.getElementsByClassName("mobile-show-icon").length > 0 &&
            document.getElementsByClassName("mobile-show-icon")[0].contains(e.target)
        ) {
            Object.values(document.getElementsByClassName("loteo-banner")).map((item) => {
                item["style"]["paddingTop"]="0px";
                item["style"]["bottom"]="0px";
            });
            Object.values(document.getElementsByClassName("game-banner")).map((item) => {
                item["style"]["paddingTop"]="150px";
            });
            Object.values(document.getElementsByClassName("game-banner-tab")).map((item) => {
                item["style"]["bottom"]="0px";
            });
            if (bannersSlickDots.length > 0) {
                bannersSlickDots[0]["style"]["paddingTop"]="0px";
            }
        } else if ( document.getElementsByClassName("mobile-hide-icon").length > 0 &&
            document.getElementsByClassName("mobile-hide-icon")[0].contains(e.target)
        ) {
            Object.values(document.getElementsByClassName("loteo-banner")).map((item) => {
                item["style"]["paddingTop"]="200px";
                item["style"]["bottom"]="-200px";
            });
            Object.values(document.getElementsByClassName("game-banner")).map((item) => {
                item["style"]["paddingTop"]="300px";
            });
            Object.values(document.getElementsByClassName("game-banner-tab")).map((item) => {
                item["style"]["bottom"]="-200px";
            });
            if (bannersSlickDots.length > 0) {
                bannersSlickDots[0]["style"]["paddingTop"]="200px";
            }
        }
    };

    const [sticky, setSticky] = useState(shouldStick());
    const [walletOpened, openWallet] = useState<string>();
    const [menuVisible, showMenu, hideMenu] = useBooleanState();

    const scrollChanged = useCallback(throttle(() => setSticky(shouldStick()), 100), []);

    useEffect(() => {
        window.addEventListener("click", shouldShowUserMenu);
        window.addEventListener("click", shouldSlideDownBanner);
        return () => {
            window.removeEventListener("click", shouldShowUserMenu);
            window.removeEventListener("click", shouldSlideDownBanner);
        };
    }, [user]);

    useEffect(() => {
        window.addEventListener("click", shouldShowBonusBox);
        return () => {
            window.removeEventListener("click", shouldShowBonusBox);
        };
    }, []);

    useEffect(() => {
        if (user === undefined) {
            return;
        }

        window.addEventListener("scroll", scrollChanged);
        return () => {
            window.removeEventListener("scroll", scrollChanged);
        };
    }, [scrollChanged, user]);

    const scrollToOpenWallet = (type) => {
        openWallet(type);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const showWalletPanel = (type) => {
        return openWallet(type);
    };

    const webLinks = {
        links: [
            {
                text: t(`${TRANSLATE}.whyInvest`),
                path: "/why-invest"
            },
            {
                text: t(`${TRANSLATE}.games`),
                path: "/games-info"
            },
            {
                text: t(`${TRANSLATE}.charity`),
                path: "/charity"
            },
            {
                text: t(`${TRANSLATE}.affiliate`),
                path: "/share"
            },
            {
                text: t(`${TRANSLATE}.info`),
                path: "/info"
            },
            {
                text: t(`${TRANSLATE}.blog`),
                onClick: () => window.open("https://medium.com/loteo", "_blank", "noopener")
            },
            {
                text: t(`${TRANSLATE}.howToPlay`),
                onClick: () => window.open("https://www.youtube.com/watch?v=A_4avxxA66I&t=14s", "_blank", "noopener"),
                className: "hidden-desktop"
            }
        ],
        buttons: [
            {
                text: t(`${TRANSLATE}.loginRegister`),
                style: ButtonStyle.RedCondensed,
                onClick: () => login(undefined, true)
            }
        ]
    };

    const appLinks = [
        {
            text: t(`${TRANSLATE}.games`),
            icon: "icons/games.svg",
            path: "/games-info"
        },
        {
            text: t(`${TRANSLATE}.charity`),
            icon: "icons/charity.svg",
            path: "/charity"
        },
        {
            text: t(`${TRANSLATE}.inviteFriends`),
            icon: "icons/share.svg",
            path: "/share"
        },
        {
            text: t(`${TRANSLATE}.myAffiliate`),
            icon: "icons/stats-active.svg",
            path: "/my-affiliate"
        },
        {
            text: t(`${TRANSLATE}.leaderboard`),
            icon: "icons/leaderboard.svg",
            path: "/leaderboard"
        },
        {
            text: t(`${TRANSLATE}.promotion`),
            icon: "icons/stats-active.svg",
            path: "/promotion"
        }
    ];

    return (
        <div id="header">
            <div className="topSection spaceBetween">
                <img
                    className="logo"
                    src="images/loteo-logo.svg"
                    alt={t(`${TRANSLATE}.alts.0.alt`)}
                    onClick={loggedIn ? showDashboard : showHome}
                />
                <Grid align="center" justify="end" className="actions">
                    {!loginLoading &&
                        (loggedIn ? (
                            appLinks.map((item, idx) => (
                                idx !== 5 && (
                                    <LinkButton
                                        key={`header-appLinks-desktop-${idx}`}
                                        text={item.text}
                                        icon={item.icon}
                                        path={item.path}
                                    />
                                )
                            ))
                        ) : (
                            <>
                                {webLinks.links.map((item, idx) => (
                                    <LinkButton
                                        key={`header-webLinks-desktop-link-${idx}`}
                                        text={item.text}
                                        path={item.path}
                                        className={`${item.className} appLinkButton`}
                                        onClick={item.onClick}
                                    />
                                ))}
                                <div className="appPromotion" onClick={showPromotions}>PROMOTION</div>
                                {webLinks.buttons.map((item, idx) => (
                                    <Button
                                        key={`header-webLinks-desktop-button-${idx}`}
                                        text={item.text}
                                        style={item.style || ButtonStyle.Default}
                                        onClick={item.onClick}
                                    />
                                ))}
                            </>
                        ))}
                    {loggedIn && (<div className="webPromotion" onClick={showPromotions}>PROMOTION</div>)}
                    {loggedIn && (<UserInfoComponent user={user} userLoading={userLoading} detailsHidden={forceWalletOpen || walletOpened} />)}
                    <LangSwitcher />
                </Grid>
                <Grid align="center" justify="end" className="mobileActions">
                    {loggedIn && (<UserInfoComponent user={user} userLoading={userLoading} detailsHidden={forceWalletOpen || walletOpened} />)}
                    {!loginLoading &&
                        (menuVisible ? (
                            <>
                                <LangSwitcher />
                                <img className="mobile-hide-icon" src="icons/close.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} onClick={hideMenu} />
                            </>
                        ) : (
                            <>
                                {!loggedIn && (
                                    <Grid wrap align="center" justify="center" noWidth>
                                        {webLinks.buttons.map((item, idx) => (
                                            <Button
                                                key={`header-webLinks-mobile-button-${idx}`}
                                                text={item.text}
                                                style={item.style || ButtonStyle.Default}
                                                onClick={item.onClick}
                                            />
                                        ))}
                                    </Grid>
                                )}
                                <img className="mobile-show-icon" src="icons/menu.svg" alt={t(`${TRANSLATE}.alts.1.alt`)} onClick={showMenu} />
                            </>
                        ))}
                </Grid>
            </div>
            <div className={`menu ${menuVisible ? "visible" : "hidden"}`}>
                {loggedIn
                    ? appLinks.map((item, idx) => (
                        <LinkButton
                            key={`header-webLinks-mobile-link-${idx}`}
                            text={item.text}
                            path={item.path}
                        />
                    ))
                    : webLinks.links.map((item, idx) => (
                        <LinkButton
                            key={`header-webLinks-mobile-link-${idx}`}
                            text={item.text}
                            path={item.path}
                            onClick={item.onClick}
                        />
                    ))}
            </div>
            <div className="separator" />
            {loggedIn && wallet !== undefined && (
                <>
                    <WalletPanel
                        wallet={wallet}
                        refreshWallet={refreshWallet}
                        opened={walletOpened ? walletOpened : null}
                        open={showWalletPanel}
                        close={showWalletPanel}
                        location={location}
                        nextMoonVisitorInfoVisible={nextMoonVisitorInfoVisible}
                        hideNextMoonVisitorInfo={hideNextMoonVisitorInfo}
                        buy={buy}
                    />
                    {!hideBottomSeparator && <div className="separator hiddenOnMobile" />}
                    <div className={`stickyWalletPanel ${!stickyDisabled && sticky ? "visible" : "hidden"}`}>
                        <WalletPanel
                            theme={WalletPanelTheme.BlackWhite}
                            wallet={wallet}
                            opened={null}
                            open={scrollToOpenWallet}
                            close={showWalletPanel}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
export default Header;
