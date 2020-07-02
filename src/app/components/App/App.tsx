import React, {useEffect, lazy, Suspense} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {ParallaxProvider} from "react-scroll-parallax";

import {Loading} from "common/components";
const Home = lazy(() => import("loteo/components/Home"));
const Dashboard = lazy(() => import("loteo/components/Dashboard"));
const Statistics = lazy(() => import("loteo/components/Statistics"));
const Promotion = lazy(() => import("loteo/components/Promotion"));
const DataLoader = lazy(() => import("loteo/components/DataLoader"));
const GamesInfo = lazy(() => import("loteo/components/GamesInfo"));
const Share = lazy(() => import("loteo/components/Share"));
const Charity = lazy(() => import("loteo/components/Charity"));
const HowItWorks = lazy(() => import("loteo/components/HowItWorks"));
const Info = lazy(() => import("loteo/components/Info"));
const ContactUs = lazy(() => import("loteo/components/ContactUs"));
const Page404 = lazy(() => import("loteo/components/Page404"));
const Airdrop = lazy(() => import("loteo/components/Airdrop"));
const AirdropThankYou = lazy(() => import("loteo/components/AirdropThankYou"));
const MyAffiliate = lazy(() => import("loteo/components/MyAffiliate"));
const MoonOfFortune = lazy(() => import("loteo/components/MoonOfFortune"));
const LeaderboardScreen = lazy(() => import("loteo/components/LeaderboardScreen"));
const WeeklyLottery = lazy(() => import("loteo/components/WeeklyLottery"));
const ApolloDailyLottery = lazy(() => import("loteo/components/ApolloDailyLottery"));
const WhyInvest = lazy(() => import("loteo/components/WhyInvest"));
const ChatLogin = lazy(() => import("loteo/components/Chat/ChatLogin"));
import GroupChat from "loteo/components/Chat/GroupChat";
import {AuthOverlay, AuthCallback, UserProfile} from "auth/components";
import {MessageContextProvider, NavigationProvider} from "app/contexts";
import {AuthProvider} from "auth/contexts";
import {CookieNotification} from "app/components";
import {useReferralCodeWatcher} from "app/hooks";

import "./app.scss";

type Props = {
    location: Location;
};

const App = ({location}: Props) => {
    const {pathname} = location;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname.split("/").filter(o => !!o)[0]]);

    useReferralCodeWatcher(location);

    return (
        <div className="app">
            <ParallaxProvider>
                <AuthProvider>
                    <MessageContextProvider>
                        <NavigationProvider>
                            <DataLoader />
                            <AuthOverlay />
                            <CookieNotification />
                            <Suspense
                                fallback={
                                    <div className="extend">
                                        <Loading />
                                    </div>
                                }
                            >
                                <Switch>
                                    <Route path="/" exact component={Home} />
                                    <Route path="/dashboard" exact component={Dashboard} />
                                    <Route path="/statistics" exact component={Statistics} />
                                    <Route path="/promotion" exact component={Promotion} />
                                    <Route path="/games-info" exact component={GamesInfo} />
                                    <Route path="/share" component={Share} />
                                    <Route path="/charity" component={Charity} />
                                    <Route path="/why-invest" exact component={WhyInvest} />
                                    <Route path="/how-it-works" exact component={HowItWorks} />
                                    <Route path="/info" component={Info} />
                                    <Route path="/airdrop" component={Airdrop} />
                                    <Route path="/airdrop-thank-you" component={AirdropThankYou} />
                                    <Route path="/user-profile" component={UserProfile} />
                                    <Route path="/contact-us" component={ContactUs} />
                                    <Route path="/callback" component={AuthCallback} />
                                    <Route path="/moon-of-fortune" component={MoonOfFortune} />
                                    <Route path="/my-affiliate" component={MyAffiliate} />
                                    <Route path="/leaderboard" component={LeaderboardScreen} />
                                    <Route path="/weekly-lottery" component={WeeklyLottery} />
                                    <Route path="/apollo-daily-lottery" component={ApolloDailyLottery} />
                                    <Route path="/chat-login" component={ChatLogin} />
                                    <Route path="/chat" component={GroupChat} />
                                    <Route path="/404" component={Page404} />
                                    {/* <Redirect exact from="/" to="/dashboard"/> */}
                                    <Route path="*" component={() => <Redirect to="/404" />} />
                                </Switch>
                            </Suspense>
                        </NavigationProvider>
                    </MessageContextProvider>
                </AuthProvider>
            </ParallaxProvider>
        </div>
    );
};

export default App;
