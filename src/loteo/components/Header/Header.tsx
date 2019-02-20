import React, {useContext} from "react";

import {NavigationContext} from "app/contexts";
import {login, logout} from "auth/api";

import {useLogin} from "auth/hooks/useLogin";
import {Button, ButtonStyle, LinkButton} from "ui/components";

import "./header.scss";

const Header = () => {
    const loggedIn = useLogin();
    const navigation = useContext(NavigationContext);

    return (
        <div className="header">
            <div className="spaceBetween">
                <img className="logo" src="images/loteo-logo.svg" alt="logo" onClick={navigation.showHome}/>
                <div className="actions">
                    <LinkButton className="howItWorksButton" text="How it works" onClick={navigation.showHowItWorks}/>
                    <LinkButton className="howItWorksButton" text="Loteo tokens" onClick={navigation.showLoteoTokens}/>
                    <LinkButton className="howItWorksButton" text="Charity" onClick={navigation.showCharity}/>
                    <LinkButton className="howItWorksButton" text="Info" onClick={navigation.showInfo}/>
                    {!loggedIn && <Button text="LOGIN" style={ButtonStyle.WhiteOutline} onClick={login}/>}
                    {loggedIn && <Button text="LOGOUT" style={ButtonStyle.WhiteOutline} onClick={logout}/>}
                </div>
            </div>
        </div>
    );
};
export default Header;
