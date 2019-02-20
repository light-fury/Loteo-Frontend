import React from "react";
import {withRouter} from "react-router";
import {createContext} from "react";

type NavigationType = {
    showHome: () => void;
    showHowItWorks: () => void;
    showLoteoTokens: () => void;
    showCharity: () => void;
    showInfo: () => void;
};

const NavigationContext = createContext<NavigationType>(null);
export default NavigationContext;

type Props = {
    history: { push: Function };
    children: React.ReactChildren;
}

export const NavigationProvider = withRouter(
    ({history, children}: Props) => {
        const navigation = {
            showHome: () => history.push("/home"),
            showHowItWorks: () => history.push("/how-it-works"),
            showLoteoTokens: () => history.push("/tokens"),
            showCharity: () => history.push("/charity"),
            showInfo: () => history.push("/info")
        };

        return (
            <NavigationContext.Provider value={navigation}>
                {children}
            </NavigationContext.Provider>
        );
    }
);
