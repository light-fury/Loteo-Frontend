import React, {useContext} from "react";
import {Trans} from "react-i18next";

import {login} from "auth/api";
import {AuthContext} from "auth/contexts";
import {NavigationContext} from "app/contexts";
import {MixButton} from "ui/components";

import "./affiliateProgram.scss";

type Props = {
    children?: React.ReactNode;
};

const AffiliateProgram = ({children}: Props) => {
    const contentTransalate = "backgroundBanners";

    const {loggedIn} = useContext(AuthContext);
    const {showShare} = useContext(NavigationContext);

    const handlePlay = () => {
        if (loggedIn) {
            showShare();
        } else {
            login(undefined, true);
        }
    };

    return (
        <div className="affiliateProgram banner">
            <div className="affiliateProgram__content loteo-banner">
                <div className="title"><h1><Trans i18nKey={`${contentTransalate}.affiliateProgram.title`} /></h1></div>
                <div className="detail">
                    <Trans i18nKey={`${contentTransalate}.affiliateProgram.detail`} />
                </div>
            </div>
            <div className="affiliateProgram__bottom loteo-banner">
                <div className="action">
                    <MixButton text="BECOME AFFILIATE" style="gold" onClick={handlePlay}/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AffiliateProgram;
