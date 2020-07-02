import React, {useContext} from "react";
import {useTranslation, Trans} from "react-i18next";
import {Helmet} from "react-helmet";
import {Switch, Redirect, Route} from "react-router-dom";

import {Background, Header, UserInfo as UserInfoComponent, Footer, NetworksSidebar} from "loteo/components";
import {ContextTabs} from "common/components";
import {Grid, Dialog, Button, ButtonStyle} from "ui/components";
import {useReduxLoad, useBooleanState} from "hooks";
import {Match} from "app/types";
import {withAuthorization} from "auth/hoc";
import {loadUser} from "auth/actions";
import {getUser, getUserLoading} from "auth/selectors";
import {loadMyAffiliate} from "loteo/actions";
import {getMyAffiliate} from "loteo/selectors";
import {MessageContext} from "app/contexts";

import {ProgressInfo} from "./components";
import {MyAffiliateStatistics, MyAffiliatePartners} from "./pages";

import "./myAffiliate.scss";

type Props = {
    location: Location;
    match: Match;
};

const MyAffiliate = ({match, location}: Props) => {
    const {t} = useTranslation();
    const TRANSLATE = "myAffiliate";

    const {showPayment} = useContext(MessageContext);
    const [user, userLoading, myAffiliate] = useReduxLoad(
        [loadUser(), loadMyAffiliate()],
        [getUser, getUserLoading, getMyAffiliate]
    );
    const [passDialogVisible, showPassDialog, hidePassDialog] = useBooleanState(false);

    const pay = () => {
        hidePassDialog();
        showPayment({loteoPass: 1});
    };

    return (
        <div className="myAffiliate">
            <Helmet>
                <title>{t(`${TRANSLATE}.helmet`)}</title>
            </Helmet>
            <NetworksSidebar />
            <Background hideBackgroundEnd>
                <Header />
                <Grid align="center" justify="space-between" className="myAffiliate__banner">
                    <UserInfoComponent user={user} userLoading={userLoading} />
                    <div className="separator" />
                    <h1>{t(`${TRANSLATE}.title`)}</h1>
                    {user && user.upline && (
                        <div className="myAffiliate__banner__upline">
                            <span>{t(`${TRANSLATE}.titleSpan`)}</span>
                            {user.upline}
                        </div>
                    )}
                </Grid>
                <Grid container direction="column" noPadding>
                    <ProgressInfo
                        user={user}
                        myAffiliate={myAffiliate}
                        buyPass={() => showPayment({loteoPass: 1})}
                        buyTicket={() => showPayment({tickets: 1})}
                    />
                    <Grid className="col-xs-12">
                        <ContextTabs
                            tabs={[
                                {
                                    name: t(`${TRANSLATE}.tabs.0.name`),
                                    path: `${match.path}/statistics`
                                },
                                {
                                    name: t(`${TRANSLATE}.tabs.1.name`),
                                    path: `${match.path}/partners`
                                }
                            ]}
                        />
                    </Grid>
                </Grid>
            </Background>
            <div>
                <Switch>
                    <Route
                        path={`${match.path}/statistics`}
                        render={props => (
                            <MyAffiliateStatistics
                                showPassDialog={showPassDialog}
                                myAffiliate={myAffiliate}
                                user={user}
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path={`${match.path}/partners`}
                        render={props => <MyAffiliatePartners myAffiliate={myAffiliate} user={user} {...props} />}
                    />
                    {location.pathname !== `${match.path}/statistics` && (
                        <Redirect exact from={match.path} to={`${match.path}/statistics`} />
                    )}
                </Switch>
            </div>
            <Footer />

            {passDialogVisible && (
                <Dialog className="myAffiliate__statistics__passDialog" onClose={hidePassDialog}>
                    <Grid direction="column" align="center">
                        <img
                            src="images/myAffiliate/passDialog/icon.svg"
                            alt={t(`${TRANSLATE}.alts.0.text`)}
                            className="myAffiliate__statistics__passDialog__icon"
                        />
                        <div className="myAffiliate__statistics__passDialog__title">
                            <Trans i18nKey={`${TRANSLATE}.passDialog.title`} />
                        </div>
                        <div className="myAffiliate__statistics__passDialog__text">
                            <Trans i18nKey={`${TRANSLATE}.passDialog.text`} />
                        </div>
                        <Button text={t(`${TRANSLATE}.passDialog.ok`)} style={ButtonStyle.Yellow} onClick={pay} />
                        <Button
                            text={t(`${TRANSLATE}.passDialog.cancel`)}
                            style={ButtonStyle.Borderless}
                            onClick={hidePassDialog}
                        />
                    </Grid>
                </Dialog>
            )}
        </div>
    );
};

export default withAuthorization(MyAffiliate);
