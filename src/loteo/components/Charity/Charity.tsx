import React, {useRef} from "react";
import {Helmet} from "react-helmet";
import {useTranslation, Trans} from "react-i18next";

import {Address, BackgroundTexture, Footer, Header, NetworksSidebar} from "loteo/components";
import {Button} from "ui/components";

import "./charity.scss";

const CHARITY_ADDRESS = "0x518aeA24cF6A3EE2b7A9146c81C2B3A6a0Fb9Cd2";

const Charity = () => {
    const {t} = useTranslation();
    const TRANSLATE = "charity";
    const addressSectionRef = useRef<HTMLHeadingElement>(null);
    const donate = () => {
        const addressSection = addressSectionRef.current;
        if (addressSection) {
            addressSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="charity">
            <Helmet>
                <title>{t(`${TRANSLATE}.helmet`)}</title>
            </Helmet>
            <NetworksSidebar />
            <div className="background">
                <Header />
                <div className="content">
                    <h1>
                        <Trans i18nKey={`${TRANSLATE}.title`} />
                    </h1>
                    <div className="subTitle">{t(`${TRANSLATE}.text`)}</div>
                    <div className="donateButtonWrapper">
                        <Button className="donateButton" text={t(`${TRANSLATE}.donateHelp`)} onClick={donate} />
                    </div>
                </div>
                <div className="backgroundEnd">
                    <img src="images/background-end.svg" alt={t(`${TRANSLATE}.alts.0.alt`)} />
                </div>
            </div>
            <div>
                <BackgroundTexture />
                <div className="content main">
                    <h3>{t(`${TRANSLATE}.t1`)}</h3>
                    <p>{t(`${TRANSLATE}.p1`)}</p>
                    <p>{t(`${TRANSLATE}.p2`)}</p>
                    <h3 ref={addressSectionRef}>{t(`${TRANSLATE}.t2`)}</h3>
                    <Address address={CHARITY_ADDRESS} qrCodeValue={CHARITY_ADDRESS} />
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Charity;
