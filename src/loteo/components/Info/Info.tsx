import React from "react";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";
import {Redirect, Route} from "react-router-dom";

import {Background, BackgroundTexture, Downloads, FAQ, Footer, Header, LoteoTokens, Team} from "loteo/components";
import {ContextTabs, AnimatedSwitch} from "common/components";
import {Match} from "app/types";

import "./info.scss";

type Props = {
    location: Location;
    match: Match;
};

const Info = ({match, location}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "info";
    const routeName = location.pathname.split("/")[2];

    const heroSections = {
        "loteo-tokens": {
            title: t("info.loteoTokens.t1"),
            subtitle: t("info.loteoTokens.p1")
        },
        team: {
            title: t("info.team.t0"),
            subtitle: t("info.team.p0")
        },
        faq: {
            title: t("info.faq.t1"),
            subtitle: t("info.faq.p1")
        },
        downloads: {
            title: t("info.downloads.t1"),
            subtitle: t("info.downloads.p1")
        }
    };

    return (
        <div className="info">
            <Helmet>
                <title>{t(`${TRANSLATE}.helmet`)}</title>
            </Helmet>
            <Background hideBackgroundEnd>
                <Header />
                <div className="content hero">
                    {routeName && (
                        <>
                            <h1>{heroSections[routeName].title}</h1>
                            <p>{heroSections[routeName].subtitle}</p>
                        </>
                    )}
                </div>
                <ContextTabs
                    tabs={[
                        {
                            name: t(`${TRANSLATE}.tabs.0.name`),
                            path: `${match.path}/loteo-tokens`
                        },
                        {
                            name: t(`${TRANSLATE}.tabs.1.name`),
                            path: `${match.path}/team`
                        },
                        {
                            name: t(`${TRANSLATE}.tabs.2.name`),
                            path: `${match.path}/faq`
                        },
                        {
                            name: t(`${TRANSLATE}.tabs.3.name`),
                            path: `${match.path}/downloads`
                        }
                    ]}
                />
            </Background>
            <div>
                <BackgroundTexture />
                <div className="content main">
                    <AnimatedSwitch>
                        <Route path={`${match.path}/loteo-tokens`} component={LoteoTokens} />
                        <Route path={`${match.path}/team`} component={Team} />
                        <Route path={`${match.path}/faq`} component={FAQ} />
                        <Route path={`${match.path}/downloads`} component={Downloads} />
                        {location.pathname !== `${match.path}/loteo-tokens` && (
                            <Redirect exact from={match.path} to={`${match.path}/loteo-tokens`} />
                        )}
                    </AnimatedSwitch>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Info;
