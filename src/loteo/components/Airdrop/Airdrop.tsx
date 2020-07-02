import React from "react";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet";

import {Background, BackgroundTexture, Footer, Header} from "loteo/components";

import "./airdrop.scss";

const Airdrop = () => {
    const {t} = useTranslation();
    const TRANSLATE = "airdrop";

    return (
        <div className="airdrop">
            <Helmet>
                <title>{t(`${TRANSLATE}.helmet`)}</title>
                <script type="text/javascript" src="https://js.gleam.io/e.js" async={true} />
            </Helmet>

            <Background hideBackgroundEnd>
                <Header />
                <div className="content">
                    <h1>{t(`${TRANSLATE}.title`)}</h1>
                </div>
            </Background>

            <div className="content">
                <a
                    className="e-widget no-button generic-loader"
                    href="https://gleam.io/vtrsN/loteo-3rd-round-airdrop"
                    rel="nofollow"
                >
                    {t(`${TRANSLATE}.href`)}
                </a>
                <BackgroundTexture />
            </div>
            <Footer />
        </div>
    );
};
export default Airdrop;
