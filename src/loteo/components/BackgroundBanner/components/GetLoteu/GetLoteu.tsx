import React, {useRef, useContext} from "react";
import {Trans} from "react-i18next";

import {login} from "auth/api";
import {AuthContext} from "auth/contexts";
import {ConversionRates} from "loteo/types";
import {getConversionRates} from "loteo/selectors";
import {MixButton} from "ui/components";
import {MessageContext} from "app/contexts";
import {useReduxStore} from "hooks";

import "./getLoteu.scss";

type Props = {
    children?: React.ReactNode;
};

const GetLoteu = ({children}: Props) => {
    const TRANSLATE = "backgroundBanners";

    const scrollView = useRef<HTMLDivElement>(null);
    const {loggedIn} = useContext(AuthContext);
    const {showPayment} = useContext(MessageContext);
    const [conversionRates]: [ConversionRates | null] = useReduxStore([getConversionRates]);

    const handlePlay = () => {
        if (loggedIn) {
            showPayment({loteu: conversionRates ? Number((conversionRates.loteuBuy * 10).toFixed(0)) : 4000}, scrollView.current || undefined);
        } else {
            login(undefined, true);
        }
    };

    return (
        <div className="getLoteu banner">
            <div className="getLoteu__content  loteo-banner">
                <div className="title"><h1><Trans i18nKey={`${TRANSLATE}.getLoteu.title`} /></h1></div>
                <div className="detail">
                    <Trans i18nKey={`${TRANSLATE}.getLoteu.detail`} />
                </div>
            </div>
            <div className="getLoteu__bottom  loteo-banner">
                <div className="action">
                    <MixButton text="BUY LOTEU" style="red" onClick={handlePlay}/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default GetLoteu;
