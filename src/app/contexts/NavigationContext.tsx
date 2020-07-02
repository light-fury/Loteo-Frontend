import React from "react";
import {withRouter} from "react-router";
import {createContext} from "react";

export type NavigationType = {
    navigateTo(path: string);
    showHome();
    showPromotions();
    showDashboard();
    showDashboardBuy();
    showWeeklyLottery(showPayment?: boolean, tickets?: Record<string, any>);
    showApolloDailyLottery();
    showGameDetails(game?: number);
    showLoteoPassDetails();
    showLoteoMaxxDetails();
    showInstructions();
    showCharity();
    showShare();
    showUserProfile();
    showContactUs();
    showAirdrop();
};

const NavigationContext = createContext<NavigationType>((null as unknown) as NavigationType);
export default NavigationContext;

type Props = {
    history: {push: Function};
    children: React.ReactNode;
};

export const NavigationProvider = withRouter(({history, children}: Props) => {
    const navigation = {
        navigateTo: path => history.push(path),
        showHome: () => history.push("/"),
        showDashboard: () => history.push("/dashboard"),
        showPromotions: () => history.push("/promotion"),
        showDashboardBuy: () => history.push("/dashboard#buy"),
        showWeeklyLottery: (showPayment, tickets) => history.push({pathname: "/weekly-lottery", state: {showPayment, tickets}}),
        showApolloDailyLottery: () => history.push("/apollo-daily-lottery"),
        // showGameDetails: game => history.push(game && typeof game === "string" ? `/games-info/${game}` : "/games-info"),
        showGameDetails: game => history.push({pathname: "/games-info", state: {subRoute: game}}),
        showLoteoPassDetails: () => history.push("/games-info/weekly-lottery/tickets#loteopass"),
        showLoteoMaxxDetails: () => history.push("/games-info/weekly-lottery/tickets#loteomaxx"),
        showInstructions: () => history.push("/instructions"),
        showCharity: () => {
            history.push("/charity");
            window.scrollTo(0, 0);
        },
        showShare: () => {
            history.push("/share");
            window.scrollTo(0, 0);
        },
        showUserProfile: () => history.push("/user-profile"),
        showContactUs: () => history.push("/contact-us"),
        showAirdrop: () => history.push("/airdrop")
    };

    return <NavigationContext.Provider value={navigation}>{children}</NavigationContext.Provider>;
});
