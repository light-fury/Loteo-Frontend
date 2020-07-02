import React, {useContext} from "react";
import {withRouter} from "react-router";

import {NavigationContext} from "app/contexts";

import "./contextTabs.scss";

export interface ContextTab {
    name: string;
    path: string;
}

type Props = {
    location: Location;
    tabs: ContextTab[];
    headerTabs?: boolean;
    activePath?: string;
};

const ContextTabs = ({location, tabs, headerTabs = false, activePath}: Props) => {
    const {navigateTo} = useContext(NavigationContext);
    const isActivePath = path => location.pathname === path;
    const toTab = tab => (
        <div
            key={tab.path}
            className={`contextTab ${isActivePath(tab.path) || tab.path === activePath ? "active" : ""}`}
            onClick={() => !isActivePath(tab.path) && navigateTo(tab.path)}
        >
            {tab.name}
        </div>
    );

    return (
        <div className={`contextTabs ${headerTabs ? "headerTabs" : ""}`}>
            {tabs.map(toTab)}
        </div>
    );
};
export default withRouter(ContextTabs);
