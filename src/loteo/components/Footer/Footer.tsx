import React from "react";
import {useTranslation, Trans} from "react-i18next";
import {SubscribeForm, Networks} from "loteo/components";
import CopyrightTerms from "./CopyrightTerms";
import {useLazyImage} from "hooks";
import {Button} from "ui/components";

import "./footer.scss";

const certificates = [
    {
        href: "https://licensing.gaming-curacao.com/validation/?lh=88b0bc2597700fb444316ebeb50d6f41",
        image: "/images/footer/curacao.png"
    },
    {
        href: "",
        image: "/images/footer/rng.svg"
    },
    {
        href: "",
        image: "/images/footer/ssl.svg"
    },
    {
        href: "",
        image: "/images/footer/18.svg"
    }
];

const Footer = () => {
    const {t} = useTranslation();
    const TRANSLATE = "footer";
    const moonImageRef = useLazyImage("images/loteo-moon.png");

    return (
        <div id="footer">
            <div className="contactSubscribe">
                <div className="footerSection contactUs">
                    <div className="title">{t("global.contactUs")}</div>
                    <div className="addressEmail">
                        <div className="address">
                            <Trans i18nKey={`${TRANSLATE}.address`} />
                        </div>
                        <div className="emailContact">
                            <div className="text">{t(`${TRANSLATE}.email.questions`)}</div>
                            <div className="text">
                                {t(`${TRANSLATE}.email.text`)}: <a href="mailto:info@playloteo.com">info@playloteo.com</a>
                            </div>
                        </div>
                    </div>
                    <Networks />
                </div>
                <div className="footerSection footer-feedback">
                    <div className="title">{t(`${TRANSLATE}.feedback.title`)}</div>
                    <div className="sendFeedback">{t(`${TRANSLATE}.feedback.text`)}</div>
                    <a href="mailto:info@playloteo.com"><Button className="footer-feedback-button" text={t(`${TRANSLATE}.feedback.btn`)} /></a>
                </div>
                <div className="footerSection subscribe">
                    <div className="title">{t(`${TRANSLATE}.subscribe.title`)}</div>
                    <div className="subscribeCta">{t(`${TRANSLATE}.subscribe.text`)}</div>
                    <SubscribeForm />
                </div>
            </div>

            <div className="certificates">
                <div className="certificates__inner">
                    {certificates.map((item, idx) =>
                        item.href ? (
                            <a key={`footerCertificate-${idx}`} href={item.href}>
                                <img src={item.image} alt="certificate" />
                            </a>
                        ) : (
                            <img key={`footerCertificate-${idx}`} src={item.image} alt="certificate" />
                        )
                    )}
                </div>
            </div>

            <img ref={moonImageRef} className="moon" alt={t(`${TRANSLATE}.alts.0.alt`)} />
            <CopyrightTerms />
        </div>
    );
};

export default Footer;
