import React from "react";
import {useTranslation, Trans} from "react-i18next";
import {Helmet} from "react-helmet";

import {Background, Footer, Header} from "loteo/components";

import "loteo/components/Airdrop/airdrop.scss";

const AirdropThankYou = () => {
    const {t} = useTranslation();
    const TRANSLATE = "airdropThankYou";
    return (
        <div className="airdrop">
            <Helmet>
                <title>{t(`${TRANSLATE}.helmet`)}</title>
            </Helmet>

            <Background hideBackgroundEnd>
                <Header />
                <div className="content">
                    <h1>{t(`${TRANSLATE}.title`)}</h1>
                </div>
            </Background>

            <div className="content main">
                <h3>{t(`${TRANSLATE}.content.title`)}</h3>
                <p>
                    <Trans i18nKey={`${TRANSLATE}.content.p`} />
                </p>
            </div>
            <Footer />
        </div>
    );
};
export default AirdropThankYou;
