import React, {useContext} from "react";
import {useTranslation, Trans} from "react-i18next";
import {Helmet} from "react-helmet";
import {Redirect, Route} from "react-router-dom";

import {Match} from "app/types";
import {Background, Footer, Header, NetworksSidebar} from "loteo/components";
import {CopyField, ContextTabs, AnimatedSwitch} from "common/components";
import {Grid} from "ui/components";
import {useReduxStore} from "hooks";
import {getUser} from "auth/selectors";
import {getBaseURL} from "common/utils";
import {AuthContext} from "auth/contexts";

import AffiliatePrograms from "./AffiliatePrograms";
import PlayerBenefits from "./PlayerBenefits";

import "./share.scss";

type Props = {
    location: Location;
    match: Match;
};

const Share = ({match, location}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "share";

    const [user] = useReduxStore([getUser]);
    const {loggedIn, loginLoading} = useContext(AuthContext);

    return (
        <div className="share">
            <Helmet>
                <title>{t(`${TRANSLATE}.helmet`)}</title>
            </Helmet>
            <NetworksSidebar />
            <div className="share__header">
                <Background hideBackgroundEnd banners={false}>
                    <Header />
                    <Grid container wrap className="share__header__inner">
                        <Grid wrap className="col-xs-12">
                            <h1>
                                <Trans i18nKey={`${TRANSLATE}.title`} />
                            </h1>
                            {!loginLoading &&
                                (loggedIn ? (
                                    <Grid
                                        className="col-xs-12 col-md-8 col-lg-6 share__header__inner__affiliateLink"
                                        noPadding
                                    >
                                        <div className="title">{t(`${TRANSLATE}.affiliateLink.title`)}</div>
                                        <div className="text">{t(`${TRANSLATE}.affiliateLink.text`)}</div>
                                        <CopyField
                                            value={user ? `${getBaseURL()}?referral=${user.referralCode}` : "..."}
                                        />
                                    </Grid>
                                ) : (
                                    <div className="subTitle">{t(`${TRANSLATE}.text`)}</div>
                                ))}
                        </Grid>
                        <Grid wrap className="col-xs-12">
                            <ContextTabs
                                tabs={[
                                    {
                                        name: t(`${TRANSLATE}.tabs.0.name`),
                                        path: `${match.path}/affiliate-programs`
                                    },
                                    {
                                        name: t(`${TRANSLATE}.tabs.1.name`),
                                        path: `${match.path}/player-benefits`
                                    }
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Background>
            </div>
            <div>
                <AnimatedSwitch>
                    <Route path={`${match.path}/affiliate-programs`} component={AffiliatePrograms} />
                    <Route path={`${match.path}/player-benefits`} component={PlayerBenefits} />
                    {location.pathname !== `${match.path}/affiliate-programs` && (
                        <Redirect exact from={match.path} to={`${match.path}/affiliate-programs`} />
                    )}
                </AnimatedSwitch>
            </div>
            <Footer />
        </div>
    );
};

export default Share;
