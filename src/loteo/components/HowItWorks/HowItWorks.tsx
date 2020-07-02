import React from "react";
import {useTranslation} from "react-i18next";
import {Redirect, Route} from "react-router-dom";
import {Helmet} from "react-helmet";

import {Background, BackgroundTexture, Footer, Header} from "loteo/components";
import {Match} from "app/types";
import {ContextTabs, AnimatedSwitch} from "common/components";

import LoteoSolutionSection from "./LoteoSolutionSection";
import InfoSection from "./InfoSection";
import UserAdvantagesSection from "./UserAdvantagesSection";
import InvestorAdvantagesSection from "./InvestorAdvantagesSection";

import "./howItWorks.scss";

type Props = {
    location: Location;
    match: Match;
};

const HowItWorks = ({location, match}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "howItWorks";

    return (
        <div className="howItWorks">
            <Helmet>
                <title>{t(`${TRANSLATE}.helmet`)}</title>
            </Helmet>
            <Background hideBackgroundEnd>
                <Header />
                <div className="content hero">
                    <h1>{t(`${TRANSLATE}.title`)}</h1>
                </div>
                <ContextTabs
                    tabs={[
                        {
                            name: t(`${TRANSLATE}.tabs.1.name`),
                            path: `${match.path}/info`
                        },
                        {
                            name: t(`${TRANSLATE}.tabs.0.name`),
                            path: `${match.path}/solution`
                        },
                        {
                            name: t(`${TRANSLATE}.tabs.2.name`),
                            path: `${match.path}/user-advantages`
                        },
                        {
                            name: t(`${TRANSLATE}.tabs.3.name`),
                            path: `${match.path}/investor-advantages`
                        }
                    ]}
                />
            </Background>
            <div>
                <BackgroundTexture />
                <div className="content main">
                    <AnimatedSwitch>
                        <Route path={`${match.path}/info`} component={InfoSection} />
                        <Route path={`${match.path}/solution`} component={LoteoSolutionSection} />
                        <Route path={`${match.path}/user-advantages`} component={UserAdvantagesSection} />
                        <Route path={`${match.path}/investor-advantages`} component={InvestorAdvantagesSection} />
                        {location.pathname !== `${match.path}/info` && (
                            <Redirect exact from={match.path} to={`${match.path}/info`} />
                        )}
                    </AnimatedSwitch>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HowItWorks;
