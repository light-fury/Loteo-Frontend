import React, {useState, useContext} from "react";
import classNames from "classnames";
import {useTranslation} from "react-i18next";

import {NavigationContext} from "app/contexts";
import {AuthContext} from "auth/contexts";
import {useBooleanState} from "hooks";

import "./navbar.scss";

const NavBar = () => {
    const {t} = useTranslation();
    const TRANSLATE = "statistics";
    const [activeItem, setActiveItem] = useState([0, 0]);
    const [showMenu, setShowMenu, closeShowMenu] = useBooleanState(false);
    const {showHome, showDashboard} = useContext(NavigationContext);
    const {loggedIn} = useContext(AuthContext);

    const menus = [
        {
            category: [
                {
                    name: t(`${TRANSLATE}.navbar.0.socialNetworks`),
                    pageTo: "socialNetworks"
                }
            ]
        },
        {
            category: [
                {
                    name: t(`${TRANSLATE}.navbar.1.loteoPlatform`),
                    pageTo: "loteoPlatform"
                },
                {
                    name: t(`${TRANSLATE}.navbar.1.subMenu.0.webVisitors`),
                    pageTo: "loteoPlatform__web"
                },
                {
                    name: t(`${TRANSLATE}.navbar.1.subMenu.1.users`),
                    pageTo: "loteoPlatform__users"
                },
                {
                    name: t(`${TRANSLATE}.navbar.1.subMenu.2.products`),
                    pageTo: "loteoPlatform__products"
                }
            ]
        },
        {
            category: [
                {
                    name: t(`${TRANSLATE}.navbar.2.Finance`),
                    pageTo: "finance"
                },
                {
                    name: t(`${TRANSLATE}.navbar.2.subMenu.0.affiliateProgram`),
                    pageTo: "finance__affiliate"
                },
                {
                    name: t(`${TRANSLATE}.navbar.2.subMenu.1.affiliateProfits`),
                    pageTo: "finance__profits"
                },
                {
                    name: t(`${TRANSLATE}.navbar.2.subMenu.2.loteuStats`),
                    pageTo: "finance__profits"
                }
            ]
        }
    ];

    const onClickMenu = (idx, subIdx) => {
        setActiveItem([idx, subIdx]);

        window.scrollTo({
            top: document.getElementsByClassName(menus[idx].category[subIdx].pageTo)[0]["offsetTop"],
            behavior: "smooth"
        });
    };

    return (
        <div className="navbar">
            <div className="navbar__logo">
                <img src="images/loteo-logo-statistics.svg" alt={t(`${TRANSLATE}.alts.0.alt`)} onClick={loggedIn ? showDashboard : showHome}/>
                {!showMenu && (
                    <div className="navbar__logo__menu-icon">
                        <i className="fas fa-bars" onClick={setShowMenu}></i>
                    </div>
                )}
                {showMenu && (
                    <div className="navbar__logo__menu-icon">
                        <i className="fa fa-times" onClick={closeShowMenu}></i>
                    </div>
                )}
            </div>
            <div className={classNames(
                "navbar__menu",
                {"show": showMenu},
                {"hide": !showMenu})}
            >
                {menus.map((menu, idx) => (
                    <div key={`navbar__menu-${idx}`}>
                        {menu.category.map((item, subIdx) => (
                            <div
                                className={classNames("navbar__menu__item", {"subMenu": subIdx > 0},  {"active": idx === activeItem[0] && subIdx === activeItem[1]})}
                                key={`navbar-sub-${subIdx}`}
                                onClick={() => onClickMenu(idx, subIdx)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavBar;
